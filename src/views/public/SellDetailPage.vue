<template>
  <div class="container mx-auto p-4 min-h-screen bg-gray-50 ">
    <div class="flex justify-between mb-8">
      <div
        class="flex items-center border border-blue-900 w-20 rounded px-2 py-0.5 text-blue-900 text-sm hover:cursor-pointer"
      >
        <ArrowLeftCircleIcon class="w-5 h-5" />
        <button class="text-sm">
          <router-link to="/"> ກັບຄືນ </router-link>
        </button>
      </div>

      <div>
        <h2 class="text-md font-bold text-blue-900 text-center flex items-center">
          <ChartBarSquareIcon class="h-8 w-8 me-1"/>
          ລາຍລະອຽດຂອງຊັບສິນ
        </h2>
      </div>
      <div></div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
      <div class="lg:col-span-2 shadow-lg rounded-lg overflow-hidden ">
        <ImageGallery :detailImages="propertyImages" />
      </div>

      <div v-if="property" class="lg:col-span-2 space-y-4">
        <div class="bg-white rounded-lg shadow-md p-6">
         <div class="flex justify-center">
           <h2 class="text-md text-center font-bold text-blue-900 mb-4 flex items-center"><NewspaperIcon class="h-7 w-7 me-1"/>ຂໍ້ມູນຊັບສິນ</h2>
         </div>
          <div class="mb-4">
            <p class="font-bold text-lg text-blue-800 flex items-center mb-1 font-english">
              <CurrencyDollarIcon class="w-8 h-8 me-2 flex-shrink-0" />
              <span class="truncate"
                >{{ property.PRICE }} {{ property.CURRENCY }}</span
              >
            </p>
            <p class="text-sm text-gray-600 ms-9">(ມູນຄ່າທັງໝົດ)</p>
          </div>

          <div class="border-t border-gray-200 pt-4 mt-4">
            <p class="text-sm text-gray-700 flex items-center mb-2">
              <CurrencyDollarIcon class="w-5 h-5 me-2 flex-shrink-0 " />
              ລາຄາຕໍ່ຕາແມັດ:
              <span class="font-semibold ms-2 font-english"
                >{{ property.PRICE_PER_SQM || "Null" }} / m²</span
              >
            </p>
            <p class="text-sm text-gray-700 flex items-center mb-2">
              <Square3Stack3DIcon class="h-5 w-5 me-2 flex-shrink-0" />
              ເນື້ອທີ່:
              <span class="font-semibold ms-2 font-english">{{ property.AREA }} <span>m²</span></span>
            </p>
            <p class="text-sm text-gray-700 flex items-center">
              <MapPinIcon class="h-5 w-5 me-2 flex-shrink-0" />
              <span class="truncate">
                ບ້ານ {{ property.VILLAGE }}, ເມືອງ {{ property.DISTRICT }}, ແຂວງ
                {{ property.PROVINCE }}
              </span>
            </p>
          </div>
          <p class="text-xs text-gray-500 mt-4 text-end">
            ອັບເດດຫຼ້າສຸດ: {{ formatDate(property?.UPDATED_AT) }}
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h3
            class="text-sm font-semibold text-blue-900 mb-3 flex items-center"
          >
            <InformationCircleIcon
              class="h-7 w-7 me-1 text-blue-900 flex-shrink-0"
            />
            ລາຍລະອຽດ
          </h3>
          <p class="text-sm text-gray-700 leading-relaxed">
            {{ property.DESCRIPTION || "ບໍ່ມີລາຍລະອຽດເພີ່ມເຕີມ." }}
          </p>
          <p class="text-xs text-gray-500 mt-4 text-end">
            ອັບເດດຫຼ້າສຸດ: {{ formatDate(property?.UPDATED_AT) }}
          </p>
        </div>

        
      </div>

      <div
        v-else
        class="flex justify-center items-center py-12 rounded-lg shadow-md lg:col-span-2 bg-white"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"
        ></div>
        <p class="ms-4 text-gray-600">ກຳລັງໂຫຼດຂໍ້ມູນ...</p>
      </div>
    </div>

    <!-- Section: Comment + Google Map -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
      <!-- Send Comment: 2 columns -->
      <div class="lg:col-span-2  rounded-lg shadow p-4">
        <div class="bg-white rounded-lg shadow-md px-6 py-4 mb-5">
          <h3 class="text-sm font-semibold text-blue-900 mb-3 flex items-center">
            <ChatBubbleOvalLeftEllipsisIcon class="w-7 h-7 me-1"/>
            ຕິດຕໍ່ພະນັກງານຮັບຜິດຊອບ
          </h3>
          <div v-if="property && property.CONTACT" class="font-english">
            <p class="flex text-sm my-3 ms-3"><PhoneIcon class="w-6 h-6 me-2 text-green-600 flex-shrink-0" /> {{ property.CONTACT.TEL }}</p>
            <p class="flex text-sm ms-3"><EnvelopeIcon class="w-6 h-6 me-2 text-red-600 flex-shrink-0" /> {{ property.CONTACT.EMAIL }}</p>
          </div>
          <p class="text-xs text-gray-500 mt-4 text-end">
            ອັບເດດຫຼ້າສຸດ: {{ formatDate(property?.UPDATED_AT) }}
          </p>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-blue-900 font-semibold text-sm mb-2 flex items-center"><FlagIcon class="w-8 h-8 me-1"/>ຄຳຄິດເຫັນ</h3>
            <textarea
              rows="4"
              placeholder="ຄໍາຄິດເຫັນຂອງທ່ານ..."
              class="w-full h-20 p-2 text-sm border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              class="bg-blue-600 text-white text-xs px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              ເພີ່ມຄຳຄິດເຫັນ
            </button>
        </div>
        
      </div>

      <!-- Google Maps: 2 columns -->
      <div class="lg:col-span-2 bg-white rounded-lg shadow p-4">
        <h3 class="text-blue-900 font-semibold text-sm mb-2 flex items-center"><MapIcon class="w-7 h-7 me-1"/>Google Maps</h3>
        <div
          class="h-72 mb-2 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center"
        >
          <template v-if="property?.MAP_LOCATION">
            <iframe
              :src="getEmbedUrl(property.MAP_LOCATION)"
              width="100%"
              height="400"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
            />
          </template>
          <template v-else>
            <div class="text-center p-4 text-gray-500">
              <p>ບໍ່ມີຂໍ້ມູນແຜນທີ່</p>
              <p class="text-xs mt-2">No map data available</p>
            </div>
          </template>
        </div>
        <div
          v-if="property?.MAP_LOCATION"
          class="flex justify-between items-center text-sm text-blue-600"
        >
          <a :href="property.MAP_LOCATION" target="_blank" class="underline"
            >ເບິ່ງແຜນທີ່</a
          >
          <!-- <button @click="copyMapUrl" class="hover:underline flex items-center underline">
            <ClipboardDocumentIcon class="w-5 h-5 me-1"/>
            Copy Link
          </button> -->
        </div>
          <p class="text-xs text-gray-500 mt-4 text-start">
            ອັບເດດຫຼ້າສຸດ: {{ formatDate(property?.UPDATED_AT) }}
          </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import {
  ArrowLeftCircleIcon,
  CurrencyDollarIcon,
  Square3Stack3DIcon,
  MapPinIcon,
  InformationCircleIcon,
  PhoneIcon,
  ClipboardDocumentIcon,
  EnvelopeIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  MapIcon, FlagIcon, ChartBarSquareIcon, CubeIcon, NewspaperIcon
} from "@heroicons/vue/24/outline";
import { usePostStore } from "../../stores/indexStore";
import ImageGallery from "../../components/ImageGallery.vue";
// import { getAllImages } from '../../utils/getImage'
import { getDetailImages } from "../../utils/getImage";
import LoadingSpinner from "../../components/common/Loading.vue";

const postStore = usePostStore();
const route = useRoute();

const property = ref(null);

onMounted(async () => {
  try {
    await postStore.fetchPosts();
    console.log("✅ All posts:", postStore.posts);

    const postId = route.query.id;
    console.log("✅ Post ID from URL:", postId);

    property.value = postStore.posts.find(
      (post) => String(post.id) === String(postId)
    );
    console.log("✅ Found property:", property.value);

    if (!property.value) {
      console.warn("⚠️ Post not found for ID:", postId);
    }
  } catch (error) {
    console.error("❌ Error loading post:", error);
  }
});

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

// คำนวณ propertyImages จาก property.IMAGES
const propertyImages = computed(() => {
  if (!property.value || !property.value.IMAGES) return [];
  // return getAllImages(property.value.IMAGES);
  return getDetailImages(property.value.IMAGES);
});

const copyMapUrl = async () => {
  try {
    await navigator.clipboard.writeText(property.value?.MAP_LOCATION || "");
    // alert("ຄັດລອກລິ້ງແຜນທີ່ແລ້ວ");
  } catch (err) {
    // alert("ຄັດລອກບໍ່ສຳເລັດ");
  }
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
</script>

<style scoped></style>
