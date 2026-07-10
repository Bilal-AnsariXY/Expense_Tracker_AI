INSERT INTO Categories
(CategoryName, CategoryType)
VALUES
('Food', 'Expense'),
('Travel', 'Expense'),
('Shopping', 'Expense'),
('Bills', 'Expense'),
('Entertainment', 'Expense'),

('Salary', 'Income'),
('Freelance', 'Income'),
('Business', 'Income');



INSERT INTO Users
(
    GoogleId,
    Name,
    Email,
    ProfilePicture
)
VALUES
(
    'google123',
    'Bilal Ansari',
    'bilal@gmail.com',
    'profile.jpg'
);



INSERT INTO Income
(
    UserId,
    CategoryId,
    Amount,
    Description,
    IncomeDate
)
VALUES
(
    1,
    6,
    30000,
    'June Salary',
    '2026-06-21'
);


INSERT INTO Income
(
    UserId,
    CategoryId,
    Amount,
    Description,
    IncomeDate
)
VALUES
(
    1,
    7,
    5000,
    'Freelance Website',
    '2026-06-15'
);


INSERT INTO Expenses
(
    UserId,
    CategoryId,
    Amount,
    Description,
    ExpenseDate
)
VALUES
(
    1,
    1,
    500,
    'Pizza Hut',
    '2026-06-20'
),
(
    1,
    2,
    1000,
    'Bus Ticket',
    '2026-06-18'
),
(
    1,
    3,
    2000,
    'New Shoes',
    '2026-06-10'
),
(
    1,
    4,
    1500,
    'Electricity Bill',
    '2026-06-05'
),
(
    1,
    5,
    800,
    'Movie Ticket',
    '2026-06-12'
);

