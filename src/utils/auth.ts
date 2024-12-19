export const checkAuth = () => {
  // Get the session_token from localStorage
  const sessionToken = localStorage.getItem("session_token");

  // Log the session token to see its content
  console.log("Session Token: ", sessionToken);

  // Check if the session_token exists in localStorage
  if (sessionToken) {
    return true; // Token exists, so the user is authenticated
  }

  console.log("No session token found in localStorage");
  return false; // No token, user is not authenticated
};
