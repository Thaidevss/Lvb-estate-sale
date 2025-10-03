<template>
  <div class="min-h-screen bg-gray-50 relative z-10">
    <!-- Header Navigation -->
    <div class="bg-white shadow-sm sticky top-0 z-40">
      <div class="container mx-auto px-3 sm:px-4 py-3">
        <div class="flex items-center justify-between">
          <button 
            @click="goBack"
            class="flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
          >
            <ArrowLeftCircleIcon class="w-5 h-5 sm:w-6 sm:h-6 mr-1 sm:mr-2 group-hover:translate-x-[-2px] transition-transform" />
            <span class="font-medium text-sm sm:text-base">{{ $t('common.back') }}</span>
          </button>
          
          <div class="flex items-center space-x-2 sm:space-x-4">
            <div class="flex items-center text-gray-700">
              <ChartBarSquareIcon class="w-5 h-5 sm:w-6 sm:h-6 mr-1 sm:mr-2 text-blue-600"/>
              <h1 class="text-base sm:text-lg font-semibold truncate max-w-[120px] sm:max-w-none">{{ $t('app.property_details') }}</h1>
            </div>
          </div>
          
          <div class="flex items-center space-x-1 sm:space-x-3">
            <!-- <button class="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
              </svg>
            </button>
            <button class="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button> -->
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <!-- Loading State -->
      <div v-if="!property" class="flex justify-center items-center py-12 sm:py-20">
        <div class="text-center">
          <LoadingSpinner />
        </div>
      </div>

      <!-- Main Content -->
      <div v-else class="space-y-4 sm:space-y-6">
        <!-- Hero Section -->
        <div class="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
          <div class="flex flex-col lg:grid lg:grid-cols-5 gap-0">
            <!-- Image Gallery -->
            <div class="lg:col-span-3 relative">
              <ImageGallery :detailImages="propertyImages" class="h-[300px] sm:h-[400px] lg:h-[600px]" />
            </div>

            <!-- Property Info -->
            <div class="lg:col-span-2 p-4 sm:p-6 lg:p-8">
              <!-- Property Type & Status -->
              <div class="flex items-center justify-between mb-4 sm:mb-6">
                <span class="inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800">
                  {{ property.TYPE || 'Property' }}
                </span>
                <div class="flex items-center text-xs sm:text-sm text-green-500">
                  <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  {{ property.VIEW_COUNT || 0 }} views
                </div>
              </div>

              <!-- Price Section -->
              <div class="mb-6 sm:mb-8">
                <div class="flex items-center mb-1 sm:mb-2">
                  <CurrencyDollarIcon class="w-4 h-4 sm:w-8 sm:h-8 text-blue-600 mr-2 sm:mr-3" />
                  <span class="text-xl sm:text-md lg:text-xl font-bold text-gray-900">{{ formatPrice(property.PRICE) }}</span>
                  <span class="text-base sm:text-md lg:text-lg text-gray-600 ml-1 sm:ml-2">{{ property.CURRENCY }}</span>
                </div>
                <div class="text-md sm:text-md text-gray-600 flex items-center">
                  <CalculatorIcon class="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 mr-2 ms-1 sm:mr-3" />
                  {{ pricePerSqm }} / m²
                </div>
              </div>

              <!-- Location -->
              <div class="mb-6 sm:mb-8">
                <div class="flex items-start mb-2 sm:mb-3">
                  <MapPinIcon class="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0" />
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{{ $t('content.location') }}</h3>
                    <p class="text-gray-700 text-sm sm:text-base">
                      {{ property.VILLAGE }}, {{ property.DISTRICT }}
                      {{ property.PROVINCE }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Key Features -->
              <div class="mb-6 sm:mb-8">
                <h3 class="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">{{ $t('content.key_feature') }}</h3>
                <div class="space-y-2 sm:space-y-3">
                  <div class="flex items-center">
                    <Square3Stack3DIcon class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2 sm:mr-3" />
                    <span class="text-gray-700 text-sm sm:text-base">{{ property.AREA }} m² total area</span>
                  </div>
                  <div class="flex items-center">
                    <CurrencyDollarIcon class="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 sm:mr-3" />
                    <span class="text-gray-700 text-sm sm:text-base">{{ pricePerSqm }} / m²</span>
                  </div>
                </div>
              </div>

              <!-- Contact CTA -->
              <div class="space-y-2 sm:space-y-3">
                <a 
                    :href="`https://wa.me/${formatTel(property.CONTACT.TEL)}`"
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base"
                    >
                    <PhoneIcon class="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    {{ $t('common.contact_officer') }}
                </a>

                <!-- <button class="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-colors text-sm sm:text-base">
                  Schedule Viewing
                </button> -->
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed Information Tabs -->
        <div class="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
          <div class="border-b border-gray-200 overflow-x-auto">
            <nav class="flex min-w-max px-4 sm:px-6" aria-label="Tabs">
              <button 
                v-for="(tab, index) in tabs"
                :key="tab.id"
                @click="activeTab = index"
                :class="[
                  'py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors',
                  activeTab === index 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                <component :is="tab.icon" class="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
                {{ tab.name }}
              </button>
            </nav>
          </div>

          <div class="p-4 sm:p-6">
            <!-- Description Tab -->
            <div v-show="activeTab === 0" class="space-y-4 sm:space-y-6">
              <div>
                <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{{ $t('content.description') }}</h3>
                <div class="prose max-w-none">
                  <p class="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {{ property.DESCRIPTION || "No additional details provided." }}
                  </p>
                </div>
              </div>

              <!-- Property Details Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-gray-200">
                <div class="space-y-3 sm:space-y-4">
                  <h4 class="font-semibold text-gray-900 text-sm sm:text-base">{{ $t('content.property_detail') }}</h4>
                  <dl class="space-y-2 sm:space-y-3">
                    <div class="flex">
                      <dt class="text-gray-600 text-sm me-5">{{ $t('content.property_type') }}</dt>
                      <dd class="font-medium text-gray-900 text-sm">{{ property.TYPE }}</dd>
                    </div>
                    <div class="flex ">
                      <dt class="text-gray-600 text-sm me-5">{{ $t('content.total_area') }}</dt>
                      <dd class="font-medium text-gray-900 text-sm">{{ property.AREA }} m²</dd>
                    </div>
                    <div class="flex">
                      <dt class="text-gray-600 text-sm me-5">{{ $t('content.price_per') }}</dt>
                      <dd class="font-medium text-gray-900 text-sm">{{ pricePerSqm }}</dd>
                    </div>
                  </dl>
                </div>

                <div class="space-y-3 sm:space-y-4">
                  <h4 class="font-semibold text-gray-900 text-sm sm:text-base">{{ $t('content.location_detail') }}</h4>
                  <dl class="space-y-2 sm:space-y-3">
                    <div class="flex">
                      <dt class="text-gray-600 text-sm me-5">{{ $t('content.village') }}</dt>
                      <dd class="font-medium text-gray-900 text-sm">{{ property.VILLAGE }}</dd>
                    </div>
                    <div class="flex">
                      <dt class="text-gray-600 text-sm me-5">{{ $t('content.district') }}</dt>
                      <dd class="font-medium text-gray-900 text-sm">{{ property.DISTRICT }}</dd>
                    </div>
                    <div class="flex">
                      <dt class="text-gray-600 text-sm me-5">{{ $t('content.province') }}</dt>
                      <dd class="font-medium text-gray-900 text-sm">{{ property.PROVINCE }}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <!-- Location & Map Tab -->
            <div v-show="activeTab === 1" class="space-y-4 sm:space-y-6">
              <div>
                <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{{ $t('content.location_map') }}</h3>
                <div class="bg-gray-100 rounded-lg sm:rounded-xl overflow-hidden" style="height: 300px; sm:height: 400px;">
                  <template v-if="property?.MAP_LOCATION">
                    <iframe
                      :src="getEmbedUrl(property.MAP_LOCATION)"
                      width="100%"
                      height="100%"
                      style="border: 0"
                      allowfullscreen=""
                      loading="lazy"
                      class="rounded-lg sm:rounded-xl"
                    />
                  </template>
                  <template v-else>
                    <div class="flex items-center justify-center h-full text-gray-500">
                      <div class="text-center">
                        <MapIcon class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-400" />
                        <p class="text-sm sm:text-base">{{ $t('common.no_map_data') }}</p>
                      </div>
                    </div>
                  </template>
                </div>
                
                <div v-if="property?.MAP_LOCATION" class="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 sm:mt-4 gap-2 sm:gap-0">
                  <div class="text-xs sm:text-sm text-gray-600">
                    <MapPinIcon class="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                    {{ property.VILLAGE }}, {{ property.DISTRICT }}, {{ property.PROVINCE }}
                  </div>
                  <a 
                    :href="property.MAP_LOCATION" 
                    target="_blank" 
                    class="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium flex items-center"
                  >
                    {{ $t('common.view_map') }}
                    <svg class="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- Contact Tab -->
            <div v-show="activeTab === 2" class="space-y-4 sm:space-y-6">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <!-- Contact Information -->
                <div>
                  <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">{{ $t('content.contact_info') }}</h3>
                  <div v-if="property && property.CONTACT" class="space-y-3 sm:space-y-4">
                    <div class="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                      <div class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <PhoneIcon class="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      <div class="ml-3 sm:ml-4">
                        <p class="text-xs sm:text-sm font-medium text-gray-900">{{ $t('content.phone') }}</p>
                        <p class="text-base sm:text-lg text-gray-700 font-mono">{{ property.CONTACT.TEL }}</p>
                      </div>
                    </div>

                    <div class="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                      <div class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <EnvelopeIcon class="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                      </div>
                      <div class="ml-3 sm:ml-4">
                        <p class="text-xs sm:text-sm font-medium text-gray-900">{{ $t('content.email') }}</p>
                        <p class="text-base sm:text-lg text-gray-700">{{ property.CONTACT.EMAIL }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Contact Form -->
                <div>
                  <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">{{ $t('common.comments') }}</h3>
                  <form class="space-y-3 sm:space-y-4">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        class="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      >
                      <input
                        type="email"
                        placeholder="Your Email"
                        class="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      >
                    </div>
                    <input
                      type="tel"
                      placeholder="Your Phone"
                      class="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    >
                    <textarea
                      rows="4"
                      placeholder="Your message..."
                      class="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
                    ></textarea>
                    <button
                      type="submit"
                      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-colors text-sm sm:text-base"
                    >
                      {{ $t('common.add_comment') }}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Info -->
        <div class="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 gap-2 sm:gap-0">
            <div class="flex items-center">
              <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {{ $t('common.latest_update') }}: {{ formatDate(property?.UPDATED_AT) }}
            </div>
            <div class="flex items-center">
              <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              {{ property.VIEW_COUNT || 0 }} views
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ArrowLeftCircleIcon,
  CurrencyDollarIcon,
  Square3Stack3DIcon,
  MapPinIcon,
  InformationCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  MapIcon,
  ChartBarSquareIcon,
  CalculatorIcon
} from "@heroicons/vue/24/outline";
import { usePostStore } from "../../stores/indexStore";
import ImageGallery from "../../components/ImageGallery.vue";
import { getDetailImages } from "../../utils/getImage";
import LoadingSpinner from "../../components/common/Loading.vue";
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();
const postStore = usePostStore();
const route = useRoute();
const router = useRouter();

const property = ref(null);
const activeTab = ref(0);

// Tab configuration
const tabs = ref([
  { id: 'description', name: 'Description', icon: InformationCircleIcon },
  { id: 'location', name: 'Location & Map', icon: MapIcon },
  { id: 'contact', name: 'Contact', icon: ChatBubbleOvalLeftEllipsisIcon }
]);

const pricePerSqm = computed(() => {
  if (!property.value || property.value.PRICE === null || property.value.PRICE === undefined || 
      property.value.AREA === null || property.value.AREA === undefined) {
    return 'N/A';
  }
  
  const priceNum = typeof property.value.PRICE === 'string' 
    ? Number(property.value.PRICE.replace(/[^\d.]/g, '')) 
    : Number(property.value.PRICE);
  
  const areaNum = Number(property.value.AREA);
  
  if (isNaN(priceNum) || isNaN(areaNum) || areaNum === 0) return 'N/A';
  
  const pricePerSqm = Math.round(priceNum / areaNum);
  return pricePerSqm.toLocaleString() + ' ' + (property.value.CURRENCY || '');
});

const propertyImages = computed(() => {
  if (!property.value || !property.value.IMAGES) return [];
  return getDetailImages(property.value.IMAGES);
});

const formatPrice = (price) => {
  if (!price) return '0';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

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
    second: "2-digit",
    hour12: false,
  });
};

