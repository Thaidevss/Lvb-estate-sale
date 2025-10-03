<template>
  <nav class="bg-gradient-to-r from-blue-900 to-blue-600 shadow-lg scroll-smooth">
    <div class="mx-4 sm:mx-6 md:mx-20 px-4">
      <div class="flex justify-between items-center h-18">
        <div class="flex-shrink-0 flex items-center pr-4 border-r border-white h-12">
          <img 
            src="../assets/images/LVB-logo.png" 
            alt="LAOVIET Bank Logo"
            class="h-13 w-auto"
          >
        </div>

        <div class="hidden md:flex flex-col items-center justify-center flex-1">
          <span class="text-white text-md tracking-wider shadow-2xl">
            {{ $t('navbar.bank_name') }}
          </span>
          <span class="text-white text-md tracking-wider shadow-2xl">
            {{ $t('navbar.tagline') }}
          </span>
        </div>

        <div class="flex items-center space-x-4">
          <div class="hidden sm:flex items-center space-x-4">
            
            <!-- Language Selector -->
            <div class="relative" ref="languageRef">
              <button 
                @click="toggleLanguage"
                class="relative bg-blue-500/20 backdrop-blur-sm p-2.5 rounded-xl hover:bg-white/20 transition-all duration-200 flex items-center space-x-2 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span class="text-white text-xs font-medium hidden sm:block">
                  {{ currentLanguage }}
                </span>
              </button>

              <!-- Language Dropdown -->
              <Transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="isLanguageOpen"
                  class="absolute right-0 mt-3 w-48 origin-top-right bg-white rounded-xl shadow-2xl ring-1 ring-black/5 z-50 overflow-hidden"
                >
                  <button 
                    @click="setLanguage('en')" 
                    class="w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-3 transition-colors"
                    :class="{ 'bg-blue-50': locale === 'en' }"
                  >
                    <img src="../assets/images/united-kingdom.png" class="w-6 h-6 rounded-full" alt="English">
                    <span class="font-medium">English</span>
                    <CheckBadgeIcon v-if="locale === 'en'" class="w-4 h-4 text-blue-600 ml-auto" />
                  </button>
                  <button 
                    @click="setLanguage('vn')" 
                    class="w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-3 transition-colors border-t border-gray-100"
                    :class="{ 'bg-blue-50': locale === 'vn' }"
                  >
                    <img src="../assets/images/vietnam.png" class="w-6 h-6 rounded-full" alt="Tiếng Việt">
                    <span class="font-medium">Tiếng Việt</span>
                    <CheckBadgeIcon v-if="locale === 'vn'" class="w-4 h-4 text-blue-600 ml-auto" />
                  </button>
                  <button 
                    @click="setLanguage('la')" 
                    class="w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 flex items-center space-x-3 transition-colors border-t border-gray-100"
                    :class="{ 'bg-blue-50': locale === 'la' }"
                  >
                    <img src="../assets/images/laos.png" class="w-6 h-4 rounded" alt="ພາສາລາວ">
                    <span class="font-medium">ພາສາລາວ</span>
                    <CheckBadgeIcon v-if="locale === 'la'" class="w-4 h-4 text-blue-600 ml-auto" />
                  </button>
                </div>
              </Transition>
            </div>
            
            <button 
              class="w-10 h-10 text-white bg-blue-600 hover:bg-blue-800 
                     transition-colors rounded-full shadow-md relative cursor-pointer"
              @click="toggleNotifications"
              aria-label="Notifications"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span 
                v-if="hasNotifications" 
                class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"
              ></span>
            </button>

            <div class="relative" ref="desktopUserRef">
              <button 
                class="flex items-center justify-center w-10 h-10 
                       text-white bg-blue-600 hover:bg-blue-800 
                       transition-colors rounded-full shadow-md cursor-pointer"
                @click="toggleDesktopUser"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="isDesktopUserOpen && route.name !== 'public' && route.name !== 'publicDetail'"
                  class="absolute right-0 mt-3 w-40 py-2 px-2 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black/5 z-50"
                >
                  <router-link @click="isDesktopUserOpen = false" to="/login" class="flex justify-evenly item-center px-5 py-2 text-sm border border-gray-200 rounded-lg mb-2 text-gray-700 hover:bg-blue-200 hover:rounded-lg">
                    <ArrowRightEndOnRectangleIcon class="w-5 h-5"/>
                    {{ $t('navbar.login') }}
                  </router-link>
                  <router-link @click="isDesktopUserOpen = false" to="" class="flex justify-evenly item-center px-5 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-blue-200 hover:rounded-lg">
                    {{ $t('navbar.register') }}
                    <ArrowRightEndOnRectangleIcon class="w-5 h-5"/>
                  </router-link>
                </div>
              </Transition>
            </div>
          </div>

          <div class="sm:hidden flex items-center space-x-2">
            <!-- Mobile Language Button -->
            <div class="relative" ref="mobileLangRef">
              <button 
                class="text-white ps-2.5 rounded-full hover:bg-blue-600 relative w-10 h-10 bg-blue-600 mx-1 shadow-md"
                @click.stop="toggleMobileLang"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </button>
              
              <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div 
                  v-if="isMobileLangOpen" 
                  class="absolute right-0 top-12 w-35 bg-white rounded-md shadow-lg z-50 border border-gray-200"
                  @click.stop
                >
                  <button @click="handleLanguageSelect('en')" class="flex w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 border-b border-gray-100">
                    <img src="../assets/images/united-kingdom.png" class="w-7 h-7 me-2" alt=""> English
                  </button>
                  <button @click="handleLanguageSelect('vn')" class="flex w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 border-b border-gray-100">
                    <img src="../assets/images/vietnam.png" class="w-7 h-7 me-2" alt="">ViệtNam
                  </button>
                  <button @click="handleLanguageSelect('la')" class="flex w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">
                    <img src="../assets/images/laos.png" class="w-7 h-5 me-2" alt="">ພາສາລາວ
                  </button>
                </div>
              </Transition>
            </div>

            <!-- Mobile Notification Button -->
            <button 
              class="w-10 h-10 text-white bg-blue-600 hover:bg-blue-800 
                      transition-colors rounded-full shadow-md relative cursor-pointer"
              @click="toggleNotifications"
              aria-label="Notifications"
            >
              <HeartIcon class="h-6 w-6 mx-auto"/>
              <span 
                v-if="hasNotifications" 
                class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"
              ></span>
            </button>

            <!-- Mobile User Button -->
            <div class="relative" ref="mobileUserRef">
              <button 
                class="w-10 h-10 ps-2.5 text-white bg-blue-600 hover:bg-blue-800 
                       transition-colors rounded-full shadow-md cursor-pointer"
                @click="toggleMobileUser"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              
              <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div 
                  v-if="isMobileUserOpen && route.name !== 'public' && route.name !== 'publicDetail'"
                  class="absolute right-0 top-12 w-32 bg-white rounded-md shadow-lg z-50 border border-gray-200"
                  @click.stop
                >
                  <router-link @click="isMobileUserOpen=false" to="/login" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 border-b border-gray-100">Login</router-link>
                  <router-link @click="isMobileUserOpen=false" to="/register" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100">Register</router-link>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import {
  ArrowRightEndOnRectangleIcon, 
  HeartIcon,
  CheckBadgeIcon
} from "@heroicons/vue/24/outline";
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const route = useRoute()
const { locale } = useI18n()

