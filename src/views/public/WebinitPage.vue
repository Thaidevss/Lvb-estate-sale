<template>
  <div class="relative z-10 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Enhanced Header -->
    <div class="bg-white shadow-md border-b border-gray-200">
      <!-- Mobile Header -->
      <div class="block lg:hidden px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <div class="bg-blue-900 p-2 rounded-lg">
              <Square3Stack3DIcon class="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 class="text-sm font-bold text-blue-900">
                {{ $t("app.property_auction") }}
              </h2>
              <p class="text-xs text-gray-500">{{ filteredListings.length }} properties</p>
            </div>
          </div>
          <router-link 
            to="/login"
            class="flex items-center space-x-1 px-3 py-2 bg-blue-900 text-white rounded-lg text-xs font-medium hover:bg-blue-800 transition-all shadow-sm"
          >
            <UserCircleIcon class="w-4 h-4" />
            <span>ເຂົ້າສູ່ລະບົບ</span>
          </router-link>
        </div>
      </div>

      <!-- Desktop Header -->
      <div class="hidden lg:block">
        <div class="w-full mx-auto px-6 py-4">
          <div class="flex items-center justify-between gap-6">
            <!-- Logo & Title -->
            <div class="flex items-center space-x-3">
              <div class="bg-gradient-to-br from-blue-900 to-blue-700 p-3 rounded-xl shadow-lg">
                <Square3Stack3DIcon class="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 class="text-lg font-bold text-blue-900">
                  {{ $t("app.property_auction") }}
                </h2>
                <p class="text-sm text-gray-500">
                  <span class="font-semibold text-blue-900">{{ filteredListings.length }}</span> properties available
                </p>
              </div>
            </div>

            <!-- Search Bar -->
            <div class="flex-1 max-w-2xl">
              <div class="relative">
                <MagnifyingGlassIcon
                  class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                />
                <input
                  type="text"
                  v-model="searchQuery"
                  @input="debouncedSearch"
                  placeholder="Search by location, type, price..."
                  class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>

            <!-- Contact Info -->
            <div class="text-right">
              <p class="text-sm font-medium text-gray-700">{{ $t("admin.department_contact") }}</p>
              <p class="text-base font-bold text-red-600">021 251418-666</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Search -->
      <div class="block lg:hidden px-4 pb-4">
        <div class="relative">
          <MagnifyingGlassIcon
            class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
          />
          <input
            type="text"
            v-model="searchQuery"
            @input="debouncedSearch"
            placeholder="Search..."
            class="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="w-full mx-auto px-4 py-6">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Sidebar Filters -->
        <aside class="lg:w-80 bg-white rounded-xl shadow-sm border border-gray-200 h-fit sticky top-6">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-sm font-bold text-blue-900 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
                </svg>
                {{ $t("app.property_search") }}
              </h3>
              <button 
                @click="clearFilters"
                class="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear All
              </button>
            </div>

            <div class="space-y-4">
              <!-- Type Filter -->
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-2">Property Type</label>
                <select
                  v-model="filters.type"
                  class="w-full border-2 border-gray-200 rounded-lg text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">{{ $t("filters.all_types") }}</option>
                  <option
                    v-for="type in locationStore.types"
                    :key="type.id"
                    :value="type.TYPE"
                  >
                    {{ type.TYPE }}
                  </option>
                </select>
              </div>

              <!-- Province Filter -->
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-2">Province</label>
                <select
                  v-model="filters.province"
                  class="w-full border-2 border-gray-200 rounded-lg text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">{{ $t("filters.province") }}</option>
                  <option
                    v-for="province in locationStore.provinces"
                    :key="province.id"
                    :value="province.name"
                  >
                    {{ province.name }}
                  </option>
                </select>
              </div>

              <!-- District Filter -->
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-2">District</label>
                <select
                  v-model="filters.district"
                  :disabled="!filters.province"
                  class="w-full border-2 border-gray-200 rounded-lg text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">{{ $t("filters.district") }}</option>
                  <option
                    v-for="(district, index) in locationStore.districts"
                    :key="index"
                    :value="district"
                  >
                    {{ district }}
                  </option>
                </select>
              </div>

              <!-- Village Filter -->
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-2">Village</label>
                <select
                  v-model="filters.village"
                  :disabled="!filters.district"
                  class="w-full border-2 border-gray-200 rounded-lg text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">{{ $t("filters.village") }}</option>
                  <option
                    v-for="(village, index) in locationStore.villages"
                    :key="index"
                    :value="village"
                  >
                    {{ village }}
                  </option>
                </select>
              </div>

              <!-- Area Range -->
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-2">Area Range</label>
                <select
                  v-model="filters.areaRange"
                  class="w-full border-2 border-gray-200 rounded-lg text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">{{ $t("filters.area_range") }}</option>
                  <option
                    v-for="(range, index) in areaRanges"
                    :key="index"
                    :value="range"
                  >
                    {{ range.label }}
                  </option>
                </select>
              </div>

              <!-- Price Range -->
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-2">Price Range</label>
                <select
                  v-model="filters.priceRange"
                  class="w-full border-2 border-gray-200 rounded-lg text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">{{ $t("filters.price_range") }}</option>
                  <option
                    v-for="(range, index) in priceRanges"
                    :key="index"
                    :value="range"
                  >
                    {{ range.label }}
                  </option>
                </select>
              </div>

              <!-- Price per SQM -->
              <div>
                <label class="block text-xs font-semibold text-gray-700 mb-2">Price per m²</label>
                <select
                  v-model="filters.priceSqm"
                  class="w-full border-2 border-gray-200 rounded-lg text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">{{ $t("filters.price_per_sqm") }}</option>
                  <option
                    v-for="(price, index) in priceSqm"
                    :key="index"
                    :value="price"
                  >
                    {{ price.label }}
                  </option>
                </select>
              </div>

              <!-- Apply Button -->
              <button
                @click="applyFilters"
                class="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-800 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span class="flex items-center justify-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  {{ $t("common.apply") }}
                </span>
              </button>
            </div>
          </div>
        </aside>

        <!-- Property Listings -->
        <section class="flex-1 min-h-screen">
          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>

          <!-- Empty State -->
          <div
            v-else-if="filteredListings.length === 0"
            class="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
          >
            <img
              class="mx-auto h-24 w-24 opacity-50 mb-4"
              src="../../assets/images/box.png"
              alt="No data"
            />
            <h3 class="text-lg font-semibold text-gray-900 mb-2">No Properties Found</h3>
            <p class="text-sm text-gray-500">Try adjusting your search or filters</p>
          </div>

        <!-- Property Cards -->
          <div v-else class="space-y-4">
            <div
              v-for="item in paginatedListings"
              :key="item.id"
              class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div class="flex flex-col sm:flex-row">
                <!-- Image Section -->
                <div class="sm:w-72 w-full relative group">
                  <img
                    v-if="item.IMAGES && item.IMAGES.PROFILE_IMAGE"
                    :src="item?.IMAGES?.PROFILE_IMAGE ? getProfileImageUrl(item.IMAGES) : defaultImage"
                    @error="handleImageError"
                    alt="Property"
                    class="w-full h-56 sm:h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                    @click="viewDetails(item.id)"
                  />

                  <!-- View Count Badge -->
                  <div
                    class="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center space-x-1"
                  >
                    <EyeIcon class="h-4 w-4 text-white" />
                    <span class="text-xs font-medium text-white">{{ item.VIEW_COUNT || 0 }}</span>
                  </div>
                </div>

                <!-- Content Section -->
                <div class="flex-1 p-5">
                  <div class="flex flex-col h-full">
                    <!-- Header -->
                    <div class="mb-3">
                      <!-- Type + Status + Last Update -->
                      <div class="flex items-center justify-between">
                        <h3 class="text-lg font-bold text-blue-900 line-clamp-1">
                          {{ item.TYPE }}
                        </h3>

                        <div class="text-end">
                          <!-- Status Badge -->
                          <span
                            v-if="item.STATUS.AUTHORIZATION_LEVEL === 0"
                            class="inline-flex items-center px-3 py-1.5 bg-yellow-500 text-white rounded-full text-xs font-semibold shadow-lg"
                          >
                            {{ $t("modal.authorization_pending") }}
                          </span>
                          <span
                            v-else-if="item.STATUS.AUTHORIZATION_LEVEL === 1"
                            class="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-full text-xs font-semibold shadow-lg"
                          >
                            {{ $t("modal.authorization_approved") }}
                          </span>
                          <span
                            v-else-if="item.STATUS.AUTHORIZATION_LEVEL === 2"
                            class="inline-flex items-center px-3 py-1.5 bg-red-600 text-white rounded-full text-xs font-semibold shadow-lg"
                          >
                            {{ $t("modal.authorization_closed") }}
                          </span>
                          <p class="text-xs text-gray-500 flex items-center mt-1">
                            <svg
                              class="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {{ $t("common.latest_update") }}: {{ formatDate(item.CREATED_AT) }}
                          </p>
                        </div>
                      </div>

                      <!-- Last Update -->
                    </div>

                    <!-- Property Details -->
                    <div class="space-y-2 mb-4">
                      <div class="flex items-center text-sm text-gray-700">
                        <Square3Stack3DIcon
                          class="h-5 w-5 text-blue-600 mr-2 flex-shrink-0"
                        />
                        <span class="font-medium">{{ $t("property.area") }}:</span>
                        <span class="ml-1 font-semibold">{{ item.AREA }} m²</span>
                      </div>

                      <div class="flex items-start text-sm text-gray-700">
                        <MapPinIcon
                          class="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5"
                        />
                        <span class="line-clamp-2">
                          {{ item.VILLAGE }}, {{ item.DISTRICT }}, {{ item.PROVINCE }}
                        </span>
                      </div>
                    </div>

                    <!-- Description -->
                    <p class="text-sm text-gray-600 line-clamp-3 mb-4 flex-grow">
                      {{ item.DESCRIPTION || "ບໍ່ມີລາຍລະອຽດ" }}
                    </p>

                    <!-- Action Button + Price -->
                    <div class="flex justify-between items-center">
                      <button
                        @click="viewDetails(item.id)"
                        class="w-full sm:w-auto inline-flex items-center justify-center px-3 py-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg font-medium hover:from-blue-800 hover:to-blue-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                      >
                        <span>{{ $t("common.details") }}</span>
                        <svg
                          class="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>

                      <!-- Price -->
                      <span
                        class="text-md font-bold text-red-600 font-english ml-4 whitespace-nowrap"
                      >
                        {{ formatPrice(item.PRICE) }} {{ item.CURRENCY }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div
            v-if="filteredListings.length > 0"
            class="mt-8 flex justify-center items-center space-x-2"
          >
            <button
              @click="currentPage = 1"
              :disabled="currentPage === 1"
              class="px-3 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &laquo;
            </button>
            <button
              @click="currentPage = currentPage - 1"
              :disabled="currentPage === 1"
              class="px-3 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &lsaquo;
            </button>

            <template v-for="page in visiblePages" :key="page">
              <button
                @click="currentPage = page"
                :class="{
                  'bg-blue-900 text-white border-blue-900': currentPage === page,
                  'border-gray-300 hover:bg-gray-100': currentPage !== page,
                }"
                class="px-4 py-2 border-2 rounded-lg transition font-medium"
              >
                {{ page }}
              </button>
            </template>

            <button
              @click="currentPage = currentPage + 1"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &rsaquo;
            </button>
            <button
              @click="currentPage = totalPages"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &raquo;
            </button>
          </div>
        </section>
      </div>
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
} from "@heroicons/vue/24/outline";
import { usePostStore } from "../../stores/indexStore";
import { getProfileImageUrl, getDefaultImage } from "../../utils/getImage";
import { useLocationStore } from "../../stores/locationStore";
import LoadingSpinner from "../../components/common/Loading.vue";
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n();

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
  { label: "1,000,000 and above", min: 1000000, max: Infinity },
]);

