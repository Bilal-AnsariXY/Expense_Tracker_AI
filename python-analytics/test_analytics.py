from analytics import get_expenses

expenses = get_expenses()

print("========== DATA ==========")
print(expenses)

print("\n========== TOTAL EXPENSE ==========")
print(expenses["Amount"].sum())

print("\n========== AVERAGE EXPENSE ==========")
print(expenses["Amount"].mean())

print("\n========== HIGHEST EXPENSE ==========")
print(expenses["Amount"].max())

print("\n========== LOWEST EXPENSE ==========")
print(expenses["Amount"].min())

print("\n========== TOTAL TRANSACTIONS ==========")
print(expenses.shape[0])

print("\n========== CATEGORY WISE EXPENSE ==========")

print(
    expenses.groupby("CategoryId")["Amount"].sum()
)