<template>
  <div class="relative z-10 min-h-screen bg-gray-50 p-4">
    <!-- Mobile Version -->
    <div class="block sm:hidden container mx-auto w-full p-2 mb-4">
      <div class="flex justify-between items-center w-full">
        <h2 class="text-base flex items-center font-bold text-blue-900 whitespace-nowrap">
          <Square3Stack3DIcon class="h-8 w-8 me-1 text-blue-900 font-bold" />
          <!-- ຊັບສິນຕ້ອງການປະມູນຂາຍ -->
          {{ $t('home.property_auction') }}
        </h2>
        <button class="text-sm py-1 px-2 border rounded text-blue-900 border-blue-900 hover:bg-gray-100 flex items-center shadow whitespace-nowrap">
          <router-link to="/login" class="flex items-center">
            <UserCircleIcon class="w-5 h-5 me-1" />
            ເຂົ້າສູ່ລະບົບ
          </router-link>
        </button>
      </div>
    </div>

    <!-- Desktop Version -->
    <div class="hidden sm:flex mx-auto w-auto flex-col sm:flex-row justify-between px-10 items-center gap-2 p-3 py-3 mb-4 shadow-sm bg-white rounded-md">
      <div class="w-full sm:w-auto">
        <h2 class="text-base flex items-center sm:text-md md:text-sm lg:text-md font-bold text-blue-900">
          <Square3Stack3DIcon class="h-8 w-8 me-1 text-blue-900 font-bold" />
          <!-- ຊັບສິນຕ້ອງການປະມູນຂາຍ -->
          {{ $t('app.property_auction') }}
        </h2>
      </div>
      <div class="flex-1 max-w-2xl mx-4">
        <div class="relative">
          <MagnifyingGlassIcon class="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            v-model="searchQuery"
            @input="debouncedSearch"
            placeholder="Search..."
            class="text-sm w-full pl-10 p-2 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div class="text-center text-blue-900 text-sm">
        <!-- <p>ພະແນກແກ້ໄຂໜີ້ ແລະ ຄຸ້ມຄອງຫຼັກຊັບຄໍ້າປະກັນ</p> -->
        <p>{{ $t('admin.department_contact') }}</p>
        <p>021 251418-666</p>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-4">
      <!-- Sidebar -->
      <aside class="h-auto md:h-[85vh] lg:w-1/6 bg-white rounded-md shadow-sm p-3">
        <h2 class="text-sm font-bold text-blue-900 mb-4 text-center">
          <!-- ຄົ້ນຫາ ຊັບ-ສິນ ພ້ອມຂາຍ -->
          <p>{{ $t('app.property_search') }}</p>
        </h2>
        <div class="space-y-7 text-sm">
          <select
            v-model="filters.type"
            class="w-full border text-gray-600 border-gray-200 rounded-md text-sm px-2 py-2.5"
          >
            <option value=""><p>{{ $t('filters.all_types') }}</p></option>
            <option
              v-for="type in locationStore.types"
              :key="type.id"
              :value="type.TYPE"
            >
              {{ type.TYPE }}
            </option>
          </select>

          <select
            v-model="filters.province"
            class="w-full border text-gray-600 border-gray-200 rounded-md text-sm px-2 py-2.5"
          >
            <option value="">{{ $t('filters.province') }}</option>
            <option
              v-for="province in locationStore.provinces"
              :key="province.id"
              :value="province.name"
            >
              {{ province.name }}
            </option>
          </select>
          <select
            v-model="filters.district"
            class="w-full border text-gray-600 border-gray-200 rounded-md text-sm px-2 py-2.5"
            :disabled="!filters.province"
          >
            <option value="">{{ $t('filters.district') }}</option>
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
            class="w-full border text-gray-600 border-gray-200 rounded-md text-sm px-2 py-2.5"
            :disabled="!filters.district"
          >
            <option value="">{{ $t('filters.village') }}</option>
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
            class="w-full border text-gray-600 border-gray-200 rounded-md text-sm px-2 py-2.5"
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
          <select
            v-model="filters.priceRange"
            class="w-full border text-gray-600 border-gray-200 rounded-md text-sm px-2 py-2.5"
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
          <select
            v-model="filters.priceSqm"
            class="w-full border text-gray-600 border-gray-200 rounded-md text-sm px-2 py-2.5"
          >
            <option value="">{{ $t('filters.price_per_sqm') }}</option>
            <option
              v-for="(price, index) in priceSqm"
              :key="index"
              :value="price"
            >
              {{ price.label }}
            </option>
          </select>
          <button
            @click="applyFilters"
            class="w-full bg-blue-900 text-white py-2.5 rounded-md shadow hover:bg-blue-800 transition"
          >
            {{ $t('common.apply') }}
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <section class="flex-1 flex flex-col min-h-0">
        <!-- Loading state -->
        <div v-if="loading">
          <LoadingSpinner />
        </div>

        <!-- Empty state -->
        <div v-if="!loading && filteredListings.length === 0" class="text-center pt-40">
          <img class="mx-auto h-20 w-20" src="../../assets/images/box.png" alt="" />
          <p>Data is Empty.</p>
        </div>

        <!-- List Cards -->
        <div v-else class="flex-grow overflow-auto space-y-3">
          <div
            v-for="item in paginatedListings"
            :key="item.id"
            class="bg-white rounded-md shadow-sm overflow-hidden hover:shadow-md transition flex flex-col sm:flex-row w-full"
          >
            <!-- Image -->
            <div class="sm:w-1/4 w-full relative">
              <img
                v-if="item.IMAGES && item.IMAGES.PROFILE_IMAGE"
                :src="item?.IMAGES?.PROFILE_IMAGE
                  ? getProfileImageUrl(item.IMAGES)
                  : defaultImage"
                @error="handleImageError"
                alt="Property preview"
                class="w-full h-40 sm:h-48 object-cover cursor-pointer hover:opacity-90 transition"
              />
              <div class="absolute top-1.5 right-1.5 bg-white bg-opacity-80 rounded-full px-1.5 py-0.5 flex items-center shadow-sm">
                <EyeIcon class="h-3.5 w-3.5 text-gray-500 mr-0.5" />
                <span class="text-[10px] text-gray-600">{{ item.VIEW_COUNT || 0 }} view</span>
              </div>
            </div>

            <!-- Content -->
            <div class="sm:w-3/4 w-full p-3 flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-start">
                  <p class="font-bold text-sm text-blue-900">{{ item.TYPE }}</p>
                  <div class="flex flex-col items-end">
                    <div class="flex space-x-1 items-center">
                      <p v-if="item.STATUS.AUTHORIZATION_LEVEL === 0" class="text-[11px] py-0.5 px-2 bg-yellow-500 text-white rounded-full shadow">{{ $t('modal.authorization_pending') }}</p>
                      <p v-else-if="item.STATUS.AUTHORIZATION_LEVEL === 1" class="text-[11px] py-0.5 px-2 bg-green-600 text-white rounded-full shadow">{{ $t('modal.authorization_approved') }}</p>
                      <p v-else-if="item.STATUS.AUTHORIZATION_LEVEL === 2" class="text-[11px] py-0.5 px-2 bg-red-600 text-white rounded-full shadow">{{ $t('modal.authorization_closed') }}</p>
                      <p v-else class="text-[11px] py-0.5 px-2 bg-gray-500 text-white rounded-full shadow">{{ $t('modal.authorization_unknown') }}</p>
                    </div>
                    <p class="text-[10px] text-gray-500 mt-1">{{ $t('common.latest_update') }}: {{ formatDate(item.CREATED_AT) }}</p>
                  </div>
                </div>

                <p class="text-[12px] mt-1 flex items-center text-gray-700">
                  <Square3Stack3DIcon class="h-4 w-4 text-blue-500 mr-1" />
                  {{ $t('property.area') }} {{ item.AREA }} m²
                </p>
                <p class="text-[12px] text-gray-500 mt-0.5 flex items-center">
                  <MapPinIcon class="h-4 w-4 text-red-500 mr-1" />
                  {{ item.VILLAGE }}, {{ item.DISTRICT }}, {{ item.PROVINCE }}
                </p>

                <!-- Description -->
                <p class="text-[12px] text-gray-600 mt-1.5 line-clamp-3">
                  {{ item.DESCRIPTION || 'ບໍ່ມີລາຍລະອຽດ' }}
                </p>
              </div>

              <!-- Footer -->
              <div class="flex items-center justify-between mt-2">
                <button
                  @click="viewDetails(item.id)"
                  class="text-[12px] text-blue-900 border border-blue-900 shadow-sm rounded px-2 py-1 hover:text-blue-900 hover:bg-blue-50 transition cursor-pointer"
                >
                  <!-- ລາຍລະອຽດ ▶ -->
                  {{ $t('common.details') }}
                </button>
                <span class="text-red-600 font-bold text-sm font-english">
                  {{ formatPrice(item.PRICE) }} {{ item.CURRENCY }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="filteredListings.length > 0" class="mt-8 flex justify-center items-center space-x-2 text-sm">
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
  EyeIcon
} from "@heroicons/vue/24/outline";
import { usePostStore } from "../../stores/indexStore";
import { getProfileImageUrl, getDefaultImage } from "../../utils/getImage";
import { useLocationStore } from "../../stores/locationStore";
import LoadingSpinner from "../../components/common/Loading.vue";
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

