export async function getAllDataPerMonth() {
  try {
    const response = await fetch(
      `https://red-cross-api-final.onrender.com/api/user/getAllDataPerMonth`
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

export async function getAllCities() {
  try {
    const response = await fetch(
      `https://red-cross-api-final.onrender.com/api/user/getAllCities`
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

export async function getAllGenders() {
  try {
    const response = await fetch(
      `https://red-cross-api-final.onrender.com/api/user/getAllGenders`,
      {}
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
