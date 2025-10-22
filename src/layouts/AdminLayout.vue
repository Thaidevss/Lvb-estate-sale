<template>
  <div class="admin-layout min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Main Content -->
    <div class="main-content mb-10">
      <!-- Enhanced Header -->
      <header class="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg">
        <div class="px-6 py-4">
          <div class="flex items-center justify-between">
            <!-- Left Section - Logo & Title -->
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-3">
                <div class="bg-white/10 backdrop-blur-sm p-2 rounded-xl">
                  <Square3Stack3DIcon class="w-8 h-8 text-white"/>
                </div>
                <div>
                  <h2 class="text-base font-bold text-white">
                    {{ $t('admin.admin_page_title') }}
                  </h2>
                  <p class="text-xs text-blue-200">
                    {{ $t('admin.department_contact') }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Right Section - Language, Notifications & Profile -->
            <div class="flex items-center space-x-3">
              <!-- Language Selector -->
              <div class="relative" ref="languageRef">
                <button 
                  @click="toggleLanguage"
                  class="relative bg-white/10 backdrop-blur-sm p-2.5 rounded-xl hover:bg-white/20 transition-all duration-200 flex items-center space-x-2"
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

              <!-- Notification Button -->
              <div class="relative">
                <button class="relative bg-white/10 backdrop-blur-sm p-2.5 rounded-xl hover:bg-white/20 transition-all duration-200">
                  <BellIcon class="w-5 h-5 text-white"/>
                  <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>
              </div>

              <!-- Profile Dropdown -->
              <div class="relative" ref="profileRef">
                <button 
                  @click="toggleProfileDropdown"
                  class="flex items-center space-x-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl px-3 py-2 transition-all duration-200"
                  type="button"
                >
                  <img 
                    src="../assets/images/man.jpg" 
                    alt="Profile" 
                    class="w-10 h-10 rounded-full border-2 border-white/50 object-cover"
                  >
                  <div class="hidden md:block text-left">
                    <p class="text-sm font-semibold text-white">{{ userName }}</p>
                    <p class="text-xs text-blue-200">{{ userRoleCode }}</p>
                  </div>
                  <svg 
                    class="w-4 h-4 text-white transition-transform duration-200"
                    :class="{ 'rotate-180': isProfileDropdownOpen }"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
      
                <!-- Enhanced Dropdown Menu -->
                <Transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-150"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <div 
                    v-show="isProfileDropdownOpen"
                    class="absolute right-0 z-50 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                  >
                    <!-- Profile Header -->
                    <div class="relative bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-5">
                      <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                      <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                      
                      <div class="relative flex items-center space-x-4">
                        <div class="relative">
                          <img 
                            src="../assets/images/man.jpg" 
                            alt="Profile" 
                            class="w-16 h-16 rounded-full border-4 border-white/30 shadow-lg object-cover"
                          >
                          <div class="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                        </div>
                        <div class="flex-1 min-w-0">
                          <h3 class="text-base font-bold text-white truncate">{{ userName }}</h3>
                          <p class="text-sm text-blue-100 truncate">{{ userEmail }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Profile Details -->
                    <div class="px-6 py-5 space-y-3">
                      <div class="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div class="flex-shrink-0 mt-0.5">
                          <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <BriefcaseIcon class="w-4 h-4 text-blue-600" />
                          </div>
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-xs font-medium text-gray-500 mb-0.5">Department</p>
                          <p class="text-sm font-semibold text-gray-900 truncate">{{ userDep }}</p>
                        </div>
                      </div>

                      <div class="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div class="flex-shrink-0 mt-0.5">
                          <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <BuildingOffice2Icon class="w-4 h-4 text-purple-600" />
                          </div>
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-xs font-medium text-gray-500 mb-0.5">Branch</p>
                          <p class="text-sm font-semibold text-gray-900 truncate">{{ userBranch }}</p>
                          <p class="text-xs text-gray-500 mt-0.5">Code: {{ userCode }}</p>
                        </div>
                      </div>

                      <div class="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div class="flex-shrink-0 mt-0.5">
                          <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckBadgeIcon class="w-4 h-4 text-green-600" />
                          </div>
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-xs font-medium text-gray-500 mb-0.5">Role</p>
                          <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-green-100 text-green-800">
                            {{ userRoleCode }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Logout Button -->
                    <div class="px-6 pb-5">
                      <button 
                        @click="logout()"
                        class="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        <span>{{ $t('auth.logout') }}</span>
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>

        <!-- Breadcrumb / Quick Stats Bar -->
        <div class="border-t border-white/10">
          <div class="px-6 py-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2 text-sm">
                <HomeIcon class="w-4 h-4 text-blue-200" />
                <span class="text-blue-200">/</span>
                <span class="text-white font-medium">Dashboard</span>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2 text-xs">
                  <div>
                    <button @click="openGuidelineVN" class="text-white border px-6 py-1 rounded-md cursor-pointer hover:bg-gray-200 hover:text-blue-800">Guideline VN</button>
                  </div>
                  <div>
                    <button @click="openGuidelineLA" class="text-white border px-6 py-1 rounded-md cursor-pointer hover:bg-gray-200 hover:text-blue-800">Guideline LA</button>
                  </div>
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span class="text-blue-200">System Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Router View -->
      <div class="mx-4 mt-6">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { computed, onMounted, ref, onBeforeUnmount, getCurrentInstance} from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authAdminLogin'
import { setToken, setUser, getToken, getUser } from '../services/tokenService';
import Footer from '../components/Footer.vue'
import {
  NewspaperIcon,
  BellIcon,
  HomeIcon,
  BuildingOffice2Icon,
  BriefcaseIcon,
  Square3Stack3DIcon,
  CheckBadgeIcon
} from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

const router = useRouter()
const authStore = useAuthStore()
const isProfileDropdownOpen = ref(false)
const isLanguageOpen = ref(false)

const { $modal, $loading } = getCurrentInstance().appContext.config.globalProperties
const modal = getCurrentInstance().appContext.config.globalProperties.$modal;

const userData = ref({
  name: '',
  email: '',
  dep: '',
  branch: '',
  code: '',
  role_code: ''
})

// Refs สำหรับ dropdown elements
const profileRef = ref(null)
const languageRef = ref(null)

onMounted(() => {
  if (!authStore.checkAuth()) {
    router.push('/login')
  }
  
  const storedUser = getUser();
  if (storedUser) {
    userData.value.name = storedUser.EMPNAME || 'Admin';
    userData.value.email = storedUser.EMAIL || 'Admin@gmail.com';
    userData.value.dep = storedUser.DEP || 'Null';
    userData.value.branch = storedUser.CUSTOM_BRN_NAME || 'Null';
    userData.value.code = storedUser.BRANCH_LIST || 'Null';
    userData.value.role_code = storedUser.ROLE_CODE || 'Null';
  }
})

const openGuidelineVN = () => {
  window.open('/Guideline.pdf', '_blank');
}
const openGuidelineLA = () => {
  window.open('/GuidelineLA.pdf', '_blank');
}

const toggleProfileDropdown = () => {
  isProfileDropdownOpen.value = !isProfileDropdownOpen.value
  // ปิด language dropdown เมื่อเปิด profile dropdown
  if (isProfileDropdownOpen.value) {
    isLanguageOpen.value = false
  }
}

const toggleLanguage = () => {
  isLanguageOpen.value = !isLanguageOpen.value
  // ปิด profile dropdown เมื่อเปิด language dropdown
  if (isLanguageOpen.value) {
    isProfileDropdownOpen.value = false
  }
}

const setLanguage = (lang) => {
  locale.value = lang
  isLanguageOpen.value = false
}

const currentLanguage = computed(() => {
  switch (locale.value) {
    case 'en': return 'English'
    case 'vn': return 'Tiếng Việt'
    case 'la': return 'ພາສາລາວ'
    default: return 'English'
  }
})

const logout = async () => {
  try {
    const result = await modal.open({
      title: t('auth.logout'),
      message: t('auth.logout_confirm_message'), 
      type: 'warning',
      showCancel: true,
      confirmButtonText: t('auth.logout_confirm_title'),
      cancelButtonText: t('auth.logout_cancel')
    })

    if (result === 'confirm') {
      authStore.logout()
      await router.push('/')
    }
  } catch (error) {
    console.error('❌ Error during logout:', error)
    await modal.open({
      title: t('auth.error'),
      message: t('auth.logout_failed'),
      type: 'error',
      confirmButtonText: t('auth.ok')
    })
  }
}

const userName = computed(() => userData.value.name)
const userEmail = computed(() => userData.value.email)
const userDep = computed(() => userData.value.dep)
const userBranch = computed(() => userData.value.branch)
const userCode = computed(() => userData.value.code)
const userRoleCode = computed(() => userData.value.role_code)

const handleClickOutside = (event) => {
  // ตรวจสอบว่าการคลิกอยู่นอกพื้นที่ dropdown หรือไม่
  if (profileRef.value && !profileRef.value.contains(event.target)) {
    isProfileDropdownOpen.value = false
  }
  if (languageRef.value && !languageRef.value.contains(event.target)) {
    isLanguageOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.main-content {
  transition: all 0.3s ease;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>