from gemini import ask_gemini


question = input("Ask Gemini : ")


answer = ask_gemini(question)


print("\nGemini Answer:\n")

print(answer)