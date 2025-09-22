<template>
  <div v-if="currentPage === 'home'" class="min-h-screen bg-gray-50 p-4 relative z-10 ">
    <!-- Header -->
    <div class="container mx-auto w-full p-2 mb-8">
      <div class="flex justify-between items-center w-full">
        <h2 class="text-sm flex items-center font-bold text-blue-900 whitespace-nowrap">
          <Square3Stack3DIcon class="h-8 w-8 me-1 text-blue-900 font-bold" />
          <!-- ຊັບສິນຕ້ອງການປະມູນຂາຍ -->
          {{ $t('app.property_auction') }}
        </h2>
        <!-- <button class="text-sm py-1 px-2 border rounded text-blue-900 border-blue-900 hover:bg-gray-100 flex items-center shadow whitespace-nowrap">
          <router-link to="/login" class="flex items-center">
            <UserCircleIcon class="w-5 h-5 me-1" />
            ເຂົ້າສູ່ລະບົບ
          </router-link>
        </button> -->
      </div>
    </div>

    <!-- Hero section -->
    <div class="container mx-auto my-10">
      <HeroPage />
    </div>

    <!-- เนื้อหาหลัก - แสดง icon ประเภทต่างๆ -->
    <div class="container mx-auto">
      <h2 class="text-md font-bold text-blue-900 text-center mb-8">
        {{ $t('common.select_property_type') }}
      </h2>

      <div v-if="locationStore.types && locationStore.types.length > 0" 
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mx-auto">
          
        <div 
          v-for="type in locationStore.types" 
          :key="type.id"
          @click="selectType(type)"
          class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition duration-300 hover:bg-blue-50"
        >
          <div class="w-16 h-16 mb-3 flex items-center justify-center bg-blue-100 rounded-full">
            <img 
              :src="getTypeIcon(type.TYPE)" 
              :alt="type.TYPE"
              class="h-8 w-8 object-contain"
            />
          </div>
          <span class="text-sm font-medium text-blue-900 text-center">{{ $t(`menu.${getTypeKey(type.TYPE)}`) }}</span>
        </div>
      </div>

      <!-- กรณีไม่มีข้อมูล -->
      <div v-else class="text-center text-gray-500 py-10">
        <LoadingSpinner />
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
          <!-- ກັບໄປຫນ້າຫລັກ -->
          {{ $t('common.back_to_home') }}
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
          {{ $t('app.property_search') }}
        </h2>
        <div class="space-y-5 text-sm">
          <select
            v-model="filters.province"
            class="w-full border text-gray-600 border-gray-300 shadow rounded text-sm px-2 py-1.5"
          >
            <option value="">{{ $t('modal.province') }}</option>
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
            <option value="">{{ $t('modal.district') }}</option>
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
            <option value="">{{ $t('modal.village') }}</option>
            <option
              v-for="(village, index) in locationStore.villages"
              :key="index"
              :value="village"
            >
              {{ village }}
            </option>
          </select>
          <select
            v-model="filters.areaRange"
            class="w-full border text-gray-600 border-gray-300 shadow rounded text-sm px-2 py-1.5"
          >
            <option value="">{{ $t('filters.area_range') }}</option>
            <option
              v-for="(range, index) in areaRanges"
              :key="index"
              :value="range"
            >
              {{ range.label }}
            </option>
          </select>
          
          <!-- Dropdown ช่วงราคา -->
          <select
            v-model="filters.priceRange"
            class="w-full border text-gray-600 border-gray-300 shadow rounded text-sm px-2 py-1.5"
          >
            <option value="">{{ $t('filters.price_range') }}</option>
            <option
              v-for="(range, index) in priceRanges"
              :key="index"
              :value="range"
            >
              {{ range.label }}
            </option>
          </select>
          <button
            @click="applyFilters"
            class="w-full bg-blue-900 text-white py-2 rounded shadow hover:bg-blue-800 transition"
          >
            {{ $t('common.apply') }}
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <section :class="{'w-full': isMobile, 'flex-1': !isMobile}" class="flex flex-col min-h-0">
        <!-- แสดงประเภทที่เลือก -->
        <div v-if="selectedType" class="bg-blue-50 p-3 rounded-md mb-4 flex items-center">
          <span class="text-blue-900 text-sm font-medium">{{ $t('common.selected_property_type') }}: </span>
          <span class="ml-2 text-blue-900 text-sm font-bold">{{ selectedType.TYPE }}</span>
          <button @click="clearTypeFilter" class="ml-4 text-red-600 text-sm flex items-center">
            <XMarkIcon class="h-4 w-4 mr-1" />
            {{ $t('common.clear') }}
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
                    {{ $t('property.area') }} {{ item.AREA }} m²
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
                    {{ $t('common.details') }}
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
import HeroPage from "../public/HeroPage.vue"

