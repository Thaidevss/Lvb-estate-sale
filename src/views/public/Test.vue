<template>
  <!-- หน้า Home - แสดง icon ประเภทต่างๆ -->
  <div v-if="currentPage === 'home'" class="min-h-screen bg-gray-50 p-4 relative z-10 ">
    <!-- Header -->
    <div class="container mx-auto w-full p-2 mb-8">
      <div class="flex justify-between items-center w-full">
        <h2 class="text-base flex items-center font-bold text-blue-900 whitespace-nowrap">
          <Square3Stack3DIcon class="h-8 w-8 me-1 text-blue-900 font-bold" />
          ຊັບສິນຕ້ອງການປະມູນຂາຍ
        </h2>
        <button class="text-sm py-1 px-2 border rounded text-blue-900 border-blue-900 hover:bg-gray-100 flex items-center shadow whitespace-nowrap">
          <router-link to="/login" class="flex items-center">
            <UserCircleIcon class="w-5 h-5 me-1" />
            ເຂົ້າສູ່ລະບົບ
          </router-link>
        </button>
      </div>
    </div>

    <!-- เนื้อหาหลัก - แสดง icon ประเภทต่างๆ -->
    <div class="container mx-auto">
      <h2 class="text-md font-bold text-blue-900 text-center mb-8">
        ເລືອກປະເພດຊັບສິນ
      </h2>
      
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mx-auto">
        <div 
          v-for="type in locationStore.types" 
          :key="type.id"
          @click="selectType(type)"
          class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition duration-300 hover:bg-blue-50"
        >
          <div class="w-16 h-16 mb-3 flex items-center justify-center bg-blue-100 rounded-full">
            <!-- ใช้ไอคอนแทนที่ตามประเภท (สามารถปรับเปลี่ยนได้) -->
            <!-- <Square3Stack3DIcon class="h-8 w-8 text-blue-900" /> -->
            <img 
              :src="getTypeIcon(type.TYPE)" 
              :alt="type.TYPE"
              class="h-8 w-8 object-contain"
            />
          </div>
          <span class="text-sm font-medium text-blue-900 text-center">{{ type.TYPE }}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- หน้ารายการทรัพย์สิน -->
  <div v-else class="relative z-10 min-h-screen bg-gray-50 p-4">
    <!-- ปุ่มกลับ -->
    <!-- <div class="container mx-auto mb-4">
      <button 
        @click="goBackToHome"
        class="flex items-center text-blue-900 hover:text-blue-700 text-sm font-medium"
      >
        <ArrowLeftIcon class="h-5 w-5 mr-1" />
        ກັບໄປຫນ້າຫລັກ
      </button>
    </div> -->

    <!-- Mobile Version -->
    <div class="block sm:hidden container mx-auto w-full p-2 mb-4">
      <div class="flex justify-center items-center w-full">
        <!-- <h2 class="text-sm flex items-center font-bold text-blue-900 whitespace-nowrap">
          <Square3Stack3DIcon class="h-6 w-6 me-1 text-blue-900 font-bold" />
          ຊັບສິນຕ້ອງການປະມູນຂາຍ
        </h2> -->
         <!-- <button class="text-sm py-1 px-2 border rounded text-blue-900 border-blue-900 hover:bg-gray-100 flex items-center shadow whitespace-nowrap">
          <router-link to="/login" class="flex items-center">
            <UserCircleIcon class="w-5 h-5 me-1" />
            ເຂົ້າສູ່ລະບົບ
          </router-link>
        </button> -->
      </div>
      <div>
        <div class="flex-1 max-w-md mx-5 mt-2">
          <div class="relative">
            <MagnifyingGlassIcon class="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              v-model="searchQuery"
              @input="debouncedSearch"
              placeholder="ຄົ້ນຫາ..."
              class="text-sm w-full pl-10 p-1.5 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop Version -->
    <div class="hidden sm:flex container mx-auto flex-col sm:flex-row justify-between items-center w-full gap-2 p-2 mb-4">
      <div class="w-full sm:w-auto">
        <!-- <h2 class="text-base flex items-center sm:text-md md:text-sm lg:text-md font-bold text-blue-900">
          <Square3Stack3DIcon class="h-8 w-8 me-1 text-blue-900 font-bold" />
          ຊັບສິນຕ້ອງການປະມູນຂາຍ
        </h2> -->
        <button 
          @click="goBackToHome"
          class="flex items-center text-blue-900 hover:text-blue-700 text-sm font-medium"
        >
          <ArrowLeftIcon class="h-4 w-4 mr-1" />
          ກັບໄປຫນ້າຫລັກ
      </button>
      </div>
      <div class="flex-1 max-w-md mx-4">
        <div class="relative">
          <MagnifyingGlassIcon class="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            v-model="searchQuery"
            @input="debouncedSearch"
            placeholder="ຄົ້ນຫາ..."
            class="text-sm w-full pl-10 p-1.5 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div class="sm:w-auto flex">
        <!-- <button class="text-sm py-1 px-2 border rounded text-blue-900 border-blue-900 hover:bg-gray-100 flex items-center shadow">
          <router-link to="/login" class="flex items-center">
            <UserCircleIcon class="w-5 h-5 me-1" />
            ເຂົ້າສູ່ລະບົບ
          </router-link>
        </button> -->
        <BoltIcon class="h-5 w-5 text-gray-600" />
        <AdjustmentsHorizontalIcon class="h-5 w-5 text-gray-600 mx-2" />
        <Squares2X2Icon class="h-5 w-5 text-gray-600" />
      </div>
    </div>

    <div class="container mx-auto flex flex-col lg:flex-row gap-4">
      <!-- Sidebar -->
      <aside class="hidden lg:block h-auto md:h-[80vh] lg:w-1/6 bg-white rounded-md shadow-md p-4">
        <h2 class="text-sm font-bold text-blue-900 mb-4 text-center">
          ຄົ້ນຫາ ຊັບ-ສິນ ພ້ອມຂາຍ
        </h2>
        <div class="space-y-3 text-sm">
          <select
            v-model="filters.province"
            class="w-full border text-gray-600 border-gray-300 shadow rounded text-sm px-2 py-1.5"
          >
            <option value="">ແຂວງ</option>
            <option
              v-for="province in locationStore.provinces"
              :key="province.id"
              :value="province"
            >
              {{ province.name }}
            </option>
          </select>
          <select
            v-model="filters.district"
            class="w-full border text-gray-600 border-gray-300 shadow rounded text-sm px-2 py-1.5"
            :disabled="!filters.province"
          >
            <option value="">ເມືອງ</option>
            <option
              v-for="(district, index) in locationStore.districts"
              :key="index"
              :value="district"
            >
              {{ district }}
            </option>
          </select>
          <select
            v-model="filters.village"
            class="w-full border text-gray-600 border-gray-300 shadow rounded text-sm px-2 py-1.5"
            :disabled="!filters.district"
          >
            <option value="">ບ້ານ</option>
            <option
              v-for="(village, index) in locationStore.villages"
              :key="index"
              :value="village"
            >
              {{ village }}
            </option>
          </select>
          <select
            class="w-full border text-gray-600 border-gray-300 shadow rounded text-sm px-2 py-1.5"
          >
            <option value="">ເນື້ອທີ່ຂອງຊັບສິນ (ຕາແມັດ)</option>
          </select>
          <select
            class="w-full border text-gray-600 border-gray-300 shadow rounded text-sm px-2 py-1.5"
          >
            <option value="">ລາຄາຂອງຊັບສິນ ($)</option>
          </select>
          <button
            @click="applyFilters"
            class="w-full bg-blue-900 text-white py-2 rounded shadow hover:bg-blue-800 transition"
          >
            ຄົ້ນຫາ
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <section :class="{'w-full': isMobile, 'flex-1': !isMobile}" class="flex flex-col min-h-0">
        <!-- แสดงประเภทที่เลือก -->
        <div v-if="selectedType" class="bg-blue-50 p-3 rounded-md mb-4 flex items-center">
          <span class="text-blue-900 text-sm font-medium">ປະເພດຊັບສິນທີ່ເລືອກ: </span>
          <span class="ml-2 text-blue-900 text-sm font-bold">{{ selectedType.TYPE }}</span>
          <button @click="clearTypeFilter" class="ml-4 text-red-600 text-sm flex items-center">
            <XMarkIcon class="h-4 w-4 mr-1" />
            ລ້າງຄ່າ
          </button>
        </div>

        <!-- Loading state -->
        <div v-if="loading">
          <LoadingSpinner />
        </div>

        <!-- Empty state -->
        <div
          v-if="!loading && filteredListings.length === 0"
          class="text-center pt-40"
        >
          <img
            class="mx-auto h-20 w-20"
            src="../../assets/images/box.png"
            alt=""
          />
          <p>Data is Empty.</p>
        </div>

        <!-- Grid -->
        <div v-else class="flex-grow overflow-auto">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-2 pb-10"
          >
            <div
              v-for="item in paginatedListings"
              :key="item.id"
              class="bg-white rounded-md shadow-xl overflow-hidden hover:shadow-lg transition duration-300 flex flex-col h-full relative"
            >
              <div
                class="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full px-2 py-1 flex items-center shadow-sm"
              >
                <EyeIcon class="h-3 w-3 text-gray-500 mr-1" />
                <span class="text-xs text-gray-600">
                  {{ item.VIEW_COUNT || 0 }} view
                </span>
              </div>
              <img
                v-if="item.IMAGES && item.IMAGES.PROFILE_IMAGE"
                :src="
                  item?.IMAGES?.PROFILE_IMAGE
                    ? getProfileImageUrl(item.IMAGES)
                    : defaultImage
                "
                @error="handleImageError"
                alt="Property preview"
                class="w-full h-40 object-cover p-1 rounded-lg cursor-pointer hover:opacity-90 transition"
              />

              <div class="px-2.5 pb-3 pt-2 flex flex-col flex-grow">
                <div class="flex-grow">
                  <p class="font-bold text-sm text-blue-900">
                    {{ item.TYPE }}
                  </p>
                  <p class="text-xs mt-1 flex items-center">
                    <Square3Stack3DIcon class="h-5 w-5 text-blue-500 me-1" />
                    ເນື້ອທີ່ {{ item.AREA }} m²
                  </p>
                  <p class="text-xs text-gray-500 mt-1 flex items-center">
                    <MapPinIcon class="h-5 w-5 text-red-500" />
                    {{ item.VILLAGE }}, {{ item.DISTRICT }}, {{ item.PROVINCE }}
                  </p>
                </div>
                <div class="flex items-center justify-between mt-3">
                  <button
                    @click="viewDetails(item.id)"
                    class="text-xs text-blue-900 border border-blue-900/60 shadow rounded p-1 hover:text-blue-900 hover:bg-blue-50 transition"
                  >
                    ລາຍລະອຽດ ▶
                  </button>
                  <span class="text-blue-900 font-bold text-sm font-english">
                    {{ formatPrice(item.PRICE) }} {{ item.CURRENCY }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="filteredListings.length > 0"
          class="mt-8 flex justify-center items-center space-x-2 text-sm"
        >
          <button
            @click="currentPage = 1"
            :disabled="currentPage === 1"
            class="px-2 py-1 border rounded hover:bg-gray-100 transition disabled:opacity-50"
          >
            &laquo;
          </button>
          <button
            @click="currentPage = currentPage - 1"
            :disabled="currentPage === 1"
            class="px-2 py-1 border rounded hover:bg-gray-100 transition disabled:opacity-50"
          >
            &lsaquo;
          </button>

          <template v-for="page in visiblePages" :key="page">
            <button
              @click="currentPage = page"
              :class="{
                'bg-blue-900 text-white': currentPage === page,
                border: currentPage !== page,
              }"
              class="px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              {{ page }}
            </button>
          </template>

          <button
            @click="currentPage = currentPage + 1"
            :disabled="currentPage === totalPages"
            class="px-2 py-1 border rounded hover:bg-gray-100 transition disabled:opacity-50"
          >
            &rsaquo;
          </button>
          <button
            @click="currentPage = totalPages"
            :disabled="currentPage === totalPages"
            class="px-2 py-1 border rounded hover:bg-gray-100 transition disabled:opacity-50"
          >
            &raquo;
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { debounce } from "lodash";
import { useRouter } from "vue-router";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  Square3Stack3DIcon,
  UserCircleIcon,
  EyeIcon,
  ArrowLeftIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  Squares2X2Icon,
  Bars3BottomLeftIcon,
  BoltIcon
} from "@heroicons/vue/24/outline";
import { usePostStore } from "../../stores/indexStore";
import {
  getImageUrl,
  getProfileImageUrl,
  getDefaultImage,
} from "../../utils/getImage";
import { useLocationStore } from "../../stores/locationStore";
import LoadingSpinner from "../../components/common/Loading.vue";

