import { removeToken } from "./auth";
export const handleError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        removeToken();
        router.push({ name: "Login" });
        break;
      case 403:
        alert("You do not have permission to access this page.");
        break;
      case 404:
        alert("The requested resource was not found.");
        break;
      case 500:
        alert("An internal server error occurred.");
        break;
      default:
        alert("An error occurred: " + error.response.status);
    }
  }
  return Promise.reject(error);
};
