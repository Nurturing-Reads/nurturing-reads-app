import { emailRegex } from "../misc/emailRegex";

export const signupHandler = async ({ email, password, checkPassword, displayName, signup }) => {
  if (!emailRegex.test(email)) return { success: false, error: "Invalid Email Address" };
  if (!password || !checkPassword) return { success: false, error: "Passwords cannot be empty" };
  if (password !== checkPassword) return { success: false, error: "Passwords do not match" };

  try {
    await signup(email, password, displayName);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};