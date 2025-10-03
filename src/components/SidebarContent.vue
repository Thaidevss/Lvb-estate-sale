<template>
  <div class="space-y-4 text-sm p-4">
    <!-- Search input -->
    <div class="relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="debouncedSearch"
        placeholder="Search..."
        class="text-sm w-full pl-10 p-2 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <MagnifyingGlassIcon
        class="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
      />
    </div>

    <!-- Filters -->
    <select
      v-model="filters.type"
      class="w-full border text-gray-600 border-gray-200 rounded-md text-sm px-2 py-2.5"
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

    <select
      v-model="filters.province"
      class="w-full border text-gray-600 border-gray-200 rounded-md text-sm px-2 py-2.5"
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

    <select
      v-model="filters.district"
      class="w-full border text-gray-600 border-gray-200 rounded-md text-sm px-2 py-2.5"
      :disabled="!filters.province"
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

    <select
      v-model="filters.village"
      class="w-full border text-gray-600 border-gray-200 rounded-md text-sm px-2 py-2.5"
      :disabled="!filters.district"
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

    <select
      v-model="filters.areaRange"
      class="w-full border text-gray-600 border-gray-200 rounded-md text-sm px-2 py-2.5"
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

    <select
      v-model="filters.priceRange"
      class="w-full border text-gray-600 border-gray-200 rounded-md text-sm px-2 py-2.5"
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

    <select
      v-model="filters.priceSqm"
      class="w-full border text-gray-600 border-gray-200 rounded-md text-sm px-2 py-2.5"
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

    <!-- Apply button -->
    <button
      @click="applyFilters"
      class="w-full bg-blue-900 text-white py-2.5 rounded-md shadow hover:bg-blue-800 transition"
    >
      {{ $t("common.apply") }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useLocationStore } from "../stores/locationStore";
import { debounce } from "lodash";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

const locationStore = useLocationStore();

const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["apply-filters", "search"]);

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

// Search query
const searchQuery = ref("");

// Debounced search
const handleSearch = () => {
  emit("search", searchQuery.value);
};
const debouncedSearch = debounce(handleSearch, 1000);

// Watch province/district to fetch districts/villages
watch(
  [() => props.filters.province, () => props.filters.district],
  async ([newProvince, newDistrict], [oldProvince, oldDistrict]) => {
    if (newProvince !== oldProvince) {
      if (newProvince) {
        await locationStore.fetchDistricts(newProvince);
        props.filters.district = "";
        props.filters.village = "";
      } else {
        locationStore.districts = [];
        locationStore.villages = [];
        props.filters.district = "";
        props.filters.village = "";
      }
    }

    if (newDistrict !== oldDistrict && props.filters.province) {
      if (newDistrict) {
        await locationStore.fetchVillages(props.filters.province, newDistrict);
        props.filters.village = "";
      } else {
        locationStore.villages = [];
        props.filters.village = "";
      }
    }
  },
  { deep: true }
);

onMounted(async () => {
  await locationStore.fetchProvinces();
  await locationStore.fetchTypes();
});

// Apply filters button
const applyFilters = () => {
  emit("apply-filters");
};
</script>
