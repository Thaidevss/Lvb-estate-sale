<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div
      class="bg-white rounded-xl shadow-2xl w-[95vw] max-h-[95vh] overflow-hidden flex flex-col"
    >
      <!-- ปุ่มปิด -->
      <button
        class="absolute top-12 right-18 text-white hover:text-red-500 transition text-xl z-20"
        @click="$emit('close')"
      >
        ✕
      </button>

      <!-- Header -->
      <div
        class="relative bg-gradient-to-r from-indigo-800 to-indigo-600 py-3 px-4 text-white flex justify-between items-start sticky top-0 z-10"
      >
        <div>
          <h2 class="text-md font-bold">
            {{ land.LAND_DETAILS?.TYPE }} - {{ land.LAND_DETAILS?.PROVINCE }}
          </h2>
          <div class="text-sm text-indigo-200 flex flex-wrap gap-4 mt-1">
            <span>📌  {{ $t('modal.added_by') }}: {{ land.CREATED_BY }}</span>
            <span>🗓 {{ new Date(land.CREATED_AT).toLocaleDateString() }}</span>
            <span>👀 {{ land.LAND_DETAILS?.VIEW_COUNT }} view</span>
          </div>
        </div>

        <!-- Status Badge -->
        <!-- <div>
          <span
            :class="statusClass(land.STATUS?.VISIBILITY)"
            class="px-3 py-1 rounded-full text-xs font-semibold shadow"
          >
            {{ land.STATUS?.VISIBILITY || 'UNKNOWN' }}
          </span>
        </div> -->
      </div>

      <!-- Body -->
      <div class="flex flex-col lg:flex-row flex-grow overflow-y-auto">
        <!-- Left: Image + Map -->
        <div class="lg:w-1/2 p-5 space-y-6 mb-5">
          <!-- Main Image -->
          <div class="rounded-xl overflow-hidden shadow-lg">
            <img
              :src="getProfileImageUrl(land.LAND_DETAILS?.IMAGES)"
              class="w-full h-80 object-cover hover:scale-105 transition-transform"
              alt="Profile"
            />
          </div>

          <!-- Gallery -->
          <div class="grid grid-cols-3 gap-3">
            <div
              v-for="(img, i) in getDetailImages(land.LAND_DETAILS?.IMAGES)"
              :key="i"
              class="overflow-hidden rounded-xl border border-gray-300 hover:shadow-md transition"
            >
              <img
                :src="img"
                class="w-full h-24 object-cover hover:scale-105 transition-transform"
                alt="Detail"
              />
            </div>
          </div>

          <!-- Map -->
            <div class="bg-gray-50 rounded-2xl p-4 shadow border border-gray-200">
                <h3 class="text-sm font-semibold text-blue-500 mb-2 flex items-center"><MapIcon class="w-6 h-6 text-blue-600"/>  {{ $t('modal.map_location') }}</h3>
                <template v-if="land?.MAP_LOCATION">
                    <iframe
                    :src="getEmbedUrl(land?.MAP_LOCATION)"
                    width="100%"
                    height="400"
                    style="border: 0"
                    allowfullscreen=""
                    loading="lazy"
                    />
                </template>
                <template>
                    <p> {{ $t('modal.map_not_available') }}</p>
                </template>
                <p class="text-xs text-gray-500 mt-1 text-center">
                     {{ $t('modal.location') }}: {{ land.LAND_DETAILS?.MAP_LOCATION || land.LAND_DETAILS?.PROVINCE || 'ບໍ່ມີຂໍ້ມູນ' }}
                </p>
            </div>
        </div>

        <!-- Right: Details -->
        <div class="lg:w-1/2 p-6 space-y-6">
          <!-- Basic Info -->
          <div class="bg-white p-5 rounded-xl shadow border border-gray-200">
            <h3 class="text-lg font-semibold text-blue-500 mb-3 flex items-center">
              <NewspaperIcon class="w-6 h-6 text-blue-500"/>  {{ $t('app.property_details') }}
            </h3>
            <div class="grid grid-cols-2 gap-y-3 text-sm">
              <p><strong> {{ $t('filters.village') }}:</strong> {{ land.LAND_DETAILS?.VILLAGE }}</p>
              <p><strong>{{ $t('filters.district') }}:</strong> {{ land.LAND_DETAILS?.DISTRICT }}</p>
              <p><strong>{{ $t('filters.province') }}:</strong> {{ land.LAND_DETAILS?.PROVINCE }}</p>
              <p><strong>{{ $t('modal.area') }}:</strong> {{ land.LAND_DETAILS?.AREA }} (m²)</p>
              <p>
                <strong> {{ $t('modal.price') }}:</strong>
                {{ land.LAND_DETAILS?.PRICE.toLocaleString() }}
                {{ land.LAND_DETAILS?.CURRENCY }}
              </p>
              <p><strong> {{ $t('modal.type') }}:</strong> {{ land.LAND_DETAILS?.TYPE }}</p>
              <div class="flex"><strong class="me-2"> {{ $t('modal.status') }}:</strong>
                <div class="flex space-x-1 items-center">
                    <p v-if="land.LAND_DETAILS?.STATUS.AUTHORIZATION_LEVEL === 0" class="text-[12px] py-1 px-2 bg-yellow-500 text-white rounded-full shadow">ລໍຖ້າອະນຸມັດ</p>
                    <p v-else-if="land.LAND_DETAILS?.STATUS.AUTHORIZATION_LEVEL === 1" class="text-[12px] py-1 px-2 bg-green-600 text-white rounded-full shadow">ພ້ອມຂາຍ</p>
                    <p v-else-if="land.LAND_DETAILS?.STATUS.AUTHORIZATION_LEVEL === 2" class="text-[12px] py-1 px-2 bg-red-600 text-white rounded-full shadow">ປິດການຂາຍ</p>
                    <p v-else class="text-[11px] py-0.5 px-2 bg-gray-500 text-white rounded-full shadow">ບໍ່ຮູ້ສະຖານະ</p>
               </div>
              </div>
              <div class="flex"><strong class="me-2"> {{ $t('property.visibility') }}:</strong>
                <div class="flex space-x-1 items-center">
                    <span 
                        :class="{
                        'bg-green-100 text-green-800 border border-green-600': land.LAND_DETAILS?.STATUS.VISIBILITY === 'PRIVATE',
                        'bg-blue-100 text-blue-800 border border-blue-600': land.LAND_DETAILS?.STATUS.VISIBILITY === 'PUBLIC',
                        'bg-gray-100 text-gray-800 border border-gray-600': land.LAND_DETAILS?.STATUS.VISIBILITY
                        }" 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    >
                        {{ land.LAND_DETAILS.STATUS?.VISIBILITY ?? 'N/A' }}
                    </span>
               </div>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-white p-5 rounded-xl shadow border border-gray-200">
            <h4 class="font-semibold text-blue-500 mb-2 flex items-center"><InformationCircleIcon class="w-6 h-6 text-blue-500"/>  {{ $t('property.description') }}</h4>
            <p class="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
              {{ land.LAND_DETAILS?.DESCRIPTION }}
            </p>
          </div>

          <!-- Contact -->
          <div class="bg-white p-5 rounded-xl border border-gray-200">
            <h4 class="font-semibold text-blue-500 mb-3 flex items-center"><UserCircleIcon class="w-6 h-6 text-blue-500"/>  {{ $t('property.contact') }}</h4>
            <div class="space-y-2 text-sm text-gray-700">
              <p class="flex items-center"><PhoneIcon class="w-5 h-5 me-1"/> {{ land.LAND_DETAILS?.CONTACT?.TEL || "-" }}</p>
              <p class="flex items-center"><EnvelopeIcon class="w-5 h-5 me-1"/> {{ land.LAND_DETAILS?.CONTACT?.EMAIL || "-" }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="border-t bg-gray-50 px-6 py-3 text-xs text-gray-600 flex flex-col sm:flex-row sm:justify-between gap-2"
      >
        <span>⏰ Updated at: {{ new Date(land.UPDATED_AT).toLocaleString() }}</span>
        <span>✍️ Updated by: {{ land.UPDATED_BY }}</span>
        <span>✅ Approved by: {{ land.APPROVED_BY }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getProfileImageUrl, getDetailImages } from "../../utils/getImage";
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapIcon,
  NewspaperIcon,
  InformationCircleIcon
} from "@heroicons/vue/24/outline";

