import pandas as pd

from database import get_connection


# ==========================================
# GET ALL EXPENSES
# ==========================================
def get_expenses(user_id):

    connection = get_connection()

    query = """
        SELECT
            e.ExpenseId,
            e.UserId,
            e.CategoryId,
            c.CategoryName,
            e.Amount,
            e.Description,
            e.ExpenseDate,
            e.CreatedAt
        FROM Expenses e
        INNER JOIN Categories c
            ON e.CategoryId = c.CategoryId
        WHERE e.UserId = ?
    """

    dataframe = pd.read_sql(
        query,
        connection,
        params=[user_id]
    )

    connection.close()

    return dataframe


# ==========================================
# GET ALL INCOME
# ==========================================
def get_income(user_id):

    connection = get_connection()

    query = """
        SELECT
            i.IncomeId,
            i.UserId,
            i.CategoryId,
            c.CategoryName,
            i.Amount,
            i.Description,
            i.IncomeDate,
            i.CreatedAt
        FROM Income i
        INNER JOIN Categories c
            ON i.CategoryId = c.CategoryId
        WHERE i.UserId = ?
    """

    dataframe = pd.read_sql(
        query,
        connection,
        params=[user_id]
    )

    connection.close()

    return dataframe


# ==========================================
# DASHBOARD SUMMARY
# ==========================================
def get_summary(user_id):

    expenses = get_expenses(user_id)
    income = get_income(user_id)

    total_expense = (
        float(expenses["Amount"].sum())
        if not expenses.empty
        else 0
    )

    total_income = (
        float(income["Amount"].sum())
        if not income.empty
        else 0
    )

    average_expense = (
        float(expenses["Amount"].mean())
        if not expenses.empty
        else 0
    )

    highest_expense = (
        float(expenses["Amount"].max())
        if not expenses.empty
        else 0
    )

    lowest_expense = (
        float(expenses["Amount"].min())
        if not expenses.empty
        else 0
    )

    summary = {

        "totalIncome": total_income,

        "totalExpense": total_expense,

        "balance": total_income - total_expense,

        "averageExpense": average_expense,

        "highestExpense": highest_expense,

        "lowestExpense": lowest_expense,

        "totalExpenseTransactions": int(expenses.shape[0]),

        "totalIncomeTransactions": int(income.shape[0])

    }

    return summary


# ==========================================
# CATEGORY SUMMARY
# ==========================================
def get_category_summary(user_id):

    expenses = get_expenses(user_id)

    if expenses.empty:

        return []

    category_summary = (

        expenses

        .groupby("CategoryName")["Amount"]

        .sum()

        .reset_index()

        .sort_values(by="Amount", ascending=False)

    )

    return category_summary.to_dict(orient="records")


# ==========================================
# MONTHLY SUMMARY
# ==========================================
def get_monthly_summary(user_id):

    expenses = get_expenses(user_id)

    if expenses.empty:
        return []

    expenses["ExpenseDate"] = pd.to_datetime(expenses["ExpenseDate"])

    monthly = (
        expenses
        .groupby(expenses["ExpenseDate"].dt.strftime("%B"))["Amount"]
        .sum()
        .reset_index()
    )

    monthly.columns = ["Month", "Amount"]

    return monthly.to_dict(orient="records")


# ==========================================
# INCOME VS EXPENSE
# ==========================================
def get_income_vs_expense(user_id):

    expenses = get_expenses(user_id)
    income = get_income(user_id)

    total_income = (
        float(income["Amount"].sum())
        if not income.empty
        else 0
    )

    total_expense = (
        float(expenses["Amount"].sum())
        if not expenses.empty
        else 0
    )

    return {

        "totalIncome": total_income,

        "totalExpense": total_expense,

        "balance": total_income - total_expense

    }


# ==========================================
# SAVINGS
# ==========================================
def get_savings(user_id):

    expenses = get_expenses(user_id)
    income = get_income(user_id)

    total_income = (
        float(income["Amount"].sum())
        if not income.empty
        else 0
    )

    total_expense = (
        float(expenses["Amount"].sum())
        if not expenses.empty
        else 0
    )

    savings = total_income - total_expense

    saving_percentage = 0

    if total_income > 0:

        saving_percentage = (
            savings / total_income
        ) * 100

    return {

        "Income": total_income,

        "Expense": total_expense,

        "Savings": savings,

        "SavingPercentage": round(
            saving_percentage,
            2
        )

    }


# ==========================================
# TOP 5 EXPENSES
# ==========================================
def get_top_expenses(user_id):

    expenses = get_expenses(user_id)

    if expenses.empty:
        return []

    top = (

        expenses

        .sort_values(
            by="Amount",
            ascending=False
        )

        .head(5)

    )

    return top.to_dict(
        orient="records"
    )


# ==========================================
# AI INSIGHTS
# ==========================================
def get_ai_insights(user_id):

    expenses = get_expenses(user_id)

    if expenses.empty:

        return {

            "highestCategory": None,

            "highestExpense": 0,

            "averageExpense": 0,

            "suggestion": "No expense data found."

        }

    category = (

        expenses

        .groupby("CategoryName")["Amount"]

        .sum()

    )

    highest_category = category.idxmax()

    highest_amount = float(category.max())

    average = float(
        expenses["Amount"].mean()
    )

    return {

        "highestCategory": highest_category,

        "highestExpense": highest_amount,

        "averageExpense": average,

        "suggestion": f"Try reducing spending on {highest_category} to save more money."

    }