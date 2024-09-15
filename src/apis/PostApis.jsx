import axios from "axios";

export const deletePost = async (postId) => {
  try {
    // Mengirim request DELETE ke API dengan postId
    const response = await axios.delete(
      `http://localhost:8080/posts/${postId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete post");
  }
};
