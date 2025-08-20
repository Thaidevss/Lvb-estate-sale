import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import apiService from "../services/apiService";

export const usePostStore = defineStore("post", () => {
  // State
  const posts = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // const API_URL = "http://10.2.182.23:8000/auction";
  const API_URL = import.meta.env.VITE_BASE_API_URL;

  const fetchPosts = async (filters = {}) => {
    console.log("Called fetch post", filters);
    console.log("API URL:", import.meta.env.VITE_BASE_API_URL);

    try {
      loading.value = true;
      const response = await axios.post(`${API_URL}/auction/view`, filters);

      const rawPosts = response.data?.data || [];

      posts.value = rawPosts.map((item) => {
        const land = item.LAND_DETAILS || {};
        return {
          id: item._id,
          ...land,
          PROFILE_IMAGE: land.IMAGES?.PROFILE_IMAGE || "",
          DETAIL_IMAGE: land.IMAGES?.DETAIL_IMAGE || [],
          TEL: land.CONTACT?.TEL || "",
          EMAIL: land.CONTACT?.EMAIL || "",
          MAP_LOCATION: land.MAP_LOCATION || "",
          CREATED_BY: item.CREATED_BY || "",
          CREATED_AT: item.CREATED_AT || "",
          UPDATED_AT: item.UPDATED_AT || "",
        };
      });

      console.log("Fetch Data Log:", rawPosts);
    } catch (err) {
      error.value = err.message;
      console.error("Error fetching posts:", err);
    } finally {
      loading.value = false;
    }
  };

  const createPost = async (formData) => {
    try {
      loading.value = true;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await apiService.post(
        `${API_URL}/auction/add`,
        formData,
        config
      );
      posts.value.push(response.data);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
      console.error("Error creating post:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  //   const updatePost = async (id, postData) => {
  //     try {
  //       loading.value = true
  //       const response = await axios.post(`${API_URL}/update`, postData)
  //       const index = posts.value.findIndex(p => p.id === id)
  //       if (index !== -1) {
  //         posts.value[index] = response.data
  //       }
  //       return response.data
  //     } catch (err) {
  //       error.value = err.message
  //       console.error('Error updating post:', err)
  //       throw err
  //     } finally {
  //       loading.value = false
  //     }
  //   }

  const updatePost = async (id, formData) => {
    try {
      loading.value = true;

      // Debug log
      console.log("Sending update for post ID:", id);
      console.log("FormData content:", formData);
      for (let [key, value] of formData.entries()) {
        console.log(key, value instanceof File ? value.name : value);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      // ตรวจสอบว่า ID ถูกส่งไปด้วย
      if (!id) {
        throw new Error("Missing post ID for update");
      }

      // สำหรับบาง API อาจต้องการให้ส่ง ID ใน URL
      const response = await apiService.post(
        `${API_URL}/auction/update`,
        formData,
        config
      );

      // อัปเดตข้อมูลใน store
      posts.value = posts.value.map((post) =>
        post.id === id || post.ID === id || post._id === id
          ? { ...post, ...response.data }
          : post
      );

      return response.data;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const deletePost = async (id) => {
    try {
      console.log("delete ID STORE", id);
      loading.value = true;
      const response = await apiService.post(
        `${API_URL}/auction/delete`,
        { ID: id },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (err) {
      error.value = err.message;
      console.error("Error deleting post:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const viewCountDetail = async (id) => {
    console.log("Detail ID", id);
    try {
      loading.value = true;
      await apiService.post(`${API_URL}/auction/view/detail`, { ID: id });
    } catch (err) {
      error.value = err.message;
      console.error("Error fetching detail post:", err);
      throw err;
    }
  };

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    viewCountDetail,
  };
});
