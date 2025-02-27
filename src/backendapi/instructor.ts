const apiUrl = import.meta.env.VITE_API_URL;
export async function getInstructorsData() {
  try {
    const response = await fetch(
      `${apiUrl}/api/ratings/getAllInstructorRatings`
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