const isOpen = ref(false) 
const isLanguageOpen = ref(false)
const isMobileLangOpen = ref(false) 
const isMobileUserOpen = ref(false) 
const isDesktopUserOpen = ref(false)
const hasNotifications = ref(true)

// Refs สำหรับ dropdown containers
const languageRef = ref(null)
const desktopUserRef = ref(null)
const mobileLangRef = ref(null)
const mobileUserRef = ref(null)

const currentLanguage = computed(() => {
  switch (locale.value) {
    case 'en': return 'English'
    case 'vn': return 'Tiếng Việt'
    case 'la': return 'ພາສາລາວ'
    default: return 'English'
  }
})

const setLanguage = (lang) => {
  console.log('Language changed to:', lang)
  locale.value = lang
  localStorage.setItem('user-locale', lang)
  // ปิด dropdown ทั้งหมดหลังจากเลือกภาษา
  closeAllDropdowns()
}

const handleLanguageSelect = (lang) => {
  setLanguage(lang)
  isMobileLangOpen.value = false
}

const toggleNotifications = () => {
  console.log('Notifications toggled')
  // ปิด dropdown อื่นๆ เมื่อกด notification
  closeAllDropdowns()
}

const toggleLanguage = () => {
  isLanguageOpen.value = !isLanguageOpen.value
  // ปิด dropdown อื่นๆ
  if (isLanguageOpen.value) {
    isDesktopUserOpen.value = false
  }
}

const toggleDesktopUser = () => {
  isDesktopUserOpen.value = !isDesktopUserOpen.value
  // ปิด dropdown อื่นๆ
  if (isDesktopUserOpen.value) {
    isLanguageOpen.value = false
  }
}

const toggleMobileLang = () => {
  isMobileLangOpen.value = !isMobileLangOpen.value
  // ปิด dropdown อื่นๆ
  if (isMobileLangOpen.value) {
    isMobileUserOpen.value = false
  }
}

const toggleMobileUser = () => {
  isMobileUserOpen.value = !isMobileUserOpen.value
  // ปิด dropdown อื่นๆ
  if (isMobileUserOpen.value) {
    isMobileLangOpen.value = false
  }
}

const closeAllDropdowns = () => {
  isLanguageOpen.value = false
  isMobileLangOpen.value = false
  isMobileUserOpen.value = false
  isDesktopUserOpen.value = false
}

const handleClickOutside = (event) => {
  // ตรวจสอบการคลิกภายนอกสำหรับ desktop language dropdown
  if (isLanguageOpen.value && languageRef.value && !languageRef.value.contains(event.target)) {
    isLanguageOpen.value = false
  }

  // ตรวจสอบการคลิกภายนอกสำหรับ desktop user dropdown
  if (isDesktopUserOpen.value && desktopUserRef.value && !desktopUserRef.value.contains(event.target)) {
    isDesktopUserOpen.value = false
  }

  // ตรวจสอบการคลิกภายนอกสำหรับ mobile language dropdown
  if (isMobileLangOpen.value && mobileLangRef.value && !mobileLangRef.value.contains(event.target)) {
    isMobileLangOpen.value = false
  }

  // ตรวจสอบการคลิกภายนอกสำหรับ mobile user dropdown
  if (isMobileUserOpen.value && mobileUserRef.value && !mobileUserRef.value.contains(event.target)) {
    isMobileUserOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>