import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

const props = defineProps({
  land: { type: Object, required: true },
});

// ฟังก์ชันสำหรับสีสถานะ
const statusClass = (status) => {
  switch (status) {
    case "AUTHORIZED":
      return "bg-green-100 text-green-700 border border-green-300";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    case "DISABLED":
      return "bg-red-100 text-red-700 border border-red-300";
    case "PRIVATE":
      return "bg-gray-200 text-gray-700 border border-gray-300";
    default:
      return "bg-gray-100 text-gray-500 border border-gray-200";
  }
};

// เพิ่มฟังก์ชัน getEmbedUrl ในส่วน script
// const getEmbedUrl = (url) => {
//   if (!url) return "about:blank";
  
//   try {
//     new URL(url);
//     const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
//     if (match) {
//       const lat = match[1];
//       const lng = match[2];
//       return `https://www.google.com/maps?q=${lat},${lng}&hl=la&z=16&output=embed`;
//     }
//     return url.includes("google.com/maps") ? url.replace('https://www.google.com/maps', 'https://www.google.com/maps/embed') : "";
//   } catch (e) {
//     // หากไม่ใช่ URL ที่ถูกต้อง ให้ใช้การค้นหาด้วยข้อความ
//     return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(url)}`;
//   }
// };

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
</script>
