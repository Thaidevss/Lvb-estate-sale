<template>
  <div class="admin-layout min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="sidebar bg-blue-900 text-white w-54 fixed h-full">
      <div class="p-4 border-b border-blue-800">
        <img src="../assets/images/LVB-logo.png" class="h-16 mx-auto" alt="">
        <p class="text-sm text-center text-white font-bold">ຈັດການລະບົບ</p>
      </div>
      <nav class="mt-4 text-sm">
        <router-link 
          to="/admin" 
          class="flex items-center p-3 hover:bg-blue-800 transition"
          active-class="bg-blue-800"
        >
          <NewspaperIcon class="w-5 h-5 mr-2" />
          ຈັດການຂໍ້​ມູນຊັບສິນ
        </router-link>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="main-content ml-54 mb-10">
      <!-- Header -->
      <header class="bg-blue-900 shadow py-3 px-6 mb-6 flex justify-between items-center">
        <h2 class="text-sm font-semibold flex items-center text-white"><HomeIcon class="w-8 h-8 me-2 text-white"/>ຊັບສິນຕ້ອງການປະມູນຂາຍ</h2>

        <div class="text-center text-white font-bold text-sm">
          <p>ພະແນກແກ້ໄຂໜີ້ ແລະ ຄຸ້ມຄອງຫຼັກຊັບຄໍ້າປະກັນ</p>
          <p>021 251418-666</p>
        </div>
        <div class="flex items-center space-x-4">
          <button class="p-2 rounded-full text-whiet hover:bg-gray-100">
            <BellIcon class="w-5 h-5 text-white"/>
          </button>
          
          <!-- Profile Dropdown -->
          <div class="flex items-center">
            <div class="relative">
              <button 
                @click="toggleProfileDropdown"
                class="flex text-sm rounded-full "
                type="button"
              >
                <span class="sr-only">Open user menu</span>
                <img 
                  src="../assets/images/man.jpg" 
                  alt="Profile" 
                  class="rounded-full h-12 w-12 mr-2 border-2 border-blue-900"
                >
              </button>      
              <!-- Dropdown menu -->
              <div 
                v-show="isProfileDropdownOpen"
                class="absolute right-0 z-50 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden"
              >
                <!-- Card Header -->
                <div class="px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <div class="flex items-center space-x-3">
                    <img 
                      src="../assets/images/man.jpg" 
                      alt="Profile" 
                      class="rounded-full h-14 w-14 border-2 border-blue-900"
                    >
                    <div>
                      <p class="text-sm font-bold text-blue-900">{{ userName }}</p>
                      <p class="text-xs text-blue-500 truncate">{{ userEmail }}</p>
                    </div>
                  </div>
                </div>

                <!-- Card Body -->
                <div class="py-6 px-4"> 
                  <div class="mb-2"> 
                    <p class="text-xs text-blue-900 flex items-center leading-tight"> <BriefcaseIcon class="h-5 w-5 me-2 text-blue-900 flex-shrink-0" /> {{ userDep }}</p>
                  </div>
                  <div> 
                    <p class="text-xs text-blue-900 flex items-center leading-tight"> <BuildingOffice2Icon class="h-5 w-5 me-2 text-blue-900 flex-shrink-0" /> {{ userBranch }} - {{ userCode }}</p>
                  </div>
                </div>
                <!-- Card Footer -->
                <div class="py-1 border-t border-gray-200 bg-blue-800 px-30">
                  <button 
                    @click="logout()"
                    class="flex justify-center items-center w-full py-2 text-sm mx-auto text-center rounded text-blue-900 bg-white border hover:bg-red-50 transition-colors"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    ອອກຈາກລະບົບ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <!-- Router View -->
      <div class="mx-4">
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
  ChartBarIcon,
  NewspaperIcon,
  UsersIcon,
  CogIcon,
  BellIcon,
  HomeIcon,
  BuildingOffice2Icon,
  BriefcaseIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const isProfileDropdownOpen = ref(false)

// for alert modal
const { $modal, $loading } = getCurrentInstance().appContext.config.globalProperties
const modal = getCurrentInstance().appContext.config.globalProperties.$modal;

// User data
const userData = ref({
  name: '',
  email: '',
  dep: '',
  branch: '',
  code: '',
})

onMounted(() => {
  if (!authStore.checkAuth()) {
    router.push('/login')
  }
  
  // Load user data
  const storedUser = getUser();
  if (storedUser) {
    userData.value.name = storedUser.EMPNAME || 'Admin';
    userData.value.email = storedUser.EMAIL || 'Admin@gmail.com';
    userData.value.dep = storedUser.DEP || 'Null';
    userData.value.branch = storedUser.CUSTOM_BRN_NAME || 'Null';
    userData.value.code = storedUser.BRANCH_LIST || 'Null';
  }
})

const toggleProfileDropdown = () => {
  isProfileDropdownOpen.value = !isProfileDropdownOpen.value
}

const logout = async () => {
  try {
    const result = await modal.open({
      title: 'ອອກຈາກລະບົບ',
      message: 'ທ່ານຕ້ອງການທີ່ຈະອອກຈາກລະບົບແທ້ບໍ?',
      type: 'warning',
      showCancel: true,
      confirmButtonText: 'ອອກຈາກລະບົບ',
      cancelButtonText: 'ຍົກເລີກ'
    })

    if (result === 'confirm') {
      authStore.logout()
      await router.push('/')
      // await modal.open({
      //   title: 'ສຳເລັດ',
      //   message: 'ອອກຈາກລະບົບສຳເລັດແລ້ວ',
      //   type: 'success',
      //   confirmButtonText: 'OK'
      // })
    }

  } catch (error) {
    console.error('❌ Error during logout:', error)
    await modal.open({
      title: 'ຜິດພາດ',
      message: 'ບໍ່ສາມາດອອກຈາກລະບົບໄດ້',
      type: 'error',
      confirmButtonText: 'OK'
    })
  }
}


const userName = computed(() => userData.value.name)
const userEmail = computed(() => userData.value.email)
const userDep = computed(() => userData.value.dep)
const userBranch = computed(() => userData.value.branch)
const userCode = computed(() => userData.value.code)

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const dropdown = document.querySelector('.relative')
  if (dropdown && !dropdown.contains(event.target)) {
    isProfileDropdownOpen.value = false
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
.sidebar {
  transition: all 0.3s;
}
.main-content {
  transition: margin-left 0.3s;
}
</style>