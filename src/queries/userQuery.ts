export const userQuery = {
  signupUser: "INSERT INTO users (email, password) VALUES (?, ?)",
  authUser: "SELECT * FROM users WHERE email = ?",
  updateUser:
    "UPDATE users SET username = ?, email = ?, password = ?, upd_dt = NOW() WHERE id = ?",
  deleteUser: "DELETE FROM users WHERE id = ?",
  getUserById: `
  SELECT *
  FROM users
  WHERE id = ?
`,
  //   updateUserById: `
  //   UPDATE users
  //   SET email=?
  //   WHERE id=?
  // `,
  // deleteUserById: `
  //   DELETE FROM users
  //   WHERE id=?
  // `,
};
