import jwt

from config import JWT_SECRET


def verify_token(token):

    try:

        decoded = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=["HS256"]
        )

        return decoded

    except jwt.ExpiredSignatureError:

        return None

    except jwt.InvalidTokenError:

        return None