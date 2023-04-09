export const userQuery = {
  signupUser: "INSERT INTO users (email, name, password) VALUES (?, ?, ?)",
  authUser: "SELECT * FROM users WHERE email = ?",
  oAuthUser: "INSERT INTO users (email, name, picture) VALUES (?, ?, ?)",
  deleteUser: "DELETE FROM users WHERE id = ?",
  getUserById: `
  SELECT *
  FROM users
  WHERE id = ?
`,
  saveVerificationCode:
    "INSERT INTO verification_codes (email, code) VALUES (?, ?)",
  removeVerificationCode:
    "DELETE FROM verification_codes WHERE email = ? AND code = ?",

  checkVerificationCode:
    "SELECT * FROM verification_codes WHERE email = ? AND code = ?",
};
