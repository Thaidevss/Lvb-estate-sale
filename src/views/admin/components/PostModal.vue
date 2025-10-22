<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
    <div class="bg-white border border-white rounded-md shadow-2xl w-full h-[98vh] flex flex-col overflow-hidden">
      <!-- Modal Header -->
      <div class="sticky top-0 bg-blue-800 z-10 border-b border-gray-100 px-6 py-3">
        <div class="flex justify-between items-center">
          <h3 class="text-md font-bold text-white">
            {{ mode === 'create' ? 'Add New Post' : 'Update Post' }}
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
                <label class="block text-sm font-medium text-gray-700">{{ $t('filters.village') }}</label>
                <input 
                  v-model="formData.VILLAGE"
                  type="text" 
                  placeholder="Vui lòng thêm tên làng / ກະລຸນາເພີ່ມບ້ານ/ Please enter village name..."
                  class="w-full text-sm border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
              </div>

              <!-- Province -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">{{ $t('filters.province') }}</label>
                <select
                  v-model="selectedProvince"
                  @change="handleProvinceChange"
                  class="border border-gray-300 rounded-md px-3 py-2 w-full text-sm text-gray-800"
                  required
                >
                  <option value="">ເລືອກແຂວງ</option>
                  <option
                    v-for="province in locationStore.provincesList"
                    :key="province.id"
                    :value="province.id"
                  >
                    {{ province.name }}
                  </option>
                </select>
              </div>

              <!-- District -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">{{ $t('filters.district') }}</label>
                <select
                  v-model="selectedDistrict"
                  @change="handleDistrictChange"
                  class="border border-gray-300 rounded-md px-3 py-2 w-full text-sm text-gray-800"
                  required
                >
                  <option value="">ເລືອກເມືອງ</option>
                  <option
                    v-for="district in locationStore.districtsList"
                    :key="district.id"
                    :value="district.id"
                  >
                    {{ district.name }}
                  </option>
                </select>
              </div>

              <!-- Area -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">{{ $t('property.area') }} (ຕມ.)</label>
                <input 
                  v-model.number="formData.AREA"
                  type="number" 
                  step="0.01"
                  min="0"
                  class="w-full text-sm border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
              </div>

              <!-- Price -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">{{ $t('property.price') }}</label>
                <div class="relative">
                  <input 
                    v-model="formData.PRICE"
                    type="number" 
                    step="0.01"
                    min=""
                    placeholder="Giá bằng số..."
                    class="w-full text-sm border border-gray-300 rounded-md px-4 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                  <span class="absolute right-3 top-2.5 text-sm text-gray-500">
                    {{ formData.CURRENCY }}
                  </span>
                </div>
              </div>

              <!-- Price string -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">{{ $t('favorite.price_string') }}</label>
                <input 
                  v-model="formData.PRICE_STRING"
                  type="text" 
                  placeholder="Giá bằng chữ..."
                  class="w-full text-sm border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
              </div>

              <!-- Currency -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">{{ $t('modal.currency') }}</label>
                <select 
                  v-model="formData.CURRENCY"
                  class="w-full text-sm border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  
                >
                  <option value="LAK">LAK</option>
                  <option value="USD">USD</option>
                  <option value="VND">VND</option>
                </select>
              </div>

              <!-- Type -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">{{ $t('modal.type') }}</label>
                <select 
                  v-model="formData.TYPE"
                  class="w-full text-sm border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">{{ $t('content.property_type') }}</option>
                  <option value="ດິນ ແລະ ສິ່ງປຸກສ້າງທີ່ຢູ່ອາໄສ">{{ $t('menu.residential') }}</option>
                  <option value="ດິນກະສິກໍາ">{{ $t('menu.agriculture') }}</option>
                  <option value="ດິນປຸກສ້າງເປົ່າຫວ່າງ">{{ $t('menu.vacant_land') }}</option>
                  <option value="ດິນ ແລະ ໂຮງແຮມ, ບ້ານພັກ, ໂຮງງານ">{{ $t('menu.commercial_land') }}</option>
                  <option value="ເຄື່ອງຈັກ ແລະ ກົນຈັກໜັກ">{{ $t('menu.machinery') }}</option> 
                  <option value="ລົດ">{{ $t('menu.car') }}</option> 
                  <option value="ສິດນຳໃຊ້ທີ່ດິນ ຫຼື ອາຄານ">{{ $t('menu.property_use_rights') }}</option> 
                  <option value="ຊັບສິນອື່ນໆ">{{ $t('menu.other_property') }}</option> 
                </select>
              </div>

              <!-- Phone -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">{{ $t('modal.contact_tel') }}</label>
                <input 
                  v-model="formData.TEL"
                  type="tel" 
                  placeholder="020XXXXXXXX"
                  class="w-full text-sm border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
              </div>

              <!-- Email -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">{{ $t('modal.contact_email') }}</label>
                <input 
                  v-model="formData.EMAIL"
                  type="email" 
                  placeholder="email@gmail.com"
                  class="w-full text-sm border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
              </div>

              <!-- PDF Upload -->
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-800">
                  {{ $t("favorite.document_pdf") }} (PDF)
                </label>

                <div class="relative flex items-center justify-between border border-gray-300 rounded-lg px-4 py-3 hover:border-blue-400 transition-all duration-200 cursor-pointer">
                  <input
                    id="pdf-upload"
                    type="file"
                    accept="application/pdf"
                    @change="handlePdfUpload"
                    class="absolute inset-0 opacity-0 cursor-pointer"
                    ref="pdfInput"
                  />
                  <div class="flex items-center space-x-3">
                    <DocumentArrowDownIcon class="h-5 w-5"/>
                    <span class="text-sm text-gray-600">
                      {{ pdfFileName || 'Choose PDF...' }}
                    </span>
                  </div>

                  <button
                    v-if="formData.FILE_PDF"
                    @click.prevent="removePdf"
                    class="text-xs text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    ລົບ
                  </button>
                </div>

                <p class="text-xs text-gray-400 mt-1">
                  ຮອງຮັບແຕ່ໄຟລ໌ .pdf
                </p>
              </div>

              <!-- Post Privacy -->
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Post visibility</label>
                <div class="flex items-center space-x-4 mt-1">
                  <label class="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      value="PRIVATE" 
                      v-model="formData.VISIBILITY" 
                      class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span class="text-sm text-gray-700">Local</span>
                  </label>

                  <label class="flex items-center space-x-2">
                    <input 
                      type="radio" 
                      value="ALL" 
                      v-model="formData.VISIBILITY" 
                      class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span class="text-sm text-gray-700">Local And Public</span>
                  </label>
                </div>
              </div>

              <!-- Map Location -->
              <div class="md:col-span-2 space-y-1">
                <label class="block text-sm font-medium text-gray-700">{{ $t('property.location') }} (Google Maps)</label>
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
                <label class="block text-sm font-medium text-gray-700">{{ $t('property.description') }}</label>
                <textarea 
                  v-model="formData.DESCRIPTION"
                  rows="8"
                  placeholder="ລາຍລະອຽດ..............."
                  class="w-full text-sm border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Right Column - Image Uploads -->
          <div class="w-96 flex flex-col ms-20 overflow-y-auto p-6 bg-gray-50">
            <!-- Profile Image Upload -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">{{ $t('property.main_image') }}</label>
              <div class="flex flex-col gap-4">
                <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="text-xs text-gray-500 mt-2 text-center">
                      {{ $t('property.select_image') }}<br>
                      <span class="text-blue-500">{{ $t('property.paste_image') }}</span>
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
              <label class="block text-sm font-medium text-gray-700">{{ $t('property.sub_image') }}</label>
              <div class="flex flex-col gap-3">
                <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                    <p class="text-xs text-gray-500 mt-2 text-center">
                      {{ $t('property.select_image') }}<br>
                      <span class="text-blue-500">{{ $t('property.limit_image') }}</span>
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
                  {{ $t('property.current_image') }}: {{ formData.DETAILS_IMAGE.length }}/6
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

        <!-- Modal Footer -->
        <div class="sticky bottom-0 bg-white z-10 border-t border-gray-100 px-6 py-4">
          <div class="flex justify-end gap-3">
            <button 
              type="button"
              @click="close"
              class="px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              :disabled="loading"
            >
              cancel
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
              {{ mode === 'create' ? 'save' : 'update' }}
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
import { useLocationStore } from '../../../stores/locationStore'
import mockLaosApi from '../../../services/mockApi'
import {
  DocumentArrowDownIcon
} from "@heroicons/vue/24/outline";

