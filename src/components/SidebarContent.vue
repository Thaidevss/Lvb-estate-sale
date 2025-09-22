<template>
  <div class="bg-white p-5 rounded-lg">
    <h2 class="text-sm font-bold text-blue-900 mb-4 text-center">
      ຄົ້ນຫາ ຊັບ-ສິນ ພ້ອມຂາຍ
    </h2>
    <div class="space-y-3 text-sm">
      <!-- ฟิลเตอร์ประเภท -->
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
        @change="onProvinceChange"
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
        @change="onDistrictChange"
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
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useLocationStore } from '../stores/locationStore'
import { usePostStore } from '../stores/indexStore'

const locationStore = useLocationStore()
const postStore = usePostStore()

// ใช้ reactive filters แทน ref เพื่อให้สามารถ watch การเปลี่ยนแปลงได้
const filters = ref({
  type: "",
  province: "",
  district: "",
  village: "",
})

const emit = defineEmits(['closeMenu', 'applyFilters'])

const onProvinceChange = async () => {
  if (filters.value.province && filters.value.province.name) {
    await locationStore.fetchDistricts(filters.value.province.name)
    filters.value.district = ""
    filters.value.village = ""
  } else {
    locationStore.districts = []
    locationStore.villages = []
    filters.value.district = ""
    filters.value.village = ""
  }
}

const onDistrictChange = async () => {
  if (filters.value.district && filters.value.province) {
    await locationStore.fetchVillages(
      filters.value.province.name,
      filters.value.district
    )
    filters.value.village = ""
  } else {
    locationStore.villages = []
    filters.value.village = ""
  }
}

const applyFilters = async () => {
  const apiFilters = {
    VILLAGE: filters.value.village === "ບ້ານ" ? "" : filters.value.village,
    DISTRICT: filters.value.district === "ເມືອງ" ? "" : filters.value.district,
    PROVINCE: filters.value.province === "ແຂວງ"
      ? ""
      : filters.value.province?.name || filters.value.province || "",
    TYPE: filters.value.type === "ປະເພດຊັບສິນ"
      ? ""
      : filters.value.type?.TYPE || filters.value.type || "",
  }

  // ส่ง event ไปยัง component หลัก
  emit('applyFilters', apiFilters)
  emit('closeMenu')
}

// Watch สำหรับการเปลี่ยนแปลงของ filters (เหมือนในต้นฉบับ)
watch(
  [() => filters.value.province, () => filters.value.district],
  async ([newProvince, newDistrict], [oldProvince, oldDistrict]) => {
    if (newProvince !== oldProvince) {
      if (newProvince && newProvince.name) {
        await locationStore.fetchDistricts(newProvince.name)
        filters.value.district = ""
        filters.value.village = ""
      } else {
        locationStore.districts = []
        locationStore.villages = []
        filters.value.district = ""
        filters.value.village = ""
      }
    }
    if (newDistrict !== oldDistrict && filters.value.province) {
      if (newDistrict) {
        await locationStore.fetchVillages(
          filters.value.province.name,
          newDistrict
        )
        filters.value.village = ""
      } else {
        locationStore.villages = []
        filters.value.village = ""
      }
    }
  },
  { deep: true }
)
</script>