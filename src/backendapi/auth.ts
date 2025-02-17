export async function loginUser(data: any) {
  console.log(data);
  try {
    const response = await fetch(
      `https://red-cross-api-final.onrender.com/api/user/loginUserWithSession/login`,
      {
        method: "POST",
        credentials: "include", // Don't forget to specify this if you need cookies
        headers: {
          "Content-Type": "application/json", // Explicitly set JSON content type
        },
        body: JSON.stringify(data), // Send FormData as the body of the request
      }
    );

    if (response.ok) {
      const result = await response.json();

      console.log("result", result);
      console.log("Data uploaded successfully:", result);
      localStorage.setItem("session_token", result.data); // Save token in localStorage

      // Optionally, store the userType if needed
      localStorage.setItem("userType", result.userType);

      // You can now redirect the user or take further actions
      console.log("Login successful!");
      return result; // Return the response from the server
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during data upload:", error);
  }
}