import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

// for alert modal
const { $modal, $loading } = getCurrentInstance().appContext.config.globalProperties
const modal = getCurrentInstance().appContext.config.globalProperties.$modal;

const postStore = usePostStore()
const locationStore = useLocationStore()

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
const selectedProvince = ref("");
const selectedDistrict = ref("");

// เพิ่ม refs และ reactive properties
const profileImagePreview = ref(null);
const detailImagesPreviews = ref([]);
const profileImageInput = ref(null);
const detailImagesInput = ref(null);
const pdfInput = ref(null);
const pdfFileName = ref('');

const emit = defineEmits(['close', 'saved'])

const formData = ref({
  VILLAGE: '',
  DISTRICT: '',
  PROVINCE: '',
  AREA: 0,
  PRICE: null,
  PRICE_STRING: '',
  CURRENCY: 'LAK',
  TYPE: '',
  DESCRIPTION: '',
  MAP_LOCATION: '',
  TEL: '',
  EMAIL: '',
  PROFILE_IMAGE: null,
  DETAILS_IMAGE: [],
  FILE_PDF: null,
  CREATED_BY: 'ADMIN',
  VISIBILITY: 'ALL'
});

watch(() => props.post, async (newPost) => {
  if (newPost && Object.keys(newPost).length > 0) {
    console.log('Original post data:', newPost);
    
    formData.value = {
      VILLAGE: newPost.VILLAGE || '',
      DISTRICT: newPost.DISTRICT || '',
      PROVINCE: newPost.PROVINCE || '',
      AREA: newPost.AREA || 0,
      PRICE: newPost.PRICE || null,
      CURRENCY: newPost.CURRENCY || 'LAK',
      PRICE_STRING: newPost.PRICE_STRING || '',
      TYPE: newPost.TYPE || '',
      DESCRIPTION: newPost.DESCRIPTION || '',
      MAP_LOCATION: newPost.MAP_LOCATION || '',
      TEL: newPost.TEL || '',
      EMAIL: newPost.EMAIL || '',
      PROFILE_IMAGE: null,
      DETAILS_IMAGE: [],
      FILE_PDF: null,
      CREATED_BY: newPost.CREATED_BY || 'ADMIN',
      VISIBILITY: newPost.VISIBILITY || 'ALL',
      id: newPost.id || newPost.ID || newPost._id || null,
      ID: newPost.ID || newPost._id || newPost.id || null,
      _id: newPost._id || newPost.ID || newPost.id || null
    }

    // Set PDF file name if exists
    if (newPost.FILE_PDF) {
      pdfFileName.value = typeof newPost.FILE_PDF === 'string' ? newPost.FILE_PDF.split('/').pop() : newPost.FILE_PDF.name;
      formData.value.FILE_PDF = newPost.FILE_PDF;
    }
    
    if (newPost.PROVINCE) {
      const provinceObj = locationStore.provincesList.find(p => p.name === newPost.PROVINCE);
      if (provinceObj) {
        selectedProvince.value = provinceObj.id;
        await locationStore.fetchDistrictsByProvince(provinceObj.id);
        if (newPost.DISTRICT) {
          const districtObj = locationStore.districtsList.find(d => d.name === newPost.DISTRICT);
          if (districtObj) {
            selectedDistrict.value = districtObj.id;
          }
        }
      }
    }

    if (newPost.IMAGES && newPost.IMAGES.length > 0) {
      if (newPost.IMAGES[0]) {
        profileImagePreview.value = newPost.IMAGES[0];
      }

      if (newPost.IMAGES.length > 1) {
        detailImagesPreviews.value = newPost.IMAGES.slice(1);
      }
    }
    
    console.log('Copied form data:', formData.value);
  } else {
    resetForm();
  }
}, { immediate: true, deep: true });

