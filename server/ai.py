def ask_gpt(prompt, client):
    # Call the OpenAI API to generate the answer
    response = client.chat.completions.create(
        model="gpt-4-turbo-preview",
        messages=[
            {"role": "user", "content": prompt},
        ],
    )
    # Extract and return the response from the API
    return response.choices[0].message.content
