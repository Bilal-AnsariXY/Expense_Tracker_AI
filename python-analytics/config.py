# import os
# from dotenv import load_dotenv

# load_dotenv()

# DB_SERVER = os.getenv("DB_SERVER")
# DB_DATABASE = os.getenv("DB_DATABASE")
# DB_USER = os.getenv("DB_USER")
# DB_PASSWORD = os.getenv("DB_PASSWORD")
# DB_PORT = os.getenv("DB_PORT")

# JWT_SECRET = os.getenv("JWT_SECRET")

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# PostgreSQL Database URL
DATABASE_URL = os.getenv("DATABASE_URL")

# JWT Secret
JWT_SECRET = os.getenv("JWT_SECRET")

# Gemini API Key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")