const resetForm = () => {
  formData.value = {
    VILLAGE: '',
    DISTRICT: '',
    PROVINCE: '',
    AREA: null,
    PRICE: null,
    PRICE_STRING: '',
    CURRENCY: 'LAK',
    TYPE: '',
    DESCRIPTION: '',
    MAP_LOCATION: '',
    TEL: '',
    EMAIL: '',
    PROFILE_IMAGE: null,
    DETAILS_IMAGE: [],
    FILE_PDF: null,
    CREATED_BY: 'ADMIN',
    VISIBILITY: 'ALL'
  };
  
  selectedProvince.value = '';
  selectedDistrict.value = '';
  profileImagePreview.value = null;
  detailImagesPreviews.value = [];
  pdfFileName.value = '';
  
  if (profileImageInput.value) profileImageInput.value.value = '';
  if (detailImagesInput.value) detailImagesInput.value.value = '';
  if (pdfInput.value) pdfInput.value.value = '';
};

const handlePdfUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.type === 'application/pdf') {
      formData.value.FILE_PDF = file;
      pdfFileName.value = file.name;
    } else {
      alert('ກະລຸນາເລືອກໄຟລ໌ PDF ເທົ່ານັ້ນ');
      event.target.value = '';
      formData.value.FILE_PDF = null;
      pdfFileName.value = '';
    }
  }
};