const areaRanges = ref([
  { label: "All", min: 0, max: Infinity },
  { label: "Below 50 sqm", min: 0, max: 50 },
  { label: "50 - 100 sqm", min: 50, max: 100 },
  { label: "100 - 200 sqm", min: 100, max: 200 },
  { label: "200 - 500 sqm", min: 200, max: 500 },
  { label: "500 - 1000 sqm", min: 500, max: 1000 },
  { label: "1000 sqm and above", min: 1000, max: Infinity },
]);

const priceSqm = ref([
  { label: "All", min: 0, max: Infinity },
  { label: "Below 30", min: 0, max: 30 },
  { label: "30 - 100", min: 30, max: 100 },
  { label: "100 - 200", min: 100, max: 200 },
  { label: "200 - 500", min: 200, max: 500 },
  { label: "500 and above", min: 500, max: Infinity },
]);

const filters = ref({
  type: "",
  province: "",
  district: "",
  village: "",
  priceRange: "",
  areaRange: "",
  priceSqm: "",
});

const searchQuery = ref("");
const loading = ref(true);
const filteredListings = ref([]);

const baseFilter = (items) => {
  return items.filter(
    (i) =>
      (i.STATUS?.AUTHORIZATION_LEVEL === 1 ||
        i.STATUS?.AUTHORIZATION_LEVEL === 2) &&
      i.STATUS?.VISIBILITY === "PRIVATE"
  );
};

