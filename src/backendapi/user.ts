export type UserType = {
  name: string;
  address: string;
  category: string;
  orNumber: number;
  dateStarted: string;
  email: string;
};

export async function registerUser(formData: FormData) {
  try {
    const response = await fetch(
      "https://red-cross-api-final.onrender.com/register",
      {
        method: "POST",
        body: formData, // Send FormData as the body of the request
      }
    );

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

export async function getUsersData() {
  try {
    const response = await fetch(
      "https://red-cross-api-final.onrender.com/api/user"
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

export async function updateUserData(formData: UserType, id: string) {
  console.log("i was called");

  try {
    const response = await fetch(
      `https://red-cross-api-final.onrender.com/api/user/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // This tells the server the body is JSON
        },
        body: JSON.stringify(formData), // Send FormData as the body of the request
      }
    );

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

export async function deleteUserData(id: string) {
  console.log("Delete request initiated for user ID:", id);

  try {
    const response = await fetch(
      `https://red-cross-api-final.onrender.com/api/user/${id}`,
      {
        method: "DELETE", // Change method to DELETE
        headers: {
          "Content-Type": "application/json", // Optional, but good practice
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log("User deleted successfully:", result);
      return result; // Return the response from the server
    } else {
      console.error("Failed to delete user.");
      // Optionally handle the failure, for example, by returning the error message
    }
  } catch (error) {
    console.error("Error during delete request:", error);
  }
}

export async function updateUserCertificates(userIds: any) {
  try {
    const response = await fetch(
      `https://red-cross-api-final.onrender.com/api/user/updatecerts/update`,
      {
        method: "PUT", // Use PUT for updating resources
        headers: {
          "Content-Type": "application/json", // Specify JSON content
        },
        body: JSON.stringify({ userIds }), // Send the array in the request body
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log("Users updated successfully:", result);
      return result; // Return the response from the server
    } else {
      const error = await response.json();
      console.error("Failed to update users.", error);
      throw new Error(error.message || "Failed to update users.");
    }
  } catch (error) {
    console.error("Error during update request:", error);
    throw error; // Re-throw the error for further handling
  }
}
