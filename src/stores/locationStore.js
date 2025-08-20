import { defineStore } from 'pinia'
import apiService from "../services/apiService"

const API_URL = import.meta.env.VITE_BASE_API_URL;

export const useLocationStore = defineStore('location', {
  state: () => ({
    types: [],
    provinces: [],
    districts: [],
    villages: [],
    error: null,
    loading: false,
  }),

  actions: {
    async fetchProvinces() {
      this.loading = true
      try {
        // const response = await apiService.post('http://10.2.182.23:8000/province')
        const response = await apiService.post(`${API_URL}/province`)
        this.provinces = response.data.data.map(item => ({
          id: item.PROVINCE,
          name: item.PROVINCE
        }))
      } catch (err) {
        this.error = err.message || 'Failed to fetch provinces'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    async fetchTypes() {
      this.loading = true
      try {
        // const response = await apiService.post('http://10.2.182.23:8000/type')
        const response = await apiService.post(`${API_URL}/type`)
        this.types = response.data.data;
      } catch (err) {
        this.error = err.message || 'Failed to fetch provinces'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async fetchDistricts(provinceName) {
      this.loading = true
      this.districts = []
      this.villages = []
      try {
        // const response = await apiService.post('http://10.2.182.23:8000/select-all', {
        const response = await apiService.post(`${API_URL}/select-all`, {
          PROVINCE: provinceName,
          DISTRICT: ""
        })
        
        if (response.data.error === "0") {
          // กรองข้อมูล district เฉพาะของจังหวัดที่เลือก
          const districtsForProvince = response.data.data
            .filter(item => item.PROVINCE === provinceName)
            .map(item => item.DISTRICT)
            
          // เอาเฉพาะ district ที่ไม่ซ้ำกัน
          const uniqueDistricts = [...new Set(districtsForProvince)].filter(Boolean)
          
          this.districts = uniqueDistricts
        }
      } catch (err) {
        this.error = err.message || 'Failed to fetch districts'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async fetchVillages(provinceName, districtName) {
      this.loading = true
      this.villages = []
      try {
        const response = await apiService.post(`${API_URL}/select-all`, {
          PROVINCE: provinceName,
          DISTRICT: districtName
        })
        
        if (response.data.error === "0") {
          // กรองข้อมูล village เฉพาะของจังหวัดและอำเภอที่เลือก
          const villagesForDistrict = response.data.data
            .filter(item => item.PROVINCE === provinceName && item.DISTRICT === districtName)
            .map(item => item.VILLAGE)
            
          // เอาเฉพาะ village ที่ไม่ซ้ำกัน
          const uniqueVillages = [...new Set(villagesForDistrict)].filter(Boolean)
          
          this.villages = uniqueVillages
        }
      } catch (err) {
        this.error = err.message || 'Failed to fetch villages'
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }
})