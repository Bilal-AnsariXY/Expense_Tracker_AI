from functools import wraps

from flask import request
from flask import jsonify
from flask import g

from auth import verify_token


def token_required(function):

    @wraps(function)

    def decorated(*args, **kwargs):

        auth_header = request.headers.get("Authorization")

        if auth_header is None:

            return jsonify({
                "success": False,
                "message": "Authorization header is missing."
            }), 401

        if not auth_header.startswith("Bearer "):

            return jsonify({
                "success": False,
                "message": "Invalid authorization header."
            }), 401

        token = auth_header.split(" ")[1]

        decoded = verify_token(token)

        if decoded is None:

            return jsonify({
                "success": False,
                "message": "Invalid or expired token."
            }), 401

        g.user = decoded

        return function(*args, **kwargs)

    return decorated