import jwt
import os

from dotenv import load_dotenv

load_dotenv()

token = input("Enter JWT Token : ")

decoded = jwt.decode(
    token,
    os.getenv("JWT_SECRET"),
    algorithms=["HS256"]
)

print(decoded)