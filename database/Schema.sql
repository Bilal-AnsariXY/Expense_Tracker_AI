CREATE TABLE Users
(
    UserId INT PRIMARY KEY IDENTITY(1,1),

    GoogleId NVARCHAR(255),

    Name NVARCHAR(100),

    Email NVARCHAR(255) UNIQUE,

    ProfilePicture NVARCHAR(500),

    CreatedAt DATETIME DEFAULT GETDATE()
);

CREATE TABLE Categories
(
    CategoryId INT PRIMARY KEY IDENTITY(1,1),

    CategoryName NVARCHAR(100) NOT NULL UNIQUE,

    CategoryType NVARCHAR(20) NOT NULL
);


CREATE TABLE Income
(
    IncomeId INT PRIMARY KEY IDENTITY(1,1),

    UserId INT NOT NULL,

    CategoryId INT NOT NULL,

    Amount DECIMAL(10,2) NOT NULL,

    Description NVARCHAR(255),

    IncomeDate DATE NOT NULL,

    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (UserId)
    REFERENCES Users(UserId),

    FOREIGN KEY (CategoryId)
    REFERENCES Categories(CategoryId)
);



CREATE TABLE Expenses(
    ExpenseId INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    CategoryId INT NOT NULL,
    Amount DECIMAL(10,2) NOT NULL,
    Description NVARCHAR(255),
    ExpenseDate DATE NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (UserId)
    REFERENCES Users(UserId),

    FOREIGN KEY (CategoryId)
    REFERENCES Categories(CategoryId)
);