const router = useRouter();
const locationStore = useLocationStore();
const postStore = usePostStore();
const currentPage = ref(1);
const itemsPerPage = 5;
const defaultImage = ref(getDefaultImage());
const allListings = ref([]);

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
  { label: "500 - 1000 sqm", min: 500, max: 1000 },
  { label: "1000 sqm and above", min: 1000, max: Infinity }
]);

const priceSqm = ref([
  { label: "All", min: 0, max: Infinity },
  { label: "Below 30", min: 0, max: 30 },
  { label: "30 - 100", min: 30, max: 100 },
  { label: "100 - 200", min: 100, max: 200 },
  { label: "200 - 500", min: 200, max: 500 },
  { label: "500 and above", min: 500, max: Infinity }
]);

const filters = ref({
  type: "",
  province: "",
  district: "",
  village: "",
  priceRange: "",
  areaRange: "",
  priceSqm: ""
});

const searchQuery = ref("");
const loading = ref(true);
const filteredListings = ref([]);

onMounted(async () => {
  await locationStore.fetchProvinces();
  await locationStore.fetchTypes();
  await postStore.fetchPosts();
  allListings.value = [...postStore.posts]; // เก็บต้นฉบับ
  filteredListings.value = [...allListings.value]; // สำหรับแสดงผล
  loading.value = false;
});


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

