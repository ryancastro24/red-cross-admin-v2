export const checkAuth = () => {
  // Get all cookies as a string
  const cookies = document.cookie;

  // Log all cookies to see their content
  console.log("All cookies:", cookies);

  // Search for the session_token cookie in the document cookies
  const sessionToken = cookies
    .split("; ")
    .find((row) => row.startsWith("session_token="));

  // Extract the value of session_token from the cookie string
  if (sessionToken) {
    const token = sessionToken.split("=")[1];
    console.log("Session Token: ", token);
    return token ? true : false;
  }

  console.log("No session token found");
  return false;
};
