CREATE VIEW CategoryExpenseSummary
AS
SELECT
    c.CategoryName,
    SUM(e.Amount) AS TotalSpent
FROM Expenses e
JOIN Categories c
ON e.CategoryId = c.CategoryId
GROUP BY c.CategoryName;
GO





CREATE VIEW DashboardSummary
AS
SELECT
(
    SELECT SUM(Amount)
    FROM Income
) AS TotalIncome,

(
    SELECT SUM(Amount)
    FROM Expenses
) AS TotalExpense,

(
    (SELECT SUM(Amount) FROM Income)
    -
    (SELECT SUM(Amount) FROM Expenses)
) AS Savings;
GO


