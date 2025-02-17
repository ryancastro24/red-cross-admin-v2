export async function getInstructorRatings(id: string | undefined) {
  try {
    const response = await fetch(
      `https://red-cross-api-final.onrender.com/api/ratings/getInstructorRatings/${id}`,
      {
        credentials: "include", // Include cookies in the request
      }
    );

    if (response.ok) {
      const result = await response.json();
      return result; // Return the response from the server
    } else {
      console.error("Failed to upload data to the server.");
    }
  } catch (error) {
    console.error("Error during data upload:", error);
  }
}
