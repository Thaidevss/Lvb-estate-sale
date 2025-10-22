<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">

      <!-- Header -->
      <div class="mb-8">
        <button 
          @click="goBack"
          class="flex items-center border border-blue-900 w-25 rounded px-2 py-1 text-blue-900 text-sm hover:cursor-pointer"
        >
          <ArrowLeftCircleIcon class="w-5 h-5 me-1" />
          <p class="text-sm cursor-pointer">{{ $t('common.back') }}</p>
        </button>
        <h1 class="text-xl text-center font-bold text-blue-900 mb-2">{{ $t('favorite.title') }}</h1>
      </div>

      <transition name="fade">
        <div
          v-if="showSuccess"
          class="flex items-center p-4 mb-6 text-sm text-white rounded-lg bg-green-800 border border-green-200 shadow-sm"
          role="alert"
        >
          <svg class="shrink-0 inline w-5 h-5 me-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm-1 14.207L5.793 11.5 7.207 10.086 9 11.879l3.793-3.793L14.207 9.5 9 14.707Z"
            />
          </svg>
          <div>
            <span class="font-medium">Success!</span> Your favorites list has been deleted.
          </div>
        </div>
      </transition>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <LoadSpiner />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-500 text-lg mb-4">Error: {{ error }}</div>
        <button 
          @click="loadFavorites"
          class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try again
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="favoriteProperties.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">{{ $t('favorite.empty_favorite') }}</h3>
      </div>

      <!-- Favorite Properties Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <PropertyCard
          v-for="item in favoriteProperties"
          :key="item.id"
          :id="item.id || item._id"
          :type="item.TYPE"
          :area="item.AREA"
          :village="item.VILLAGE"
          :district="item.DISTRICT"
          :province="item.PROVINCE"
          :price="item.PRICE"
          :currency="item.CURRENCY"
          :description="item.DESCRIPTION"
          :view-count="item.VIEW_COUNT"
          :profile-image="getProfileImageUrl(item.IMAGES)"
          :detail-images="item.IMAGES?.DETAILS_IMAGE || []"
          :map-location="item.MAP_LOCATION"
          :tel="item.CONTACT?.TEL"
          :email="item.CONTACT?.EMAIL"
          :visibility="item.STATUS?.VISIBILITY"
          :authorization-level="item.STATUS?.AUTHORIZATION_LEVEL"
          :created-by="item.CREATED_BY"
          :created-at="item.CREATED_AT"
          @view-details="viewDetails"
        />
      </div>

      <!-- Clear Favorites Button -->
      <div v-if="favoriteProperties.length > 0" class="mt-8 text-center">
        <button
          @click="clearAllFavorites"
          class="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          {{ $t('favorite.delete_all') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import PropertyCard from '../../components/PropertyCard.vue'
import { usePostStore } from '../../stores/indexStore'
import { useFavoriteStore } from '../../stores/favoriteStore'
import { getProfileImageUrl } from "../../utils/getImage";
import LoadSpiner from '../../components/common/Loading.vue'
import { useI18n } from "vue-i18n";
import { ArrowLeftCircleIcon } from "@heroicons/vue/24/outline";

const { t } = useI18n();
const router = useRouter();
const postStore = usePostStore();
const favoriteStore = useFavoriteStore();

const loading = ref(false);
const error = ref(null);
const showSuccess = ref(false);

const goBack = () => router.go(-1);

const favoriteIds = computed(() => favoriteStore.favorites);

const favoriteProperties = computed(() =>
  postStore.posts.filter(post =>
    favoriteIds.value.includes(post.id) ||
    favoriteIds.value.includes(post._id) ||
    favoriteIds.value.includes(post.ID)
  )
);

const loadFavorites = async () => {
  try {
    loading.value = true;
    error.value = null;
    await postStore.fetchPosts();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const viewDetails = async (id) => {
  try {
    await postStore.viewCountDetail(id);
    router.push(`/public_detail?id=${id}`);
  } catch (error) {}
};

// ✅ ปรับตรงนี้แทน confirm
const clearAllFavorites = () => {
  favoriteStore.clearFavorites();
  loadFavorites();
  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000);
};

onMounted(loadFavorites);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
