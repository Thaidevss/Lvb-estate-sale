<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
    <div class="bg-white border border-white rounded-md shadow-2xl w-full h-[98vh] flex flex-col overflow-hidden">
      <!-- Modal Header -->
      <div class="sticky top-0 bg-blue-800 z-10 border-b border-gray-100 px-6 py-3">
        <div class="flex justify-between items-center">
          <h3 class="text-md font-bold text-white">
            {{ mode === 'create' ? 'ເພີ່ມການປະກາດໃໝ່' : 'ແກ້ໄຂການປະກາດ' }}
          </h3>
          <button 
            @click="close" 
            class="text-white hover:text-gray-600 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Modal Body -->
      <form @submit.prevent="save" class="container mx-auto flex-1 flex flex-col overflow-hidden">
        <div class="flex-1 flex overflow-hidden">
          <div class="flex-1 overflow-y-auto p-6 border-r border-gray-200">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <!-- Village -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">ບ້ານ</label>
                <input 
                  v-model="formData.VILLAGE"
                  type="text" 
                  placeholder="ກະລຸນາເພີ່ມບ້ານ"
                  class="w-full text-sm border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
              </div>

              <!-- Province -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">ແຂວງ</label>
                <select
                  v-model="formData.PROVINCE"
                  @change="loadDistricts"
                  class="w-full text-sm border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">ເລືອກແຂວງ</option>
                  <option 
                    v-for="province in provinces" 
                    :key="province.id" 
                    :value="province.name"
                    :selected="province.name === formData.PROVINCE"
                  >
                    {{ province.name }}
                  </option>
                </select>
              </div>

              <!-- District -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">ເມືອງ</label>
                <select
                  v-model="formData.DISTRICT"
                  :disabled="!formData.PROVINCE"
                  class="w-full text-sm border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">ເລືອກເມືອງ</option>
                  <option 
                    v-for="district in filteredDistricts" 
                    :key="district.id" 
                    :value="district.name"
                    :selected="district.name === formData.DISTRICT"
                  >
                    {{ district.name }}
                  </option>
                </select>
              </div>

              <!-- Area -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">ເນື້ອທີ່ (ຕມ.)</label>
                <input 
                  v-model.number="formData.AREA"
                  type="text" 
                  class="w-full text-sm border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
              </div>

              <!-- Price -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">ລາຄາ</label>
                <div class="relative">
                  <input 
                    v-model.number="formData.PRICE"
                    type="text" 
                    class="w-full text-sm border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                  <span class="absolute right-3 top-2.5 text-sm text-gray-500">
                    {{ formData.CURRENCY }}
                  </span>
                </div>
              </div>

              <!-- Currency -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">ສະກຸນເງີນ</label>
                <select 
                  v-model="formData.CURRENCY"
                  class="w-full text-sm border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="LAK">LAK</option>
                  <option value="USD">USD</option>
                </select>
              </div>

              <!-- Type -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">ປະເພດ</label>
                <select 
                  v-model="formData.TYPE"
                  class="w-full text-sm border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="ດິນ ແລະ ສິ່ງປຸກສ້າງທີ່ຢູ່ອາໄສ">ດິນ ແລະ ສິ່ງປຸກສ້າງທີ່ຢູ່ອາໄສ</option>
                  <option value="ດິນກະສິກໍາ">ດິນກະສິກໍາ</option>
                  <option value="ດິນປຸກສ້າງເປົ່າຫວ່າງ">ດິນປຸກສ້າງເປົ່າຫວ່າງ</option>
                </select>
              </div>

              <!-- Phone -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">ເບີໂທລະສັບ</label>
                <input 
                  v-model="formData.TEL"
                  type="tel" 
                  placeholder="020XXXXXXXX"
                  class="w-full text-sm border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
              </div>

              <!-- Email -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">ອີເມວ</label>
                <input 
                  v-model="formData.EMAIL"
                  type="email" 
                  placeholder="email@gmail.com"
                  class="w-full text-sm border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
              </div>

              <!-- Map Location -->
              <div class="md:col-span-2 space-y-1">
                <label class="block text-sm font-medium text-gray-700">ຕຳແໜ່ງສະຖານທີ່ (Google Maps)</label>
                <input 
                  v-model="formData.MAP_LOCATION"
                  type="text" 
                  class="w-full text-sm border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://maps.google.com/ (Link copy from google maps)"
                  required
                >
              </div>

              <!-- Description -->
              <div class="md:col-span-2 space-y-1">
                <label class="block text-sm font-medium text-gray-700">ລາຍລະອຽດ</label>
                <textarea 
                  v-model="formData.DESCRIPTION"
                  rows="4"
                  class="w-full text-sm border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Right Column - Image Uploads -->
          <div class="w-96 flex flex-col overflow-y-auto p-6 bg-gray-50">
            <!-- Profile Image Upload -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">ຮູບພາບໜ້າປົກ</label>
              <div class="flex items-center gap-4">
                <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="text-xs text-gray-500 mt-2 text-center">
                      ຄລິກເພື່ອເລືອກຮູບພາບ<br>
                      <span class="text-blue-500">ຫຼືລາກແລະວາງຮູບທີ່ນີ້</span>
                    </p>
                  </div>
                  <input 
                    type="file"
                    @change="handleProfileImage"
                    class="hidden"
                    accept="image/*"
                    ref="profileImageInput"
                  >
                </label>
                <!-- Profile Image Preview -->
                <div v-if="profileImagePreview" class="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                  <img :src="profileImagePreview" class="w-full h-full object-cover">
                  <button 
                    @click="removeProfileImage"
                    class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                    type="button"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Detail Images -->
            <div class="space-y-2 mt-6">
              <label class="block text-sm font-medium text-gray-700">ຮູບພາບເພີ່ມເຕີມ</label>
              <div class="flex flex-col gap-3">
                <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                    <p class="text-xs text-gray-500 mt-2 text-center">
                      ຄລິກເພື່ອເລືອກຮູບພາບ<br>
                      <span class="text-blue-500">ສາມາດເລືອກຫຼາຍຮູບພາບໄດ້ (ສູງສຸດ 6 ຮູບ)</span>
                    </p>
                  </div>
                  <input 
                    type="file"
                    multiple
                    @change="handleDetailImages"
                    class="hidden"
                    accept="image/*"
                    ref="detailImagesInput"
                  >
                </label>
                <p class="text-xs text-gray-500 text-center">
                  ຮູບປັດຈຸບັນ: {{ formData.DETAILS_IMAGE.length }}/6
                </p>
                
                <!-- Detail Images Preview -->
                <div v-if="detailImagesPreviews.length > 0" class="grid grid-cols-3 gap-3">
                  <div v-for="(preview, index) in detailImagesPreviews" :key="index" class="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                    <img :src="preview" class="w-full h-full object-cover">
                    <button 
                      @click="removeDetailImage(index)"
                      class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200"
                      type="button"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer (now inside form) -->
        <div class="sticky bottom-0 bg-white z-10 border-t border-gray-100 px-6 py-4">
          <div class="flex justify-end gap-3">
            <button 
              type="button"
              @click="close"
              class="px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              :disabled="loading"
            >
              ຍົກເລີກ
            </button>
            <button
              type="submit"
              class="px-5 py-2.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200 flex items-center gap-2"
              :disabled="loading"
            >
              <span v-if="loading">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ mode === 'create' ? 'ບັນທຶກ' : 'ອັບເດດ' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, getCurrentInstance, onMounted, computed } from 'vue'