const normalize = (str) => (str || "").toString().toLowerCase().trim();

const applyFilters = () => {
  loading.value = true;
  try {
    let base = [...allListings.value];

    if (filters.value.type) {
      base = base.filter((i) => normalize(i.TYPE).includes(normalize(filters.value.type)));
    }

    if (filters.value.province) {
      base = base.filter((i) => normalize(i.PROVINCE).includes(normalize(filters.value.province)));
    }

    if (filters.value.district) {
      base = base.filter((i) => normalize(i.DISTRICT).includes(normalize(filters.value.district)));
    }

    if (filters.value.village) {
      base = base.filter((i) => normalize(i.VILLAGE).includes(normalize(filters.value.village)));
    }

    if (filters.value.priceRange && filters.value.priceRange.min !== undefined) {
      base = base.filter((i) => {
        const price = parseFloat(i.PRICE) || 0;
        return price >= filters.value.priceRange.min && price <= filters.value.priceRange.max;
      });
    }

    if (filters.value.areaRange && filters.value.areaRange.min !== undefined) {
      base = base.filter((i) => {
        const area = parseFloat(i.AREA) || 0;
        return area >= filters.value.areaRange.min && area <= filters.value.areaRange.max;
      });
    }

    if (filters.value.priceSqm && filters.value.priceSqm.min !== undefined) {
      base = base.filter((i) => {
        const sqm = i.AREA ? (parseFloat(i.PRICE) || 0) / (parseFloat(i.AREA) || 1) : 0;
        return sqm >= filters.value.priceSqm.min && sqm <= filters.value.priceSqm.max;
      });
    }

    filteredListings.value = base;
    currentPage.value = 1;
  } finally {
    loading.value = false;
  }
};


// แก้ไข watch function
watch(
  [() => filters.value.province, () => filters.value.district],
  async ([newProvince, newDistrict], [oldProvince, oldDistrict]) => {
    // เมื่อจังหวัดเปลี่ยนแปลง
    if (newProvince !== oldProvince) {
      if (newProvince) {
        await locationStore.fetchDistricts(newProvince);
        filters.value.district = "";
        filters.value.village = "";
      } else {
        locationStore.districts = [];
        locationStore.villages = [];
        filters.value.district = "";
        filters.value.village = "";
      }
    }
    
    // เมื่ออำเภอเปลี่ยนแปลง
    if (newDistrict !== oldDistrict && filters.value.province) {
      if (newDistrict) {
        await locationStore.fetchVillages(filters.value.province, newDistrict);
        filters.value.village = "";
      } else {
        locationStore.villages = [];
        filters.value.village = "";
      }
    }
  },
  { deep: true }
);

const handleSearch = () => {
  loading.value = true;
  try {
    if (!searchQuery.value.trim()) {
      filteredListings.value = [...allListings.value];
      return;
    }
    const searchTerm = normalize(searchQuery.value);
    filteredListings.value = allListings.value.filter((i) =>
      normalize(i.TYPE).includes(searchTerm) ||
      normalize(i.PROVINCE).includes(searchTerm) ||
      normalize(i.DISTRICT).includes(searchTerm) ||
      normalize(i.VILLAGE).includes(searchTerm) ||
      (i.PRICE && i.PRICE.toString().includes(searchQuery.value))
    );
    currentPage.value = 1;
  } finally {
    loading.value = false;
  }
};


const debouncedSearch = debounce(handleSearch, 1000);

const paginatedListings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredListings.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredListings.value.length / itemsPerPage);
});

const visiblePages = computed(() => {
  const maxVisible = 5;
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(currentPage.value - half, 1);
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

const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  return date.toLocaleString("th-LA", {
    timeZone: "Asia/Vientiane",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

const handleImageError = (e) => {
  e.target.src = defaultImage.value;
};
</script>

<style>
/* You can add custom styles here if needed */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>