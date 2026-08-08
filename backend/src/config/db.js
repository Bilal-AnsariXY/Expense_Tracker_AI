// require("dotenv").config();

// const sql = require("mssql");

// const config = {
//   server: process.env.DB_SERVER,
//   database: process.env.DB_DATABASE,

//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,

//   port: Number(process.env.DB_PORT),

//   options: {
//     trustServerCertificate: true,
//     encrypt: false,
//   },
// };

// async function connectDB() {
//   try {
//     await sql.connect(config);
//     console.log("✅ Database Connected");
//   } catch (error) {
//     console.error("❌ Database Connection Failed");
//     console.error(error.message);
//     process.exit(1);
//   }
// }

// module.exports = {
//   sql,
//   connectDB,
// };

require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false,
  },
});

async function connectDB() {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL Connected");
    client.release();
  } catch (error) {
    console.error("❌ PostgreSQL Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = {
  pool,
  connectDB,
};