import { usePostStore } from '../../../stores/indexStore'
import mockLaosApi from '../../../services/mockApi'

// for alert modal
const { $modal, $loading } = getCurrentInstance().appContext.config.globalProperties
const modal = getCurrentInstance().appContext.config.globalProperties.$modal;

const postStore = usePostStore()

const props = defineProps({
  post: {
    type: Object,
    default: () => ({})
  },
  mode: {
    type: String,
    default: 'create'
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const provinces = ref([]);
const districts = ref([]);

// เพิ่ม refs และ reactive properties
const profileImagePreview = ref(null);
const detailImagesPreviews = ref([]);
const profileImageInput = ref(null);
const detailImagesInput = ref(null);


const emit = defineEmits(['close', 'saved'])

const formData = ref({
  VILLAGE: '',
  DISTRICT: '',
  PROVINCE: '',
  AREA: 0,
  PRICE: 0,
  CURRENCY: 'LAK',
  TYPE: '',
  DESCRIPTION: '',
  MAP_LOCATION: '',
  TEL: '',
  EMAIL: '',
  PROFILE_IMAGE: null,
  DETAILS_IMAGE: [],
  CREATED_BY: 'ADMIN'
});

// watch(() => props.post, async (newPost) => {
//   if (newPost) {
//     console.log('Original post data:', newPost);
    
//     // เก็บค่าเดิมของจังหวัดและอำเภอไว้ก่อน
//     const oldProvince = formData.value.PROVINCE;
//     const oldDistrict = formData.value.DISTRICT;
    
//     formData.value = {
//       ...newPost,
//       VILLAGE: newPost.VILLAGE || '',
//       DISTRICT: oldDistrict || newPost.DISTRICT || '', // ใช้ค่าเดิมถ้ามี
//       PROVINCE: oldProvince || newPost.PROVINCE || '', // ใช้ค่าเดิมถ้ามี
//       AREA: newPost.AREA || 0,
//       PRICE: newPost.PRICE || 0,
//       CURRENCY: newPost.CURRENCY || 'LAK',
//       TYPE: newPost.TYPE || '',
//       DESCRIPTION: newPost.DESCRIPTION || '',
//       MAP_LOCATION: newPost.MAP_LOCATION || '',
//       TEL: newPost.TEL || '',
//       EMAIL: newPost.EMAIL || '',
//       PROFILE_IMAGE: null,
//       DETAILS_IMAGE: [],
//       CREATED_BY: newPost.CREATED_BY || 'ADMIN',
//       id: newPost.id || newPost.ID || newPost._id || null,
//       ID: newPost.ID || newPost._id || newPost.id || null,
//       _id: newPost._id || newPost.ID || newPost.id || null
//     }
    
//     // โหลดอำเภอของจังหวัดที่เลือก (ถ้ามี)
//     if (formData.value.PROVINCE) {
//       const province = provinces.value.find(p => p.name === formData.value.PROVINCE);
//       if (province) {
//         districts.value = await mockLaosApi.getDistrictsByProvinceId(province.id);
//       }
//     }
    
//     console.log('Copied form data:', formData.value);
//   } else {
//     resetForm();
//   }
// }, { immediate: true, deep: true });

watch(() => props.post, async (newPost) => {
  if (newPost) {
    console.log('Original post data:', newPost);
    
    // เก็บค่าเดิมของจังหวัดและอำเภอไว้ก่อน
    const oldProvince = formData.value.PROVINCE;
    const oldDistrict = formData.value.DISTRICT;
    
    formData.value = {
      ...newPost,
      VILLAGE: newPost.VILLAGE || '',
      DISTRICT: oldDistrict || newPost.DISTRICT || '',
      PROVINCE: oldProvince || newPost.PROVINCE || '',
      AREA: newPost.AREA || 0,
      PRICE: newPost.PRICE || 0,
      CURRENCY: newPost.CURRENCY || 'LAK',
      TYPE: newPost.TYPE || '',
      DESCRIPTION: newPost.DESCRIPTION || '',
      MAP_LOCATION: newPost.MAP_LOCATION || '',
      TEL: newPost.TEL || '',
      EMAIL: newPost.EMAIL || '',
      PROFILE_IMAGE: null,
      DETAILS_IMAGE: [],
      CREATED_BY: newPost.CREATED_BY || 'ADMIN',
      id: newPost.id || newPost.ID || newPost._id || null,
      ID: newPost.ID || newPost._id || newPost.id || null,
      _id: newPost._id || newPost.ID || newPost.id || null
    }
    
    // โหลดอำเภอของจังหวัดที่เลือก (ถ้ามี)
    if (formData.value.PROVINCE) {
      const province = provinces.value.find(p => p.name === formData.value.PROVINCE);
      if (province) {
        districts.value = await mockLaosApi.getDistrictsByProvinceId(province.id);
      }
    }
    
    // ถ้ามีรูปภาพอยู่แล้วใน post ให้แสดง preview
    if (newPost.IMAGES && newPost.IMAGES.length > 0) {
      // รูปโปรไฟล์ (รูปแรก)
      if (newPost.IMAGES[0]) {
        profileImagePreview.value = newPost.IMAGES[0];
      }
      
      // รูปรายละเอียด (รูปที่เหลือ)
      if (newPost.IMAGES.length > 1) {
        detailImagesPreviews.value = newPost.IMAGES.slice(1);
      }
    }
    
    console.log('Copied form data:', formData.value);
  } else {
    resetForm();
  }
}, { immediate: true, deep: true });

// const resetForm = () => {
//   const oldProvince = formData.value.PROVINCE;
//   const oldDistrict = formData.value.DISTRICT;
  
//   formData.value = {
//     VILLAGE: '',
//     DISTRICT: oldDistrict || '',
//     PROVINCE: oldProvince || '',
//     AREA: 0,
//     PRICE: 0,
//     CURRENCY: 'LAK',
//     TYPE: '',
//     DESCRIPTION: '',
//     MAP_LOCATION: '',
//     TEL: '',
//     EMAIL: '',
//     PROFILE_IMAGE: null,
//     DETAILS_IMAGE: [],
//     CREATED_BY: 'ADMIN'
//   };
  
//   if (!formData.value.PROVINCE) {
//     districts.value = [];
//   }
// };

const resetForm = () => {
  const oldProvince = formData.value.PROVINCE;
  const oldDistrict = formData.value.DISTRICT;
  
  formData.value = {
    VILLAGE: '',
    DISTRICT: oldDistrict || '',
    PROVINCE: oldProvince || '',
    AREA: 0,
    PRICE: 0,
    CURRENCY: 'LAK',
    TYPE: '',
    DESCRIPTION: '',
    MAP_LOCATION: '',
    TEL: '',
    EMAIL: '',
    PROFILE_IMAGE: null,
    DETAILS_IMAGE: [],
    CREATED_BY: 'ADMIN'
  };
  
  // รีเซ็ต preview images
  profileImagePreview.value = null;
  detailImagesPreviews.value = [];
  
  if (!formData.value.PROVINCE) {
    districts.value = [];
  }
};

// const handleProfileImage = (event) => {
//   const file = event.target.files[0];
//   formData.value.PROFILE_IMAGE = file || null;
//   event.target.value = ''; // รีเซ็ต input file
// };

// const handleDetailImages = (event) => {
//   const files = event.target.files;
//   if (files && files.length > 0) {
//     formData.value.DETAILS_IMAGE = Array.from(files).slice(0, 6);
//   } else {
//     formData.value.DETAILS_IMAGE = [];
//   }
//   event.target.value = ''; // รีเซ็ต input file
// };

const handleProfileImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.PROFILE_IMAGE = file;
    // สร้าง URL สำหรับ preview
    profileImagePreview.value = URL.createObjectURL(file);
  } else {
    formData.value.PROFILE_IMAGE = null;
    profileImagePreview.value = null;
  }
};

// แก้ไข method handleDetailImages
const handleDetailImages = (event) => {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  // คำนวณจำนวนรูปภาพที่สามารถเพิ่มได้ (ไม่เกิน 6 รูป)
  const remainingSlots = 6 - formData.value.DETAILS_IMAGE.length;
  if (remainingSlots <= 0) {
    alert('ທ່ານເລືອກຮູບຄົບ 6 ຮູບແລ້ວ');
    event.target.value = '';
    return;
  }

  // เลือกไฟล์ที่สามารถเพิ่มได้ (ไม่เกิน remainingSlots)
  const filesToAdd = Array.from(files).slice(0, remainingSlots);

  // เพิ่มไฟล์ใหม่เข้าไปใน array เดิม
  formData.value.DETAILS_IMAGE = [...formData.value.DETAILS_IMAGE, ...filesToAdd];

  // สร้าง URLs สำหรับ preview ภาพใหม่
  const newPreviews = filesToAdd.map(file => URL.createObjectURL(file));
  detailImagesPreviews.value = [...detailImagesPreviews.value, ...newPreviews];

  // รีเซ็ต input file
  event.target.value = '';
};

// เพิ่ม method สำหรับลบรูปภาพ
const removeProfileImage = () => {
  formData.value.PROFILE_IMAGE = null;
  profileImagePreview.value = null;
  if (profileImageInput.value) {
    profileImageInput.value.value = '';
  }
};

const removeDetailImage = (index) => {
  // ลบรูปภาพออกจาก array
  formData.value.DETAILS_IMAGE.splice(index, 1);
  
  // ลบ preview ออกและ revoke URL
  const removedPreview = detailImagesPreviews.value.splice(index, 1)[0];
  URL.revokeObjectURL(removedPreview);
  
  // รีเซ็ต input ถ้าไม่มีรูปภาพเหลืออยู่
  if (formData.value.DETAILS_IMAGE.length === 0 && detailImagesInput.value) {
    detailImagesInput.value.value = '';
  }
};


const close = () => {
  emit('close')
}

const save = async () => {
  try {
    const formDataToSend = new FormData();

    // เพิ่มข้อมูลพื้นฐานทั้งหมด
    // Object.keys(formData.value).forEach(key => {
    //   if (key !== 'PROFILE_IMAGE' && key !== 'DETAILS_IMAGE' && key !== 'IMAGES') {
    //     formDataToSend.append(key, formData.value[key]);
    //   }
    // });

    Object.keys(formData.value).forEach(key => {
      if (
        key !== 'PROFILE_IMAGE' &&
        key !== 'DETAILS_IMAGE' &&
        key !== 'IMAGES' &&
        key !== '_id' &&
        key !== 'ID' &&
        key !== 'id'
      ) {
        formDataToSend.append(key, formData.value[key]);
      }
    });

    // จัดการรูปภาพโปรไฟล์ - ส่งเฉพาะถ้ามีการเลือกรูปใหม่
    if (formData.value.PROFILE_IMAGE instanceof File) {
      formDataToSend.append('PROFILE_IMAGE', formData.value.PROFILE_IMAGE);
    }

    // จัดการรูปภาพรายละเอียด - ส่งเฉพาะถ้ามีการเลือกรูปใหม่
    if (formData.value.DETAILS_IMAGE.length > 0) {
      formData.value.DETAILS_IMAGE.forEach(file => {
        formDataToSend.append('DETAILS_IMAGE', file);
      });
    }

    if (props.mode === 'edit') {
      const postId = formData.value._id || formData.value.ID;
      formDataToSend.append('ID', postId);
      await postStore.updatePost(postId, formDataToSend);
      await modal.open({
        title: 'ສຳເລັດ',
        message: 'ອັບເດດຂໍ້ມູນສຳເລັດ!',
        type: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      await postStore.createPost(formDataToSend);
      await modal.open({
        title: 'ສຳເລັດ',
        message: 'ສ້າງຂໍ້ມູນໃໝ່ສຳເລັດ!',
        type: 'success',
        confirmButtonText: 'OK'
      });
    }

    emit('saved');
    close();
  } catch (error) {
    console.error('❌ Error saving post:', error);
    await modal.open({
      title: 'ຜິດພາດ',
      message: `ເກີດຂໍ້ຜິດພາດ: ${error.response?.data?.message || error.message}`,
      type: 'error',
      confirmButtonText: 'OK'
    });
  }
};

const filteredDistricts = computed(() => {
  return districts.value
})

// Method to load districts when province changes
const loadDistricts = async () => {
  // ไม่รีเซ็ตค่า DISTRICT ถ้าผู้ใช้ไม่ได้เลือกจังหวัดใหม่
  if (!formData.value.PROVINCE) {
    districts.value = [];
    return;
  }
  
  const province = provinces.value.find(p => p.name === formData.value.PROVINCE);
  if (province) {
    districts.value = await mockLaosApi.getDistrictsByProvinceId(province.id);
  }
  
  // ถ้าค่า DISTRICT เดิมไม่อยู่ในรายการอำเภอของจังหวัดที่เลือกใหม่ ให้รีเซ็ต
  if (formData.value.DISTRICT) {
    const districtExists = districts.value.some(d => d.name === formData.value.DISTRICT);
    if (!districtExists) {
      formData.value.DISTRICT = '';
    }
  }
};

onMounted(async () => {
  provinces.value = await mockLaosApi.getProvinces()
})
</script>