import os
import time
from modal import Image, Stub, enter, exit, gpu, method

MODEL_DIR = "/model"
BASE_MODEL = "mistralai/Mixtral-8x7B-Instruct-v0.1"
GPU_CONFIG = gpu.A100(memory=80, count=2)

stub = Stub("finassistant")


def download_model_to_folder():
    from huggingface_hub import snapshot_download
    from transformers.utils import move_cache

    os.makedirs(MODEL_DIR, exist_ok=True)

    snapshot_download(
        BASE_MODEL,
        local_dir=MODEL_DIR,
        ignore_patterns=["*.pt"],  # Using safetensors
    )
    move_cache()


vllm_image = (
    Image.from_registry("nvidia/cuda:12.1.1-devel-ubuntu22.04", add_python="3.10")
    .pip_install(
        "vllm==0.3.2",
        "huggingface_hub==0.19.4",
        "hf-transfer==0.1.4",
        "torch==2.1.2",
    )
    .env({"HF_HUB_ENABLE_HF_TRANSFER": "1"})
    .run_function(download_model_to_folder, timeout=60 * 20)
)


@stub.cls(
    gpu=GPU_CONFIG,
    timeout=60 * 10,
    container_idle_timeout=60 * 10,
    allow_concurrent_inputs=10,
    image=vllm_image,
)
class Model:
    @enter()
    def start_engine(self):
        import time

        from vllm.engine.arg_utils import AsyncEngineArgs
        from vllm.engine.async_llm_engine import AsyncLLMEngine

        print("🥶 cold starting inference")
        start = time.monotonic_ns()

        if GPU_CONFIG.count > 1:
            # Patch issue from https://github.com/vllm-project/vllm/issues/1116
            import ray

            ray.shutdown()
            ray.init(num_gpus=GPU_CONFIG.count)

        engine_args = AsyncEngineArgs(
            model=MODEL_DIR,
            tensor_parallel_size=GPU_CONFIG.count,
            gpu_memory_utilization=0.90,
            enforce_eager=False,  # capture the graph for faster inference, but slower cold starts
            disable_log_stats=True,  # disable logging so we can stream tokens
            disable_log_requests=True,
        )
        self.template = "<s> [INST] {user} [/INST] "

        # this can take some time!
        self.engine = AsyncLLMEngine.from_engine_args(engine_args)
        duration_s = (time.monotonic_ns() - start) / 1e9
        print(f"🏎️ engine started in {duration_s:.0f}s")

    @method()
    async def completion_stream(self, user_question):
        from vllm import SamplingParams
        from vllm.utils import random_uuid

        sampling_params = SamplingParams(
            temperature=0.75,
            max_tokens=256,
            repetition_penalty=1.1,
        )

        request_id = random_uuid()
        result_generator = self.engine.generate(
            self.template.format(user=user_question),
            sampling_params,
            request_id,
        )
        index, num_tokens = 0, 0
        start = time.monotonic_ns()
        async for output in result_generator:
            if output.outputs[0].text and "\ufffd" == output.outputs[0].text[-1]:
                continue
            text_delta = output.outputs[0].text[index:]
            index = len(output.outputs[0].text)
            num_tokens = len(output.outputs[0].token_ids)

            yield text_delta
        duration_s = (time.monotonic_ns() - start) / 1e9

        yield f"\n\tGenerated {num_tokens} tokens from {BASE_MODEL} in {duration_s:.1f}s, throughput = {num_tokens / duration_s:.0f} tokens/second on {GPU_CONFIG}.\n"


@stub.function()
def finassistant(transactions, query):
    model = Model()
    prompt = f"""
    Given the following user transactions:
    {transactions}

    User Query: {query}

    Provide a helpful response with personalized financial advice based on the user's transactions and query. Include specific recommendations and money-saving tips tailored to the user's spending patterns.
    If the user's query is about a specific transaction, provide a detailed breakdown of the transaction and suggest ways to save money or optimize spending.
    If the user's query is about a general financial topic, provide a detailed explanation and actionable advice.
    If the user's query is about a financial goal, provide a detailed plan to achieve the goal and suggest specific actions to take.
    If the user's query is about a financial problem, provide a detailed solution and suggest specific steps to resolve the issue.
    If the user's query is about a financial decision, provide a detailed analysis of the decision and suggest the best course of action.
    In terms of stocks, and investments, provide a detailed analysis of the user's portfolio and suggest ways to optimize their investments, reduce risk, and increase returns, but you MUST mention that this is not financial advice and they should consult a financial advisor before making any investment decisions.
    
    Must not show json data, only text.
    """
    response = ""
    for text in model.completion_stream.remote_gen(prompt):
        response += text
    return response


@stub.local_entrypoint()
def main():
    transactions = [
        {"date": "2023-05-01", "amount": -50, "category": "Groceries"},
        {"date": "2023-05-02", "amount": -20, "category": "Entertainment"},
        {"date": "2023-05-03", "amount": 1000, "category": "Salary"},
        {"date": "2023-05-04", "amount": -100, "category": "Utilities"},
    ]

    questions = [
        "How can I save more money based on my spending habits?",
        "Should I invest in Tesla stock?",
        "What can I do to reduce my utility expenses?",
        "I want to save $5000 in the next 6 months. What's the best plan to achieve this goal?",
    ]

    for question in questions:
        print("Sending new request:", question, "\n")
        response = ""
        for text in finassistant.remote(transactions, question):
            response += text
        print(response, "\n")
