

import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import CryptoJS from "crypto-js";

const secret =
  "soukphasoneLVBf3e1b2648d3a44a2f1975db9b88d86be267e5a823bbca50a8e6d7525d0c3c2b5";

export const useTestStore = defineStore("test", () => {
  const isLoading = ref(false);
  const sentPayload = ref(null);
  const apiResponse = ref(null);
  const decryptedData = ref(null);
  const error = ref(null);

  function encryptData(data) {
    try {
      const key = CryptoJS.SHA256(secret);
      const iv = CryptoJS.lib.WordArray.random(16);

      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      const ivBase64 = CryptoJS.enc.Base64.stringify(iv);
      const ciphertextBase64 = encrypted.ciphertext.toString(
        CryptoJS.enc.Base64
      );

      return `${ivBase64}:${ciphertextBase64}`;
    } catch (e) {
      console.error("Encryption failed:", e);
      throw e;
    }
  }
  function decryptData(data) {
    try {
      if (!data) return null;
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
    } catch (e) {
      console.error("Decryption failed:", e);
      throw e;
    }
  }
async function fetchData() {
  isLoading.value = true;
  error.value = null;
  apiResponse.value = null;
  decryptedData.value = null;

  try {
    const response = await axios.post("http://10.2.182.23:8000/test", {
      DATA: "dEEKhnPOLNw1g1wxwqI2eg==:XGn1S3KqUtgb27bsh5Dkbw==",
    });

    const rawData = response.data;
    apiResponse.value = rawData; // เก็บข้อมูล response ดิบ

    const encryptedData = rawData.DATA_SEND_FROM_API?.data_2;

    let decryptedValue = null;
    if (encryptedData) {
      try {
        decryptedValue = decryptData(encryptedData);
      } catch (decryptError) {
        console.error("Decryption of data_2 failed:", decryptError);
        error.value = "Failed to decrypt API data.";
        return;
      }
    }
    decryptedData.value = {
      data_1: rawData.DATA_SEND_FROM_API?.data_1, 
      decrypted_data_2: decryptedValue, 
    };

  } catch (e) {
    console.error("Fetch data failed:", e);
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
}

  return {
    isLoading,
    sentPayload,
    apiResponse,
    decryptedData,
    error,
    fetchData,
    encryptData,
    decryptData,
  };
});
