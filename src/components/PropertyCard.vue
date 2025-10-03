<template>
  <div
    class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden border border-gray-100 hover:cursor-pointer"
    @click="handleCardClick"
  >
    <!-- Badges -->
    <div class="absolute top-3 left-3 flex space-x-2 z-10">
      <span
        :class="statusClass"
        class="px-2 py-1 text-xs font-medium rounded-full"
      >
        {{ $t(`modal.authorization_approved`) }}
      </span>
      <span
        v-if="type"
        class="bg-indigo-100 text-indigo-700 px-2 py-1 text-xs font-medium rounded-full"
      >
        {{ type }}
      </span>
    </div>

    <!-- Image -->
    <div class="relative">
      <img
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
      <h3 class="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
        {{ type }}
      </h3>

      <!-- Location -->
      <p class="text-xs text-gray-500 mb-1 flex items-center">
        <MapPinIcon class="h-3.5 w-3.5 text-red-500 mr-1 flex-shrink-0" />
        <span class="truncate">{{ location }}</span>
      </p>

      <!-- Author + Date -->
      <div class="flex items-center text-xs text-gray-500 mb-1">
        <span class="font-medium">{{ createdBy }}</span>
        <span class="mx-2">•</span>
        <span>{{ formattedDate }}</span>
      </div>

      <!-- Price -->
      <div class="text-emerald-600 text-sm font-semibold py-1 rounded-full z-10">
        {{ formattedPrice }} {{ currency }}
        <span v-if="pricePerSqm" class="text-xs text-gray-500 ml-1">
          ({{ pricePerSqm }}/m²)
        </span>
      </div>

      <!-- Features -->
      <div
        class="flex justify-between pt-2 mt-auto border-t border-gray-100 text-gray-700 text-xs"
      >
        <div class="flex items-center">
          <Square3Stack3DIcon class="h-4 w-4 text-blue-500 mr-1" />
          <span>{{ area }} m²</span>
        </div>
        <div v-if="viewCount" class="flex items-center">
          <EyeIcon class="h-4 w-4 text-blue-500 mr-1" />
          <span>{{ viewCount }} views</span>
        </div>
      </div>

      <!-- Contact -->
      <div class="mt-2 text-xs text-gray-600">
        <p v-if="tel"><strong>Tel:</strong> {{ tel }}</p>
        <p v-if="email"><strong>Email:</strong> {{ email }}</p>
      </div>
    </div>

    <!-- Favorite button -->
    <div class="absolute top-3 right-3">
      <button
        @click="addToFavorites"
        class="shadow p-2 bg-white/90 rounded-full text-gray-500 hover:text-red-500 transition"
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
  HeartIcon
} from '@heroicons/vue/24/outline'
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n();

const props = defineProps({
  id: String,
  type: String,
  area: [String, Number],
  village: String,
  district: String,
  province: String,
  price: [String, Number],
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
  console.log('Add to favorites:', props.id)
  
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