import landIcon from '../../assets/images/Layer_1.png';
import houseIcon from '../../assets/images/Layer_3.png';
import farmIcon from '../../assets/images/Layer_2.png';
import CarIcon from '../../assets/images/Layer_4.png';
import MachineIcon from '../../assets/images/Layer_5.png';
import BuildingIcon from '../../assets/images/Layer_6.png';

const router = useRouter();
const locationStore = useLocationStore();
const postStore = usePostStore();

const typeIcons = {
  'ດິນປຸກສ້າງເປົ່າຫວ່າງ': landIcon,
  'ດິນກະສິກໍາ': farmIcon,
  'ດິນ ແລະ ສິ່ງປຸກສ້າງທີ່ຢູ່ອາໄສ': houseIcon,
  'ລົດ' : CarIcon,
  'ເຄື່ອງຈັກ ແລະ ກົນຈັກໜັກ': MachineIcon,
  'ດິນ ແລະ ໂຮງແຮມ, ບ້ານພັກ, ໂຮງງານ' : BuildingIcon
};

const getTypeIcon = (typeName) => {
  return typeIcons[typeName];
};


const currentPage = ref('home');
const selectedType = ref(null);

const selectType = (type) => {
  selectedType.value = type;
  filters.value.type = type;
  currentPage.value = 'listings';
  applyFilters();
};

