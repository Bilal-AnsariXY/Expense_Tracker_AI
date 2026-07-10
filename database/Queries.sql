SELECT * FROM Users;

SELECT * FROM Expenses;

SELECT * FROM Income;

SELECT * FROM Categories;

SELECT SUM(Amount) AS TotalExpense
FROM Expenses;

SELECT
    c.CategoryName,
    SUM(e.Amount) AS TotalSpent
FROM Expenses e
JOIN Categories c
ON e.CategoryId = c.CategoryId
GROUP BY c.CategoryName;




SELECT * FROM CategoryExpenseSummary;


SELECT * FROM DashboardSummary;



SELECT @@SERVERNAME;




SELECT
    local_net_address,
    local_tcp_port
FROM sys.dm_exec_connections
WHERE session_id = @@SPID;




SELECT @@SERVICENAME;


SELECT name
FROM sys.sql_logins;




SELECT SERVERPROPERTY('IsIntegratedSecurityOnly');



SELECT name, is_disabled
FROM sys.sql_logins;



ALTER LOGIN sa ENABLE;



SELECT name, is_disabled
FROM sys.sql_logins;



ALTER LOGIN sa
WITH PASSWORD = 'Bilal@12345';



SELECT name, is_disabled
FROM sys.sql_logins
WHERE name = 'sa';




ALTER LOGIN sa ENABLE;



SELECT name,
       is_disabled
FROM sys.sql_logins
WHERE name = 'sa';



SELECT SERVERPROPERTY('IsIntegratedSecurityOnly');