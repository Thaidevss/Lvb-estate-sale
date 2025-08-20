<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 text-center">
    <h1 class="text-9xl font-bold text-blue-500">404</h1>
    <p class="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
      Page Not Found
    </p>
    <p class="text-gray-600 mt-2">
      Sorry, the page you are looking for doesn't exist or has been moved.
    </p>
    <router-link to="/" class="mt-6 inline-block px-6 py-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition">
      Go Back Home
    </router-link>
  </div>
</template>

<script setup>
// No script logic needed for this simple page
</script>

<style>
/* Add custom styles here if needed */
</style>
