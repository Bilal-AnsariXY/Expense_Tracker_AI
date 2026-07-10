from ai import ask_ai


user_id = int(input("Enter User Id: "))

question = input("Ask AI: ")


answer = ask_ai(user_id, question)


print("\n==============================")
print("AI Answer:")
print("==============================\n")

print(answer)