import landIcon from '../../assets/images/Layer_1.png';
import houseIcon from '../../assets/images/Layer_3.png';
import farmIcon from '../../assets/images/Layer_2.png';
import CarIcon from '../../assets/images/Layer_4.png';
import MachineIcon from '../../assets/images/Layer_5.png';
import BuildingIcon from '../../assets/images/Layer_6.png';

import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

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

const getTypeKey = (typeName) => {
  const typeMap = {
    'ດິນປຸກສ້າງເປົ່າຫວ່າງ': 'vacant_land',
    'ດິນກະສິກໍາ': 'agriculture',
    'ດິນ ແລະ ສິ່ງປຸກສ້າງທີ່ຢູ່ອາໄສ': 'residential',
    'ລົດ': 'car',
    'ເຄື່ອງຈັກ ແລະ ກົນຈັກໜັກ': 'machinery',
    'ດິນ ແລະ ໂຮງແຮມ, ບ້ານພັກ, ໂຮງງານ': 'commercial_land'
  };
  return typeMap[typeName] || typeName;
};

// UI state
const currentPage = ref('home');      // 'home' or 'listings'
const currentPageNum = ref(1);        // pagination page number
const itemsPerPage = 12;

const selectedType = ref(null);       // เก็บ object ของประเภทเพื่อแสดง UI
const filters = ref({
  type: "",
  province: "",
  district: "",
  village: "",
  priceRange: "",
  areaRange: "" 
});

const priceRanges = ref([
  { label: "All", min: 0, max: Infinity },
  { label: "Below 50,000", min: 0, max: 50000 },
  { label: "50,000 - 100,000", min: 50000, max: 100000 },
  { label: "100,000 - 500,000", min: 100000, max: 500000 },
  { label: "500,000 - 1,000,000", min: 500000, max: 1000000 },
  { label: "1,000,000 and above", min: 1000000, max: Infinity }
]);

const areaRanges = ref([
  { label: "All", min: 0, max: Infinity },
  { label: "Below 50 sqm", min: 0, max: 50 },
  { label: "50 - 100 sqm", min: 50, max: 100 },
  { label: "100 - 200 sqm", min: 100, max: 200 },
  { label: "200 - 500 sqm", min: 200, max: 500 },
  { label: "500 sqm and above", min: 500, max: Infinity }
]);

const searchQuery = ref("");
const loading = ref(true);
const defaultImage = ref(getDefaultImage());

// Data lists
const allListings = ref([]);          // master copy (จาก store)
const filteredListings = ref([]);     // รายการที่แสดงผลจริง (หลัง filter/search)

// helper - normalize string
const normalize = (v) => (v || "").toString().trim().toLowerCase();

// helper - รองรับตำแหน่ง TYPE ต่าง ๆ ใน object
const matchType = (item, typeString) => {
  if (!typeString) return true;
  const t = normalize(typeString);
  if (!item) return false;
  const candidates = [
    item.TYPE,
    item?.LAND_DETAILS?.TYPE,
    item?.LAND?.TYPE,
    item?.DETAILS?.TYPE // เพิ่มเผื่อโครงสร้างอื่น
  ];
  return candidates.some(c => normalize(c) === t);
};

// image error
const handleImageError = (e) => {
  e.target.src = defaultImage.value;
};

// initial load
onMounted(async () => {
  loading.value = true;
  try {
    await locationStore.fetchProvinces();
    await locationStore.fetchTypes();
    await postStore.fetchPosts();
    // เก็บ master list
    allListings.value = Array.isArray(postStore.posts) ? [...postStore.posts] : [];
    filteredListings.value = [...allListings.value];
  } catch (err) {
    console.error("Error onMounted:", err);
  } finally {
    loading.value = false;
  }
});

// --- select type: filter client-side เฉพาะ type แล้วไปหน้า listings
const selectType = (type) => {
  selectedType.value = type;
  const typeName = type?.TYPE || type || "";
  filters.value.type = typeName;
  currentPage.value = 'listings';
  currentPageNum.value = 1;

  // filter จาก master list
  filteredListings.value = allListings.value.filter(item => matchType(item, typeName));
};

const goBackToHome = () => { currentPage.value = 'home'; selectedType.value = null; filters.value.type = ""; };

// clear type filter
const clearTypeFilter = () => {
  selectedType.value = null;
  filters.value.type = "";
  currentPageNum.value = 1;
  filters.value = {
    type: "",
    province: "",
    district: "",
    village: "",
    priceRange: null,
    areaRange: null
  };
  filteredListings.value = [...allListings.value];
  currentPage.value = 'home'; 
};

// applyFilters: กรองต่อจาก master แต่จะ respect type ถ้ามี
// const applyFilters = () => {
//   loading.value = true;
//   try {
//     let base = [...allListings.value];

//     // ถ้ามี type ให้กรองก่อน
//     if (filters.value.type) {
//       base = base.filter(i => matchType(i, filters.value.type));
//     }

