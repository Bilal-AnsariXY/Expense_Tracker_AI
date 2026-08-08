// const { sql } = require("../config/db");
// const { generateToken } = require("../utils/jwt");
// const googleCallback = async (req, res) => {
//   try {
//     const profile = req.user;

//     const googleId = profile.id;
//     const name = profile.displayName;
//     const email = profile.emails[0].value;
//     const profilePicture = profile.photos[0].value;

//     // Check if user already exists
//     const existingUser = await sql.query`
//       SELECT * FROM Users
//       WHERE GoogleId = ${googleId}
//     `;

//     let user;

//     if (existingUser.recordset.length === 0) {
//       // Insert new user
//       const newUser = await sql.query`
//         INSERT INTO Users
//         (
//           GoogleId,
//           Name,
//           Email,
//           ProfilePicture
//         )

//         OUTPUT INSERTED.*

//         VALUES
//         (
//           ${googleId},
//           ${name},
//           ${email},
//           ${profilePicture}
//         )
//       `;

//       user = newUser.recordset[0];
//     } else {
//       user = existingUser.recordset[0];
//     }

//     const token = generateToken(user.UserId);

//     const frontendUrl = process.env.FRONTEND_URL;

//     const userData = encodeURIComponent(JSON.stringify(user));

//     res.redirect(`${frontendUrl}/auth/success?token=${token}&user=${userData}`);
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// module.exports = {
//   googleCallback,
// };

const { pool } = require("../config/db");
const { generateToken } = require("../utils/jwt");

const googleCallback = async (req, res) => {
  try {
    const profile = req.user;

    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;
    const profilePicture = profile.photos[0].value;

    // Check if user already exists
    const existingUser = await pool.query(
      `
      SELECT *
      FROM Users
      WHERE GoogleId = $1
      `,
      [googleId],
    );

    let user;

    if (existingUser.rows.length === 0) {
      // Insert new user
      const newUser = await pool.query(
        `
        INSERT INTO Users
        (
          GoogleId,
          Name,
          Email,
          ProfilePicture
        )
        VALUES
        (
          $1,
          $2,
          $3,
          $4
        )
        RETURNING *
        `,
        [googleId, name, email, profilePicture],
      );

      user = newUser.rows[0];
    } else {
      user = existingUser.rows[0];
    }

    const token = generateToken(user.userid);

    const frontendUrl = process.env.FRONTEND_URL;

    const userData = encodeURIComponent(JSON.stringify(user));

    res.redirect(`${frontendUrl}/auth/success?token=${token}&user=${userData}`);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  googleCallback,
};