onMounted(async () => {
  await locationStore.fetchProvinces();
  await locationStore.fetchTypes();
  await postStore.fetchPosts();
  allListings.value = [...postStore.posts];
  filteredListings.value = baseFilter(allListings.value);
  loading.value = false;
});

const clearFilters = () => {
  filters.value = {
    type: "",
    province: "",
    district: "",
    village: "",
    priceRange: "",
    areaRange: "",
    priceSqm: "",
  };
  searchQuery.value = "";
  filteredListings.value = baseFilter(allListings.value);
  currentPage.value = 1;
};

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
    let base = baseFilter(allListings.value);

    if (filters.value.type) {
      base = base.filter((i) =>
        normalize(i.TYPE).includes(normalize(filters.value.type))
      );
    }

    if (filters.value.province) {
      base = base.filter((i) =>
        normalize(i.PROVINCE).includes(normalize(filters.value.province))
      );
    }

    if (filters.value.district) {
      base = base.filter((i) =>
        normalize(i.DISTRICT).includes(normalize(filters.value.district))
      );
    }

    if (filters.value.village) {
      base = base.filter((i) =>
        normalize(i.VILLAGE).includes(normalize(filters.value.village))
      );
    }

    if (
      filters.value.priceRange &&
      filters.value.priceRange.min !== undefined
    ) {
      base = base.filter((i) => {
        const price = parseFloat(i.PRICE) || 0;
        return (
          price >= filters.value.priceRange.min &&
          price <= filters.value.priceRange.max
        );
      });
    }

    if (filters.value.areaRange && filters.value.areaRange.min !== undefined) {
      base = base.filter((i) => {
        const area = parseFloat(i.AREA) || 0;
        return (
          area >= filters.value.areaRange.min &&
          area <= filters.value.areaRange.max
        );
      });
    }

    if (filters.value.priceSqm && filters.value.priceSqm.min !== undefined) {
      base = base.filter((i) => {
        const sqm = i.AREA
          ? (parseFloat(i.PRICE) || 0) / (parseFloat(i.AREA) || 1)
          : 0;
        return (
          sqm >= filters.value.priceSqm.min && sqm <= filters.value.priceSqm.max
        );
      });
    }

    filteredListings.value = base;
    currentPage.value = 1;
  } finally {
    loading.value = false;
  }
};

watch(
  [() => filters.value.province, () => filters.value.district],
  async ([newProvince, newDistrict], [oldProvince, oldDistrict]) => {
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
    const baseFilteredItems = baseFilter(allListings.value);

    if (!searchQuery.value.trim()) {
      filteredListings.value = baseFilteredItems;
      return;
    }

    const searchTerm = normalize(searchQuery.value);
    
    filteredListings.value = baseFilteredItems.filter(
      (i) =>
        normalize(i.TYPE).includes(searchTerm) ||
        normalize(i.PROVINCE).includes(searchTerm) ||
        normalize(i.DISTRICT).includes(searchTerm) ||
        normalize(i.VILLAGE).includes(searchTerm) ||
        normalize(i.DESCRIPTION || "").includes(searchTerm) ||
        normalize(i.AREA || "").includes(searchTerm) ||
        (i.PRICE && i.PRICE.toString().includes(searchQuery.value))
    );

    currentPage.value = 1;
  } finally {
    loading.value = false;
  }
};

const debouncedSearch = debounce(handleSearch, 500);

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
    hour12: false,
  });
};

const handleImageError = (e) => {
  e.target.src = defaultImage.value;
};
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Animation for cards */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}
</style>