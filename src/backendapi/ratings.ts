export async function getInstructorRatings(id: string | undefined) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/ratings/getInstructorRatings/${id}`
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
