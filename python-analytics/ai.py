from analytics import (
    get_summary,
    get_category_summary,
    get_monthly_summary,
    get_savings,
    get_top_expenses,
)

from gemini import ask_gemini

from prompts import create_prompt


def ask_ai(user_id, question):

    summary = get_summary(user_id)

    category = get_category_summary(user_id)

    monthly = get_monthly_summary(user_id)

    savings = get_savings(user_id)

    top_expenses = get_top_expenses(user_id)

    prompt = create_prompt(
        summary,
        category,
        monthly,
        savings,
        top_expenses,
        question
    )

    answer = ask_gemini(prompt)

    return answer