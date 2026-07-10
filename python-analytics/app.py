from flask import Flask, jsonify, g, request
from flask_cors import CORS

from middleware import token_required

from analytics import (
    get_summary,
    get_category_summary,
    get_monthly_summary,
    get_income_vs_expense,
    get_savings,
    get_top_expenses,
    get_ai_insights
)

from ai import ask_ai

app = Flask(__name__)
CORS(
    app,
    origins=["http://localhost:3000"],
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

# ==========================================
# HOME
# ==========================================

@app.route("/")
def home():

    return jsonify({
        "success": True,
        "message": "Python Analytics Server Running..."
    })


# ==========================================
# SUMMARY
# ==========================================

@app.route("/analytics/summary")
@token_required
def analytics_summary():

    user_id = g.user["userId"]

    summary = get_summary(user_id)

    return jsonify({
        "success": True,
        "data": summary
    })


# ==========================================
# CATEGORY SUMMARY
# ==========================================

@app.route("/analytics/category")
@token_required
def analytics_category():

    user_id = g.user["userId"]

    category = get_category_summary(user_id)

    return jsonify({
        "success": True,
        "data": category
    })


# ==========================================
# MONTHLY SUMMARY
# ==========================================

@app.route("/analytics/monthly")
@token_required
def analytics_monthly():

    user_id = g.user["userId"]

    monthly = get_monthly_summary(user_id)

    return jsonify({
        "success": True,
        "data": monthly
    })


# ==========================================
# INCOME VS EXPENSE
# ==========================================

@app.route("/analytics/income-expense")
@token_required
def analytics_income_expense():

    user_id = g.user["userId"]

    data = get_income_vs_expense(user_id)

    return jsonify({
        "success": True,
        "data": data
    })


# ==========================================
# SAVINGS
# ==========================================

@app.route("/analytics/savings")
@token_required
def analytics_savings():

    user_id = g.user["userId"]

    data = get_savings(user_id)

    return jsonify({
        "success": True,
        "data": data
    })


# ==========================================
# TOP 5 EXPENSES
# ==========================================

@app.route("/analytics/top-expenses")
@token_required
def analytics_top_expenses():

    user_id = g.user["userId"]

    data = get_top_expenses(user_id)

    return jsonify({
        "success": True,
        "data": data
    })


# ==========================================
# AI INSIGHTS
# ==========================================

@app.route("/analytics/insights")
@token_required
def analytics_insights():

    user_id = g.user["userId"]

    data = get_ai_insights(user_id)

    return jsonify({
        "success": True,
        "data": data
    })


# ==========================================
# AI CHAT
# ==========================================

@app.route("/ai/chat", methods=["POST"])
@token_required
def ai_chat():

    user_id = g.user["userId"]

    body = request.get_json()

    if body is None:

        return jsonify({
            "success": False,
            "message": "Request body is missing."
        }), 400

    question = body.get("question")

    if question is None or question.strip() == "":

        return jsonify({
            "success": False,
            "message": "Question is required."
        }), 400

    answer = ask_ai(user_id, question)

    return jsonify({
        "success": True,
        "question": question,
        "answer": answer
    })


# ==========================================
# RUN APP
# ==========================================

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5001
    )