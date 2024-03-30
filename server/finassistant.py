import os
import time
from modal import Image, Stub, enter, exit, gpu, method

MODEL_DIR = "/model"
BASE_MODEL = "TheBloke/zephyr-7B-beta-AWQ"
GPU_CONFIG = gpu.T4(count=1)

stub = Stub("finassistant")

zephyr_image = (
    Image.debian_slim(python_version="3.11")
    .pip_install(
        "autoawq==0.1.8",
        "torch==2.1.2",
    )
)

with zephyr_image.imports():
    from threading import Thread
    from transformers import AutoTokenizer, TextIteratorStreamer
    from awq import AutoAWQForCausalLM

@stub.cls(gpu=GPU_CONFIG, container_idle_timeout=300, image=zephyr_image)
class Model:
    @enter()
    def load_model(self):
        t0 = time.time()
        print("Loading AWQ quantized model...")
        self.model = AutoAWQForCausalLM.from_quantized(BASE_MODEL, fuse_layers=False, version="GEMV")
        print(f"Model loaded in {time.time() - t0:.2f}s")
        self.tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL)
        self.streamer = TextIteratorStreamer(self.tokenizer, skip_prompt=True, skip_special_tokens=True)

    @method()
    async def generate(self, prompt):
        t0 = time.time()

        tokenized_prompt = self.tokenizer.encode(prompt, return_tensors="pt").cuda()

        generation_kwargs = dict(
            input_ids=tokenized_prompt,
            streamer=self.streamer,
            do_sample=True,
            temperature=0.7,
            top_p=0.95,
            repetition_penalty=1.2,
            max_new_tokens=256,
        )

        # Run generation on separate thread to enable response streaming.
        thread = Thread(target=self.model.generate, kwargs=generation_kwargs)
        thread.start()

        for new_text in self.streamer:
            yield new_text

        thread.join()
        print(f"Output generated in {time.time() - t0:.2f}s")

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
    In terms of stocks, and investments, provide a detailed analysis of the user's portfolio and suggest ways to optimize their investments, reduce risk, and increase returns, but also mention that this is not financial advice and they should consult a financial advisor before making any investment decisions.
    """
    response = ""
    for text in model.generate.remote_gen(prompt):
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