const goBackToHome = () => {
  currentPage.value = 'home';
  selectedType.value = null;
  filters.value.type = "";
};

const clearTypeFilter = () => {
  selectedType.value = null;
  filters.value.type = "";
  applyFilters();
};

// ส่วนที่เหลือเหมือนเดิม
const currentPageNum = ref(1);
const itemsPerPage = 12;

const defaultImage = ref(getDefaultImage());

const handleImageError = (e) => {
  e.target.src = defaultImage.value;
};

onMounted(async () => {
  await locationStore.fetchProvinces();
  await locationStore.fetchTypes();
  await postStore.fetchPosts();
  filteredListings.value = [...postStore.posts];
  loading.value = false;
});

const filters = ref({
  type: "",
  province: "",
  district: "",
  village: "",
  price: "ລາຄາ",
});

const searchQuery = ref("");
const loading = ref(true);

const formatPrice = (price) => {
  return price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
};

const viewDetails = async (id) => {
  try {
    await postStore.viewCountDetail(id);
    router.push(`/detail?id=${id}`);
  } catch (error) {
    console.error("Error:", error);
  }
};

const applyFilters = async () => {
  loading.value = true;

  try {
    const apiFilters = {
      VILLAGE: filters.value.village === "ບ້ານ" ? "" : filters.value.village,
      DISTRICT:
        filters.value.district === "ເມືອງ" ? "" : filters.value.district,
      PROVINCE:
        filters.value.province === "ແຂວງ"
          ? ""
          : filters.value.province?.name || filters.value.province || "",
      TYPE:
        filters.value.type === "ປະເພດຊັບສິນ"
          ? ""
          : filters.value.type?.TYPE || filters.value.type || "",
    };

    await postStore.fetchPosts(apiFilters);
    filteredListings.value = [...postStore.posts];
    currentPageNum.value = 1;
  } catch (error) {
    console.error("Error applying filters:", error);
  } finally {
    loading.value = false;
  }
};