const removePdf = () => {
  formData.value.FILE_PDF = null;
  pdfFileName.value = '';
  if (pdfInput.value) {
    pdfInput.value.value = '';
  }
};

const handleProfileImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.PROFILE_IMAGE = file;
    profileImagePreview.value = URL.createObjectURL(file);
  }
};

const handleDetailImages = (event) => {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  const remainingSlots = 6 - formData.value.DETAILS_IMAGE.length;
  if (remainingSlots <= 0) {
    alert('ທ່ານເລືອກຮູບຄົບ 6 ຮູບແລ້ວ');
    event.target.value = '';
    return;
  }

  const filesToAdd = Array.from(files).slice(0, remainingSlots);
  formData.value.DETAILS_IMAGE = [...formData.value.DETAILS_IMAGE, ...filesToAdd];

  const newPreviews = filesToAdd.map(file => URL.createObjectURL(file));
  detailImagesPreviews.value = [...detailImagesPreviews.value, ...newPreviews];

  event.target.value = '';
};

const removeProfileImage = () => {
  formData.value.PROFILE_IMAGE = null;
  profileImagePreview.value = null;
  if (profileImageInput.value) {
    profileImageInput.value.value = '';
  }
};

const removeDetailImage = (index) => {
  formData.value.DETAILS_IMAGE.splice(index, 1);
  
  const removedPreview = detailImagesPreviews.value.splice(index, 1)[0];
  URL.revokeObjectURL(removedPreview);
  
  if (formData.value.DETAILS_IMAGE.length === 0 && detailImagesInput.value) {
    detailImagesInput.value.value = '';
  }
};

const close = () => {
  emit('close')
}

