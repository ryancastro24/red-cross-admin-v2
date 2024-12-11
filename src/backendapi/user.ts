export async function registerUser(formData: FormData) {
  try {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: formData, // Send FormData as the body of the request
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Data uploaded successfully:", result);
      return result; // Return the response from the server
    } else {
      console.error("Failed to upload data to the server.");
    }
  } catch (error) {
    console.error("Error during data upload:", error);
  }
}
