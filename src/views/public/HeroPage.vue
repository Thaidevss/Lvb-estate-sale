<template>
  <section class="relative w-full h-[50vh] overflow-hidden">
    <!-- Swiper Carousel Image Size Must Be 1920 × 1080 px -->
    <Swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :pagination="{ clickable: true }"
        navigation
        class="w-full h-full"
        >
        <SwiperSlide v-for="(image, index) in images" :key="index">
            <img :src="image" class="w-full h-[50vh] object-cover" />
        </SwiperSlide>
    </Swiper>


    <!-- Overlay Text -->
    <div
      class="absolute inset-0 flex items-center justify-center bg-black/40"
    >
      <h1 class="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
        Welcome to My Real Estate
      </h1>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; 

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "https://www.montgomeryhomes.com.au/wp-content/uploads/2025/01/2025_Promotion_70k_Diamond_Banner_Desktop.jpg", // modern house
  "https://www.montgomeryhomes.com.au/wp-content/uploads/2023/04/Trinity-286-Grande-Facade-Tag-1.jpg", // villa
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGSNmMjZu6w9b0svxvxaXlpSBi5yeMH5VVWA7i1iXIZkENc0vum2XE6urvbSX1ZcqE3A&usqp=CAU", // apartment
  "https://www.brightonhomes.net.au/sites/default/files/styles/acreage_home_image_style/public/2025-02/BH-Breakthrough-WebAssets-MegaMenu-930x522px-Feb25.jpg?itok=vFuV_l_M", // farmland
  "https://images.squarespace-cdn.com/content/v1/55535cb1e4b01193cdb89001/1620649756802-7L08M1XMOR53A8UVDDFJ/axiom_banner_why-land-promotion_heading.jpg?format=1500w"  // city building
];

</script>