const save = async () => {
  try {
    // Validation
    if (!formData.value.VILLAGE || !formData.value.PROVINCE || !formData.value.DISTRICT) {
      await modal.open({
        title: 'ຜິດພາດ',
        message: 'ກະລຸນາປ້ອນຂໍ້ມູນບ້ານ, ແຂວງ ແລະ ເມືອງ',
        type: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!formData.value.TYPE) {
      await modal.open({
        title: 'ຜິດພາດ',
        message: 'ກະລຸນາເລືອກປະເພດ',
        type: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!formData.value.VISIBILITY) {
      await modal.open({
        title: 'ຜິດພາດ',
        message: 'ກະລຸນາເລືອກການເຜີຍແຜ່',
        type: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    const formDataToSend = new FormData();

    // ส่งข้อมูลทั่วไป
    const fieldsToSend = [
      'VILLAGE', 'DISTRICT', 'PROVINCE', 'AREA', 'PRICE', 
      'PRICE_STRING', 'CURRENCY', 'TYPE', 'DESCRIPTION', 
      'MAP_LOCATION', 'TEL', 'EMAIL', 'CREATED_BY', 'VISIBILITY'
    ];

    fieldsToSend.forEach(key => {
      const value = formData.value[key];
      if (value !== null && value !== undefined && value !== '') {
        formDataToSend.append(key, value);
      }
    });

    // จัดการ PDF - ส่งเฉพาะถ้ามีการเลือกไฟล์ใหม่
    if (formData.value.FILE_PDF instanceof File) {
      formDataToSend.append('FILE_PDF', formData.value.FILE_PDF);
    } else if (props.mode === 'edit' && formData.value.FILE_PDF && typeof formData.value.FILE_PDF === 'string') {
      // ถ้าเป็น edit mode และมี PDF เดิม ส่ง path เดิมไป
      formDataToSend.append('FILE_PDF_PATH', formData.value.FILE_PDF);
    }

    // จัดการรูปภาพโปรไฟล์ - ส่งเฉพาะถ้ามีการเลือกรูปใหม่
    if (formData.value.PROFILE_IMAGE instanceof File) {
      formDataToSend.append('PROFILE_IMAGE', formData.value.PROFILE_IMAGE);
    }

    // จัดการรูปภาพรายละเอียด - ส่งเฉพาะถ้ามีการเลือกรูปใหม่
    if (formData.value.DETAILS_IMAGE.length > 0) {
      const newImages = formData.value.DETAILS_IMAGE.filter(img => img instanceof File);
      if (newImages.length > 0) {
        newImages.forEach(file => {
          formDataToSend.append('DETAILS_IMAGE', file);
        });
      }
    }

    // Log FormData for debugging
    console.log('=== FormData Contents ===');
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }

    if (props.mode === 'edit') {
      const postId = formData.value._id || formData.value.ID || formData.value.id;
      if (!postId) {
        throw new Error('ບໍ່ພົບ ID ຂອງໂພສ');
      }
      formDataToSend.append('ID', postId);
      await postStore.updatePost(postId, formDataToSend);
      await modal.open({
        title: 'ສຳເລັດ',
        message: 'ອັບເດດຂໍ້ມູນສຳເລັດ!',
        type: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      // สำหรับ create mode ต้องมีรูปภาพอย่างน้อย 1 รูป
      if (!formData.value.PROFILE_IMAGE) {
        await modal.open({
          title: 'ຜິດພາດ',
          message: 'ກະລຸນາເລືອກຮູບພາບຫຼັກ',
          type: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }

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

const loadDistricts = async () => {
  if (!formData.value.PROVINCE) {
    districts.value = [];
    return;
  }
  
  const province = provinces.value.find(p => p.name === formData.value.PROVINCE);
  if (province) {
    districts.value = await mockLaosApi.getDistrictsByProvinceId(province.id);
  }
  
  if (formData.value.DISTRICT) {
    const districtExists = districts.value.some(d => d.name === formData.value.DISTRICT);
    if (!districtExists) {
      formData.value.DISTRICT = '';
    }
  }
};

onMounted(async () => {
  if (locationStore.provincesList.length === 0) {
    await locationStore.fetchProvincesList();
  }
})

const handleProvinceChange = async () => {
  if (selectedProvince.value) {
    await locationStore.fetchDistrictsByProvince(selectedProvince.value);
    
    const province = locationStore.provincesList.find(p => p.id === selectedProvince.value);
    if (province) {
      formData.value.PROVINCE = province.name;
    }
    
    selectedDistrict.value = "";
    formData.value.DISTRICT = "";
  } else {
    selectedDistrict.value = "";
    formData.value.PROVINCE = "";
    formData.value.DISTRICT = "";
    locationStore.districtsList = [];
  }
};

const handleDistrictChange = () => {
  if (selectedDistrict.value) {
    const district = locationStore.districtsList.find(d => d.id === selectedDistrict.value);
    if (district) {
      formData.value.DISTRICT = district.name;
    }
  } else {
    formData.value.DISTRICT = "";
  }
};

</script>