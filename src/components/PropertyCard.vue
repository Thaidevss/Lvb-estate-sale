<template>
  <div
    class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden border border-gray-100 hover:cursor-pointer"
  >
    <!-- Badges -->
    <div class="absolute top-3 left-3 flex space-x-2 z-10">
      <div v-if="viewCount" class="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 border border-gray-200 text-gray-700 text-xs shadow-sm">
        <EyeIcon class="h-4 w-4 text-blue-500 mr-1" />
        <span>{{ viewCount }}</span>
      </div>
    </div>

    <!-- Image -->
    <div class="relative">
      <img
        @click="handleCardClick"
        v-if="displayedImageUrl"
        :src="displayedImageUrl"
        @error="handleImageError"
        alt="Property image"
        class="w-full h-44 object-cover"
      />
      <div
        v-else
        class="w-full h-44 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
      >
        <PhotoIcon class="h-12 w-12 text-gray-400" />
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 flex flex-col flex-grow">
      <!-- Title -->
      <h3 class="font-semibold text-gray-900 text-md mb-2 line-clamp-2">
        {{ type }}
      </h3>

      <!-- Location -->
      <p class="text-sm text-gray-500 mb-3 flex items-center">
        <MapPinIcon class="h-3.5 w-3.5 text-red-500 mr-1 flex-shrink-0" />
        <span class="truncate">{{ location }}</span>
      </p>

      <!-- Author + Date -->
      <div class="flex items-center text-xs text-gray-500 mb-3">
        <span class="font-medium flex items-center">
          <PencilSquareIcon class="w-4 h-4 me-1 text-blue-500"/>
          {{ createdBy }}
        </span>
        <span class="mx-2">•</span>
        <span>{{ formattedDate }}</span>
      </div>

      <!-- Area and Price per sqm -->
      <div class="flex items-center justify-between mb-3 text-sm">
        <div class="flex items-center text-gray-700">
          <Square3Stack3DIcon class="h-4 w-4 text-blue-500 mr-1" />
          <span class="font-medium w-16">{{ area }} m²</span>
        </div>
        <div>
          <span v-if="price" class="text-sm text-red-500 font-bold">
            {{ formattedPrice }} {{ currency }}
          </span>
          <span v-if="price_string" class="text-sm text-red-500 font-bold mx-1">
            ({{ price_string }})
          </span>
        </div>
        <!-- <span v-if="pricePerSqm" class="text-xs text-red-500 font-medium">
         ( {{ pricePerSqm }}/m²)
        </span> -->
      </div>

      <!-- Contact Section - Fixed Layout -->
      <div class="mt-auto pt-2 border-t border-gray-100">
        <div class="flex items-start justify-between gap-3">
          <!-- Contact Info - with max width to prevent overflow -->
          <div class="flex-1 min-w-0 text-xs text-gray-600">
            <div class="font-medium text-sm flex items-center mb-1.5">
              <PhoneIcon class="w-4 h-4 me-1 text-blue-500 flex-shrink-0"/>
              <span class="truncate">{{ tel }}</span>
            </div>
            <div class="font-medium text-sm flex items-center">
              <EnvelopeIcon class="w-4 h-4 me-1 text-blue-500 flex-shrink-0"/>
              <span class="truncate">{{ email }}</span>
            </div>
          </div>
          
          <!-- Detail Button - Fixed width to prevent distortion -->
          <div class="flex-shrink-0">
            <button 
              @click="handleCardClick" 
              class="rounded-md py-1.5 px-3 font-medium text-blue-500 text-sm shadow-md border border-blue-500 hover:bg-blue-50 transition-colors whitespace-nowrap"
            >
              {{ $t("common.details") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Favorite button -->
    <div class="absolute top-3 right-3">
      <button
        @click.stop="addToFavorites"
        :class="[
          'shadow-md p-2 rounded-full transition-all duration-200 cursor-pointer',
          favoriteStore.isFavorite(props.id)
            ? 'bg-red-500 text-white'
            : 'bg-white/90 backdrop-blur-sm text-gray-500 hover:bg-red-100 hover:text-red-500'
        ]"
      >
        <HeartIcon class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import { 
  EyeIcon, 
  MapPinIcon, 
  Square3Stack3DIcon,
  PhotoIcon,
  HomeIcon,
  CalendarIcon,
  HeartIcon,
  PencilSquareIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/vue/24/outline'
import { useI18n } from "vue-i18n";
import { useFavoriteStore } from '../stores/favoriteStore'
import { addFavorite, removeFavorite, isFavorite } from "../utils/favorites";
const favoriteStore = useFavoriteStore()


const { locale, t } = useI18n();

const props = defineProps({
  id: String,
  type: String,
  area: [String, Number],
  village: String,
  district: String,
  province: String,
  price: [String, Number],
  price_string: [String],
  currency: String,
  description: String,
  viewCount: Number,
  profileImage: String,
  detailImages: {
    type: Array,
    default: () => []
  },
  mapLocation: String,
  tel: String,
  email: String,
  visibility: String,
  authorizationLevel: Number,
  createdBy: String,
  createdAt: String,
  defaultImage: {
    type: String,
    default: '/default-property.jpg'
  }
})

const emit = defineEmits(['view-details'])

const handleCardClick = () => {
  emit('view-details', props.id)
}

const addToFavorites = () => {
  favoriteStore.toggleFavorite(props.id)
}

// Handle location
const location = computed(() => {
  const parts = [props.village, props.district, props.province].filter(Boolean)
  return parts.join(', ')
})

// Price format
const formattedPrice = computed(() => {
  const num = Number(props.price)
  return isNaN(num) ? props.price : num.toLocaleString()
})

// Price per sqm
const pricePerSqm = computed(() => {
  if (!props.area || !props.price) return null
  const areaNum = Number(props.area)
  const priceNum = Number(props.price)
  if (isNaN(areaNum) || isNaN(priceNum) || areaNum === 0) return null
  return Math.round(priceNum / areaNum).toLocaleString() + ' ' + props.currency
})

// Date format
const formattedDate = computed(() => {
  if (!props.createdAt) return ''
  const date = new Date(props.createdAt)
  return isNaN(date.getTime()) ? props.createdAt : date.toLocaleDateString()
})

// Status badge color
const statusClass = computed(() => {
  switch (props.visibility?.toLowerCase()) {
    case 'public':
      return 'bg-green-100 text-green-800'
    case 'private':
      return 'bg-red-100 text-red-800'
    case 'all':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
})

// Handle image
const imageError = ref(false)
const handleImageError = () => {
  imageError.value = true
}
const displayedImageUrl = computed(() => {
  return imageError.value ? props.defaultImage : props.profileImage
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