const getEmbedUrl = (url) => {
  if (!url) return "";
  try {
    new URL(url);
    const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (match) {
      const lat = match[1];
      const lng = match[2];
      return `https://www.google.com/maps?q=${lat},${lng}&hl=th&z=16&output=embed`;
    }
    return url.includes("google.com/maps") ? url : "";
  } catch (e) {
    return "";
  }
};

const goBack = () => {
  router.go(-1);
};

function formatTel(tel) {
  if (!tel) return "";

  let cleanTel = tel.replace(/\D/g, "");

  if (cleanTel.startsWith("020")) {
    return "856" + cleanTel.substring(1);
  }

  if (cleanTel.length === 8) {
    return "85620" + cleanTel;
  }

  if (cleanTel.startsWith("856")) {
    return cleanTel;
  }

  if (cleanTel.startsWith("856")) {
    return cleanTel;
  }

  return "";
}


onMounted(async () => {
  try {
    await postStore.fetchPosts();
    const postId = route.query.id;
    property.value = postStore.posts.find(
      (post) => String(post.id) === String(postId)
    );
  } catch (error) {
    console.error('Error loading property:', error);
  }
});
</script>

<style scoped>
.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 1rem;
}

/* Ensure horizontal scrolling for tabs on mobile */
.min-w-max {
  min-width: max-content;
}
</style>