watch(
  [() => filters.value.province, () => filters.value.district],
  async ([newProvince, newDistrict], [oldProvince, oldDistrict]) => {
    if (newProvince !== oldProvince) {
      if (newProvince && newProvince.name) {
        await locationStore.fetchDistricts(newProvince.name);
        filters.value.district = "";
        filters.value.village = "";
      } else {
        locationStore.districts = [];
        locationStore.villages = [];
        filters.value.district = "";
        filters.value.village = "";
      }
    }
    if (newDistrict !== oldDistrict && filters.value.province) {
      if (newDistrict) {
        await locationStore.fetchVillages(
          filters.value.province.name,
          newDistrict
        );
        filters.value.village = "";
      } else {
        locationStore.villages = [];
        filters.value.village = "";
      }
    }
  },
  { deep: true }
);

const handleSearch = async () => {
  loading.value = true;
  try {
    if (!searchQuery.value.trim()) {
      await postStore.fetchPosts();
      filteredListings.value = [...postStore.posts];
      return;
    }
    await postStore.fetchPosts({ SEARCH: searchQuery.value.trim() });

    filteredListings.value = postStore.posts.filter((item) => {
      const searchTerm = searchQuery.value.toLowerCase();
      return (
        (item.TYPE && item.TYPE.toLowerCase().includes(searchTerm)) ||
        (item.PROVINCE && item.PROVINCE.toLowerCase().includes(searchTerm)) ||
        (item.DISTRICT && item.DISTRICT.toLowerCase().includes(searchTerm)) ||
        (item.VILLAGE && item.VILLAGE.toLowerCase().includes(searchTerm)) ||
        (item.PRICE && item.PRICE.toString().includes(searchQuery.value))
      );
    });

    currentPageNum.value = 1;
  } catch (error) {
    console.error("Error searching:", error);
  } finally {
    loading.value = false;
  }
};

const debouncedSearch = debounce(handleSearch, 1000);

const filteredListings = ref([]);

const paginatedListings = computed(() => {
  const start = (currentPageNum.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredListings.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredListings.value.length / itemsPerPage);
});

const visiblePages = computed(() => {
  const maxVisible = 5;
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(currentPageNum.value - half, 1);
  let end = Math.min(start + maxVisible - 1, totalPages.value);

  if (end - start + 1 < maxVisible) {
    start = Math.max(end - maxVisible + 1, 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});
</script>

<style>
/* You can add custom styles here if needed */
</style>