import axios from "axios";

export const getUserById = async (userId) => {
  try {
    // Mengirim request GET ke API dengan userId
    const response = await axios.get(
      `http://localhost:8080/users/${userId}`
    );
    return response.data; // Mengembalikan data pengguna
  } catch (error) {
    console.error("Error fetching user data:", error); // Log error untuk debugging
    throw new Error("Failed to fetch user data"); // Menyediakan informasi kesalahan yang lebih jelas
  }
};
