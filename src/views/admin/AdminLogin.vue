<template>
  <div class="main-class min-h-screen flex items-center justify-center p-4 bg-gray-100">
    <div class="bg-white rounded-lg shadow-sm shadow-amber-50 w-full max-w-md">
      <div class="text-md font-bold mb-1 px-5 text-center bg-white text-white py-2 rounded-t-lg">
        <img src="../../assets/images/LVB-logo-fullname.png" class="h-8 mt-4 mx-auto" alt="">
      </div>
      <form @submit.prevent="handleLogin">
        <div class="text-center font-bold mb-3 text-gray-500 text-md">
          <p>LaoVietBank Estate for Sale.</p>
        </div>
        <div class="mb-4 px-4 sm:px-16">
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="user"
              v-model="user"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your username"
              required
            />
          </div>
        </div>

        <div class="mb-4 mt-6 px-4 sm:px-16">               
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockClosedIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="password"
              v-model="password"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <div class="px-4 sm:px-16 pb-6 pt-2">
          <button
            type="submit"
            class="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {{ authStore.isLoading ? "Loading..." : "Login" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";
import {
  LockClosedIcon,
  UserIcon
} from "@heroicons/vue/24/outline";
import { useAuthStore } from "../../stores/authAdminLogin";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const user = ref("");
const password = ref("");
const showLoginError = ref(false);

onMounted(() => {
  if (authStore.isAuthenticated) {
    const redirect = router.currentRoute.value.query.redirect || '/admin'
    router.push(redirect)
  }
})

const { $modal, $loading } = getCurrentInstance().appContext.config.globalProperties

const handleLogin = async () => {
  const result = await authStore.login(user.value, password.value)

  if (!result.success) { 
    await $modal.open({
      title: "Login Failed",
      message: result.error || "Unknown error",
      type: "error",
      confirmButtonText: "OK",
    });
  } else {
    router.push('/admin')
  }
}
</script>

<style scoped>
.main-class {
  background-image: linear-gradient(
    rgba(1, 25, 59, 0.5), 
    rgba(2, 8, 43, 0.5)
  ), url('../../assets/images/Asset 3.png');
  background-size: cover;
  background-position: center;
}

@media (max-width: 640px) {
  .main-class {
    background-attachment: fixed;
  }
}
</style>