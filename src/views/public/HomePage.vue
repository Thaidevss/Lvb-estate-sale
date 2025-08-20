<template>
  <!-- <div class="min-h-screen bg-gray-100 p-4"> -->
  <div class="relative z-10 min-h-screen bg-gray-50 p-4">
    <!-- Mobile Version -->
    <div class="block sm:hidden container mx-auto w-full p-2 mb-4">
      <div class="flex justify-between items-center w-full">
        <!-- หัวข้อ -->
        <h2
          class="text-base flex items-center font-bold text-blue-900 whitespace-nowrap"
        >
          <Square3Stack3DIcon class="h-8 w-8 me-1 text-blue-900 font-bold" />
          ຊັບສິນຕ້ອງການປະມູນຂາຍ
        </h2>
        <button
          class="text-sm py-1 px-2 border rounded text-blue-900 border-blue-900 hover:bg-gray-100 flex items-center shadow whitespace-nowrap"
        >
          <router-link to="/login" class="flex items-center">
            <UserCircleIcon class="w-5 h-5 me-1" />
            ເຂົ້າສູ່ລະບົບ
          </router-link>
        </button>
      </div>
    </div>

    <!-- Desktop Version -->
    <div
      class="hidden sm:flex container mx-auto flex-col sm:flex-row justify-between items-center w-full gap-2 p-2 mb-4"
    >
      <div class="w-full sm:w-auto">
        <h2
          class="text-base flex items-center sm:text-md md:text-sm lg:text-md font-bold text-blue-900"
        >
          <Square3Stack3DIcon class="h-8 w-8 me-1 text-blue-900 font-bold" />
          ຊັບສິນຕ້ອງການປະມູນຂາຍ
        </h2>
      </div>
      <div class="flex-1 max-w-md mx-4">
        <div class="relative">
          <MagnifyingGlassIcon
            class="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          />
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
        <!-- <button
          class="text-sm px-1 mx-2 border rounded text-blue-900 border-blue-900 hover:bg-gray-100 flex items-center shadow"
        >
          <div class="relative">
            <button
              @click="isOpen = !isOpen"
              class="flex items-center space-x-2 px-1 py-1 rounded shadow bg-white hover:bg-gray-50"
            >
              <img :src="currentFlag" alt="flag" class="w-5 h-auto" />
              <span class="uppercase text-sm">{{ selectedLanguage }}</span>
              <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-if="isOpen"
              class="absolute mt-1 w-full bg-white border rounded shadow z-50"
            >
              <ul>
                <li
                  v-for="(lang, key) in languages"
                  :key="key"
                  @click="selectLanguage(key)"
                  class="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <img :src="lang.flag" alt="flag" class="w-5 h-auto mr-2" />
                  {{ lang.label }}
                </li>
              </ul>
            </div>
          </div>
        </button> -->
        
        <button
          class="text-sm py-1 px-2 border rounded text-blue-900 border-blue-900 hover:bg-gray-100 flex items-center shadow"
        >
          <router-link to="/login" class="flex items-center">
            <UserCircleIcon class="w-5 h-5 me-1" />
            ເຂົ້າສູ່ລະບົບ
          </router-link>
        </button>
      </div>
    </div>

    <div class="container mx-auto flex flex-col lg:flex-row gap-4">
      <!-- Sidebar -->
      <!-- <aside class="lg:w-1/6 h-[80vh] bg-white rounded-md shadow-md p-4"> -->
      <aside class="h-auto md:h-[80vh] lg:w-1/6 bg-white rounded-md shadow-md p-4">
        <h2 class="text-sm font-bold text-blue-900 mb-4 text-center">
          ຄົ້ນຫາ ຊັບ-ສິນ ພ້ອມຂາຍ
        </h2>
        <div class="space-y-3 text-sm">
          <select
            v-model="filters.type"
            class="w-full border text-gray-600 border-gray-300 shadow rounded text-sm px-2 py-1.5"
          >
            <option value="">ປະເພດທັງໝົດ</option>
            <option
              v-for="type in locationStore.types"
              :key="type.id"
              :value="type"
            >
              {{ type.TYPE }}
            </option>
          </select>

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
          <button
            @click="applyFilters"
            class="w-full bg-blue-900 text-white py-2 rounded shadow hover:bg-blue-800 transition"
          >
            ຄົ້ນຫາ
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
} from "@heroicons/vue/24/outline";
import { usePostStore } from "../../stores/indexStore";
import {
  getImageUrl,
  getProfileImageUrl,
  getDefaultImage,
} from "../../utils/getImage";
import { useLocationStore } from "../../stores/locationStore";
import LoadingSpinner from "../../components/common/Loading.vue";
import laFlag from '../../assets/images/laos.png'
import enFlag from '../../assets/images/united-kingdom.png'
import vnFlag from '../../assets/images/vietnam.png'

const router = useRouter();

const locationStore = useLocationStore();

const postStore = usePostStore();
const currentPage = ref(1);
const itemsPerPage = 12;

const defaultImage = ref(getDefaultImage());

const selectedLanguage = ref('lo')
const isOpen = ref(false)

const languages = {
  en: { label: 'EN', flag: enFlag },
  lo: { label: 'LA', flag: laFlag },
  vi: { label: 'VN', flag: vnFlag }
}

const currentFlag = computed(() => languages[selectedLanguage.value].flag)

const  selectLanguage = (lang) => {
  selectedLanguage.value = lang
  isOpen.value = false
}

const handleImageError = (e) => {
  e.target.src = defaultImage.value;
  // e.target.classList.add('bg-gray-100');
};

onMounted(async () => {
  await locationStore.fetchProvinces();
  await locationStore.fetchTypes();
  await postStore.fetchPosts();
  filteredListings.value = [...postStore.posts];
  loading.value = false;
});

// เพิ่ม watcher สำหรับ district เมื่อ province เปลี่ยน

const filterOptions = ref({
  types: ["ປະເພດຊັບສິນ", "ດິນປຸກສ້າງເປົ່າຫວ່າງ", "ດິນກະສິກໍາ", "ດິນປູກເຮືອນ"],
  provinces: ["ແຂວງ", "ນະຄອນຫຼວງວຽງຈັນ", "ວຽງຈັນ", "ສະຫວັນນະເຂດ"],
  districts: ["ເມືອງ", "ສີໂຄດຕະບອງ", "ນາຊາຍທອງ", "ໄຊທານີ"],
  villages: ["ບ້ານ", "ໜອງໜ້ຽວ", "ໄຊມຸງຄຸນ", "ໜອງແຕ່ງເໜືອ"],
  prices: ["ລາຄາ", "ຕໍ່າ", "ກາງ", "ສູງ"],
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
    currentPage.value = 1;
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

    currentPage.value = 1;
  } catch (error) {
    console.error("Error searching:", error);
  } finally {
    loading.value = false;
  }
};

const debouncedSearch = debounce(handleSearch, 1000);

const filteredListings = ref([]);

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
</script>

<style>
/* You can add custom styles here if needed */
</style>
