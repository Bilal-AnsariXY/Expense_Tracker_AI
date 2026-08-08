

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