//     // PROVINCE (province เป็น object จาก select หรือ string)
//     if (filters.value.province) {
//       const provName = typeof filters.value.province === 'object' ? (filters.value.province.name || "") : filters.value.province;
//       if (provName) {
//         const q = normalize(provName);
//         base = base.filter(i => normalize(i.PROVINCE).includes(q));
//       }
//     }

//     // DISTRICT
//     if (filters.value.district) {
//       const districtVal = typeof filters.value.district === 'object' ? (filters.value.district.name || "") : filters.value.district;
//       if (districtVal) {
//         const q = normalize(districtVal);
//         base = base.filter(i => normalize(i.DISTRICT).includes(q));
//       }
//     }

//     // VILLAGE
//     if (filters.value.village) {
//       const villageVal = typeof filters.value.village === 'object' ? (filters.value.village.name || "") : filters.value.village;
//       if (villageVal) {
//         const q = normalize(villageVal);
//         base = base.filter(i => normalize(i.VILLAGE).includes(q));
//       }
//     }

//     // (สามารถเพิ่มกรอง PRICE / AREA ตรงนี้ได้ถ้าต้องการ)

//     filteredListings.value = base;
//     currentPageNum.value = 1;
//   } catch (err) {
//     console.error("applyFilters error:", err);
//   } finally {
//     loading.value = false;
//   }
// };

const applyFilters = () => {
  loading.value = true;
  try {
    let base = [...allListings.value];

    // กรองตาม type
    if (filters.value.type) {
      base = base.filter(i => matchType(i, filters.value.type));
    }

    // กรองตามจังหวัด
    if (filters.value.province) {
      const provName = typeof filters.value.province === 'object' ? (filters.value.province.name || "") : filters.value.province;
      if (provName) {
        const q = normalize(provName);
        base = base.filter(i => normalize(i.PROVINCE).includes(q));
      }
    }

    // กรองตามอำเภอ
    if (filters.value.district) {
      const districtVal = typeof filters.value.district === 'object' ? (filters.value.district.name || "") : filters.value.district;
      if (districtVal) {
        const q = normalize(districtVal);
        base = base.filter(i => normalize(i.DISTRICT).includes(q));
      }
    }

    // กรองตามหมู่บ้าน
    if (filters.value.village) {
      const villageVal = typeof filters.value.village === 'object' ? (filters.value.village.name || "") : filters.value.village;
      if (villageVal) {
        const q = normalize(villageVal);
        base = base.filter(i => normalize(i.VILLAGE).includes(q));
      }
    }

    // กรองตามช่วงราคา
    if (filters.value.priceRange && filters.value.priceRange.min !== undefined) {
      base = base.filter(item => {
        const price = parseFloat(item.PRICE) || 0;
        return price >= filters.value.priceRange.min && price <= filters.value.priceRange.max;
      });
    }

    // กรองตามช่วงพื้นที่
    if (filters.value.areaRange && filters.value.areaRange.min !== undefined) {
      base = base.filter(item => {
        const area = parseFloat(item.AREA) || 0;
        return area >= filters.value.areaRange.min && area <= filters.value.areaRange.max;
      });
    }

    filteredListings.value = base;
    currentPageNum.value = 1;
  } catch (err) {
    console.error("applyFilters error:", err);
  } finally {
    loading.value = false;
  }
};

// search (debounced) -> ค้นหาในผลลัพธ์ที่ respect type ถ้ามี
const handleSearch = () => {
  loading.value = true;
  try {
    const q = searchQuery.value.trim().toLowerCase();
    // เริ่มจาก master, แต่ respect selected type ถ้ามี
    let base = [...allListings.value];
    if (filters.value.type) base = base.filter(i => matchType(i, filters.value.type));

    if (!q) {
      filteredListings.value = base;
      currentPageNum.value = 1;
      loading.value = false;
      return;
    }

    filteredListings.value = base.filter(item => {
      const typeStr = normalize(item.TYPE) || normalize(item?.LAND_DETAILS?.TYPE);
      const prov = normalize(item.PROVINCE);
      const dist = normalize(item.DISTRICT);
      const vill = normalize(item.VILLAGE);
      const price = (item.PRICE || "").toString().toLowerCase();
      return (
        typeStr.includes(q) ||
        prov.includes(q) ||
        dist.includes(q) ||
        vill.includes(q) ||
        price.includes(q)
      );
    });

    currentPageNum.value = 1;
  } catch (err) {
    console.error("handleSearch error:", err);
  } finally {
    loading.value = false;
  }
};

const debouncedSearch = debounce(handleSearch, 800);

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

// pagination computed
const paginatedListings = computed(() => {
  const start = (currentPageNum.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredListings.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredListings.value.length / itemsPerPage));
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
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

// watch province/district to fetch location lists (เหมือนเดิม)
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
        await locationStore.fetchVillages(filters.value.province.name, newDistrict);
        filters.value.village = "";
      } else {
        locationStore.villages = [];
        filters.value.village = "";
      }
    }
  },
  { deep: true }
);
</script>


<style>
/* You can add custom styles here if needed */
</style>