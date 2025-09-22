import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import apiService from "../services/apiService";
import CryptoJS from "crypto-js";

const secret = import.meta.env.VITE_SECRET_KEY_ENCRYPT;

export const usePostStore = defineStore("post", () => {
  // State
  const posts = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const API_URL = import.meta.env.VITE_BASE_API_URL;

  function encryptData(data) {
    const key = CryptoJS.SHA256(secret);
    const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const ivBase64 = CryptoJS.enc.Base64.stringify(iv);
    const ciphertextBase64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

    return `${ivBase64}:${ciphertextBase64}`;
  }

  function decryptData(data) {
    const [ivBase64, ciphertextBase64] = data.split(":");
    const iv = CryptoJS.enc.Base64.parse(ivBase64);
    const ciphertext = CryptoJS.enc.Base64.parse(ciphertextBase64);
    const key = CryptoJS.SHA256(secret);

    const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7, 
    });

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedText);
  }

  const fetchPosts = async (filters = {}) => {
    // console.log("Called fetch post", filters);

    try {
      loading.value = true;

      const encryptedPayload = encryptData(filters);

      const response = await axios.post(`${API_URL}/auction/view`, {
        DATA: encryptedPayload,
      });
      // console.log("Raw Response Data:", response.data);
      const encryptedDataString = response.data?.data;

      if (encryptedDataString && typeof encryptedDataString === "string") {
        try {
          const decryptedData = decryptData(encryptedDataString);

          if (Array.isArray(decryptedData)) {
            posts.value = decryptedData.map((item) => {
              let land = item.LAND_DETAILS || {};
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
                STATUS: item.STATUS || {}, 
              };
            });

            // console.log("Fetch Data Log (Decrypted):", posts.value);
          } else {
            console.error("Decrypted data is not an array:", decryptedData);
            posts.value = [];
          }
        } catch (decryptError) {
          console.error(
            "Failed to decrypt the main data payload:",
            decryptError
          );
          error.value = "Failed to process data from the server.";
          posts.value = [];
        }
      } else {
        console.error(
          "No encrypted data found in response or data is not a string."
        );
        posts.value = [];
      }
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

  // const viewCountDetail = async (id) => {
  //   console.log("Detail ID", id);
  //   try {
  //     loading.value = true;
  //     await apiService.post(`${API_URL}/auction/view/detail`, { ID: id });
  //   } catch (err) {
  //     error.value = err.message;
  //     console.error("Error fetching detail post:", err);
  //     throw err;
  //   }
  // };

  const viewCountDetail = async (id) => {
    console.log("Detail ID", id);
    try {
      loading.value = true;

      const encryptedPayload = encryptData({ ID : id });

      console.log('response encrypt', encryptedPayload);
      const decrypt = decryptData("et8r3fQD/i7Dzic4RPKeBw==:Kxdw0gUVsd1dC4/y4HHZ0D6hGL3SdYqh9DPMv3q9J0VeppYXEB8nYOZQb3tdI/sR6kbSlPYkeayorvREghTYh52ZwfHECJZgSZ5CGFBz5sa39AK1mV95oyVqnqzMe2P7ieGMW6MkwhIzM6SD0zv5k5849jS9EDk1s0lKO6bR7LFTknLj/CYBuzfqhe8uT5RzsaReo49MIq/rhI0V8XpWSUVCkJYRWpUu7A0Ap92ookJrqHpm3BWDXpwQDz4knUPtHKjI2ifDlKn8RIG5GXP0gHKCruWwAiTVjxkB1fcNPTENATTYQ37BNys5ub9CKS+qZ1O8GNlLHEcm8vHodGoJTbRCqh8DSWlfWzOkHZdjOZ/EyGHWX1XOtEBq8bOViheaJEUC5PzYuFXsSTtkhEbAMCOmq6WipPEDw9L70wh1DhXLXdUIi/cLyvrECw0gNww3zPrnfMPjQ5bbmuYOB4L5DIQy+b1nlBHirbC77nq5oQmYRsBt2+3BL7I+jBqp3EjHHKO/A4kKSe093t9SmnZ2pCyrn7KmDyz/i3FUgkd2lqusGMEZm4+wy8d28vhG8tG8HpcQGDf2/pL0IXB9pO/k9lV6inHXaEpq8eRPoX+qZS15fa0U14xXQua5iF8xmlVzgWVv15ojN84pCrfTo84puoSx5A5obNGTEsIuwrjMchGD4cGEjdFYR9+ZjMI4x1LB31OJe6o06bVNm61SHAqWtH4/ZuUUhcf9r59/MVLiEVCKfr90aSGfEEYr6Sa3/rWgJrCE35Enavn8i01G2zj1kZ3zR9bAvT81GwWxwrJNcoY5UY5Sxwa2oIeTKYyasfGtaiHsJ/1Z105ZphUZipo76Q==")
      console.log('decrypt 1:', decrypt);


      const response = await apiService.post(`${API_URL}/auction/view/detail`, {
        DATA: encryptedPayload,
      });

      const encryptedDataString = response.data?.data;

      if (encryptedDataString && typeof encryptedDataString === "string") {
        const decryptedData = decryptData(encryptedDataString);
        console.log("Detail (Decrypted):", decryptedData);
        return decryptedData;
      } else {
        console.error("No encrypted detail data found in response.");
        return null;
      }
    } catch (err) {
      error.value = err.message;
      console.error("Error fetching detail post:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updatePostStatus = async (id, authorizationLevel) => {
    try {
      loading.value = true;
      
      // สร้าง payload ตามที่ API ต้องการ
      const payload = {
        ID: id,
        AUTHORIZATION_LEVEL: authorizationLevel
      };

      console.log("Sending update status request:", payload);

      // ส่ง request ไปยัง API โดยไม่ต้องเข้ารหัส
      const response = await apiService.post(`${API_URL}/auction/update`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Update status response:", response.data);

      // อัปเดตสถานะใน store ทันที (ไม่ต้องรอ refetch)
      const postIndex = posts.value.findIndex(post => 
        post.id === id || post.ID === id || post._id === id
      );
      
      if (postIndex !== -1) {
        posts.value[postIndex].STATUS.AUTHORIZATION_LEVEL = authorizationLevel;
        console.log("Updated post status in store");
      }

      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
      console.error("Error updating post status:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // ฟังก์ชันสำหรับ authorized (สถานะ 1)
  const authorizePost = async (id) => {
    return await updatePostStatus(id, 1);
  };

  // ฟังก์ชันสำหรับ disable (สถานะ 2)
  const disablePost = async (id) => {
    return await updatePostStatus(id, 2);
  };

  const setPendingPost = async (id) => {
    return await updatePostStatus(id, 0);
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
    authorizePost,    
    disablePost,    
    setPendingPost
  };
});



 // const fetchPosts = async (filters = {}) => {
  //   console.log("Called fetch post", filters);
  //   console.log("API URL:", import.meta.env.VITE_BASE_API_URL);

  //   try {
  //     loading.value = true;
  //     const encryptedPayload = encryptData(filters);
  //     const response = await axios.post(`${API_URL}/auction/view`, {DATA: encryptedPayload });

  //     const rawPosts = response.data?.data || [];

  //     posts.value = rawPosts.map((item) => {
  //       const land = item.LAND_DETAILS || {};
  //       return {
  //         id: item._id,
  //         ...land,
  //         PROFILE_IMAGE: land.IMAGES?.PROFILE_IMAGE || "",
  //         DETAIL_IMAGE: land.IMAGES?.DETAIL_IMAGE || [],
  //         TEL: land.CONTACT?.TEL || "",
  //         EMAIL: land.CONTACT?.EMAIL || "",
  //         MAP_LOCATION: land.MAP_LOCATION || "",
  //         CREATED_BY: item.CREATED_BY || "",
  //         CREATED_AT: item.CREATED_AT || "",
  //         UPDATED_AT: item.UPDATED_AT || "",
  //       };
  //     });

  //     console.log("Fetch Data Log:", rawPosts);
  //   } catch (err) {
  //     error.value = err.message;
  //     console.error("Error fetching posts:", err);
  //   } finally {
  //     loading.value = false;
  //   }
  // };