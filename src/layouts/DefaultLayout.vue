<template>
  <div>
    <div 
      ref="navbarRef" 
      :class="[
        'fixed top-0 left-0 right-0 z-50 transition-transform duration-300',
        isNavbarHidden ? '-translate-y-full' : 'translate-y-0'
      ]"
    >
      <Navbar />
    </div>
    <!-- <Navbar /> -->
    <main class="p-0 pt-18">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted}from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const navbarRef = ref(null)
const isNavbarHidden = ref(false)
const lastScrollPosition = ref(0)
const sliderRef = ref(null)
let autoSlideInterval = null


const scrollLeft = () => {
  sliderRef.value.scrollBy({ left: -300, behavior: "smooth" })
}

const scrollRight = () => {
  sliderRef.value.scrollBy({ left: 300, behavior: "smooth" })
}
const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  
  if (currentScrollPosition < 0) {
    return
  }
  
  if (currentScrollPosition < lastScrollPosition.value) {
    isNavbarHidden.value = false
  } 
  else if (currentScrollPosition > lastScrollPosition.value && currentScrollPosition > 100) {
    isNavbarHidden.value = true
  }
  
  lastScrollPosition.value = currentScrollPosition
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  autoSlideInterval = setInterval(() => {
    if (sliderRef.value) {
      const maxScrollLeft = sliderRef.value.scrollWidth - sliderRef.value.clientWidth
      if (sliderRef.value.scrollLeft >= maxScrollLeft) {
        sliderRef.value.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        scrollRight()
      }
    }
  }, 3000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  clearInterval(autoSlideInterval)
})
</script>