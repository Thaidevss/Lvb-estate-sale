import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePropertyStore = defineStore('property', () => {
  // State
  const properties = ref([])
  const filteredProperties = ref([])
  const provinces = ref([])
  const districts = ref([])
  const villages = ref([])
  const loading = ref(false)
  const error = ref(null)

  const API_URL = import.meta.env.VITE_BASE_API_URL;

  // ดึงข้อมูลทั้งหมด
  const fetchAllProperties = async () => {
    try {
      loading.value = true
      const response = await fetch(`${API_URL}/select-all`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
      
      if (!response.ok) throw new Error('Failed to fetch properties')
      
      const data = await response.json()
      properties.value = data
      filteredProperties.value = data
      
      // สกัดข้อมูลจังหวัดที่ไม่ซ้ำ
      provinces.value = [...new Set(data.map(item => item.PROVINCE))]
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // ดึงอำเภอตามจังหวัดที่เลือก
  const fetchDistricts = async (province) => {
    if (!province) {
      districts.value = []
      villages.value = []
      return
    }
    
    try {
      loading.value = true
      const response = await fetch(`${API_URL}/select-all`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ PROVINCE: province })
      })
      
      if (!response.ok) throw new Error('Failed to fetch districts')
      
      const data = await response.json()
      districts.value = [...new Set(data.map(item => item.DISTRICT))]
      villages.value = []
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // ดึงข้อมูลหมู่บ้านตามอำเภอที่เลือก
  const fetchVillages = async (province, district) => {
    if (!district) {
      villages.value = []
      return
    }
    
    try {
      loading.value = true
      const response = await fetch(`${API_URL}/select-all`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          PROVINCE: province,
          DISTRICT: district 
        })
      })
      
      if (!response.ok) throw new Error('Failed to fetch villages')
      
      const data = await response.json()
      villages.value = [...new Set(data.map(item => item.VILLAGE))]
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // ค้นหาข้อมูลตามเงื่อนไข
  const searchProperties = async (filters) => {
    try {
      loading.value = true
      const response = await fetch(`${API_URL}/select-all`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
      })
      
      if (!response.ok) throw new Error('Failed to search properties')
      
      const data = await response.json()
      filteredProperties.value = data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    properties,
    filteredProperties,
    provinces,
    districts,
    villages,
    loading,
    error,
    fetchAllProperties,
    fetchDistricts,
    fetchVillages,
    searchProperties
  }
})