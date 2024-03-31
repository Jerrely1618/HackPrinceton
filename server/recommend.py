from openai import OpenAI


def ask_gpt(query, balance):

    api_key = "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"

    client = OpenAI(api_key=api_key)

    prompt = "Provide a helpful response with personalized financial advice based on the user's transactions and query in 4 bullet points (128 wordS) Each bullet point shouldn't be more than 7-8 words - for eg- spend less on uber eats. Include specific recommendations and money-saving tips tailored to the user's spending patterns. One bullet point should be In terms of stocks, and investments, provide a detailed analysis of the user's portfolio and suggest ways to optimize their investments, reduce risk, and increase returns, but you MUST mention that this is not financial advice and they should consult a financial advisor before making any investment decisions. Query is {query} and the monthly income is {balance}".format(
        query=query, balance=balance
    )

    # Call the OpenAI API to generate the answer
    response = client.chat.completions.create(
        model="gpt-4-turbo-preview",
        messages=[
            {"role": "user", "content": prompt},
        ],
    )
    # Extract and return the response from the API
    return response.choices[0].message.content
