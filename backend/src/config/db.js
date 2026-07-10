require("dotenv").config();

const sql = require("mssql");

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,

  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  port: Number(process.env.DB_PORT),

  options: {
    trustServerCertificate: true,
    encrypt: false,
  },
};

async function connectDB() {
  try {
    await sql.connect(config);
    console.log("✅ Database Connected");
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = {
  sql,
  connectDB,
};
