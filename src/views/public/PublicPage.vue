<template>
  <div class="relative z-10 min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="relative text-white py-13 md:py-24">
      <!-- Background Image -->
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{
          backgroundImage: `url(${heroBg})`
        }"
      ></div>

      <!-- Gradient Overlay -->
      <!-- <div
        class="absolute inset-0 bg-gradient-to-r from-blue-900 to-teal-700 opacity-30"
      ></div> -->
      <div
        class="absolute inset-0 bg-gradient-to-r"
      ></div>

      <!-- <div class="absolute inset-0 bg-black opacity-20"></div> -->

      <!-- Content -->
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
           <h1 class="text-4xl md:text-5xl font-bold mb-6">
            <!-- <span>{{ displayedText }}</span> -->
            <!-- <span class="blinking-cursor">|</span> -->
            {{ $t("hero.head_title") }}
          </h1>
          <p class="text-xl mb-10 animate-bounce-smooth">
            {{ $t("hero.sub_title") }}
          </p>

          <!-- Search Box -->
          <div class="bg-gray-500/50 rounded-2xl shadow-xl p-4 mb-12 py-10 px-10">
            <div>
              <h2 class="text-2xl font-semibold mb-4 ">
                {{ $t("app.property_search") }}
              </h2>
            </div>
            <div class="flex flex-col md:flex-row items-center">
              <div
                class="w-full sm:w-full md:w-auto flex-grow relative mb-4 md:mb-0 md:mr-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 absolute left-3 top-3.5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  v-model="heroSearchQuery"
                  @keypress="handleHeroSearchKeypress"
                  placeholder="Enter the location you want to find..."
                  class="w-full pl-10 pr-4 py-3 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
              </div>
              <button
                @click="performHeroSearch"
                class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-colors w-full md:w-auto"
              >
                {{ $t("hero.search") }}
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label
                  class="block text-sm text-center font-medium text-white mb-1"
                  >{{ $t("hero.type") }}</label
                >
                <!-- <select
                  v-model="heroPropertyType"
                  class="w-full px-4 py-2.5 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                  <option value="">{{ $t("hero.type") }}</option>
                  <option
                    v-for="type in locationStore.types"
                    :key="type.id"
                    :value="type.TYPE"
                  >
                    {{ type.TYPE }}
                  </option>
                </select> -->
                <select
                  v-model="heroPropertyType"
                  class="w-full px-4 py-2.5 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                  <option value="">{{ $t("hero.type") }}</option>
                  <option
                    v-for="type in translatedTypes"
                    :key="type.id"
                    :value="type.ORIGINAL_TYPE" 
                  >
                    {{ type.TYPE }}
                  </option>
                </select>
              </div>
              <div>
                <label
                  class="block text-sm text-center font-medium text-white mb-1"
                  >{{ $t("hero.price") }}</label
                >
                <select
                  v-model="heroPriceRange"
                  class="w-full px-4 py-2.5 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                  <option value="">{{ $t("hero.price") }}</option>
                  <option
                    v-for="range in heroRanges"
                    :key="range.label"
                    :value="range"
                  >
                    {{ range.label }}
                  </option>
                </select>
              </div>
              <div>
                <label
                  class="block text-sm text-center font-medium text-white mb-1"
                  >{{ $t("hero.area") }}</label
                >
                <select
                  v-model="heroAreaRange"
                  class="w-full px-4 py-2.5 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                  <option value="">{{ $t("hero.area") }}</option>
                  <option
                    v-for="area in heroAreaRanges"
                    :key="area.label"
                    :value="area"
                  >
                    {{ area.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Tabs -->
          <!-- <div class="flex justify-center space-x-4">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              :class="[
                'px-6 py-3 rounded-full font-semibold transition-colors',
                activeTab === index
                  ? 'bg-white text-blue-800'
                  : 'bg-blue-800 text-white hover:bg-blue-700',
              ]"
              @click="activeTab = index"
            >
              {{ tab }}
            </button>
          </div> -->
        </div>
      </div>
    </section>
    
    <!-- Stats Section -->
    <!-- <section class="hero-section py-16 bg-cover bg-center bg-no-repeat relative">

    </section> -->

    <!-- Featured Properties Section -->
<section class="py-16 bg-gray-50 hero-section">
  <div class="container mx-auto px-4">
    <h2 class="text-xl font-bold text-white mb-6 text-center">
      {{ $t("content.feature_properties") }}
    </h2>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <LoadingSpinner />
    </div>

    <!-- Empty State -->
    <div
      v-else-if="featuredProperties.length === 0"
      class="text-center py-12"
    >
      <div class="text-gray-200 mb-4">
        <svg
          class="mx-auto h-16 w-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V9a2 2 0 012 2v0"
          />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-white">
        No properties found
      </h3>
      <p class="text-gray-200">
        Try adjusting your filters to see more results.
      </p>
    </div>

    <!-- Slider Wrapper -->
    <div v-else class="relative w-full mx-auto">
      <!-- Scroll Buttons -->
      <button
        @click="scrollLeft"
        :disabled="!canScrollLeft"
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-20 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        :class="{ 'hover:scale-110': canScrollLeft }"
      >
        <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <button
        @click="scrollRight"
        :disabled="!canScrollRight"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-20 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        :class="{ 'hover:scale-110': canScrollRight }"
      >
        <svg class="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Scrollable Container -->
      <div
        ref="sliderRef"
        @scroll="updateScrollButtons"
        class="flex gap-4 overflow-x-auto scroll-smooth pb-4 px-2"
        style="scrollbar-width: none; -ms-overflow-style: none"
      >
        <div
          v-for="item in featuredProperties"
          :key="item.id || item._id"
          class="flex-shrink-0"
          style="width: 320px; min-width: 320px;"
        >
          <PropertyCard
            :id="item.id || item._id"
            :type="item.TYPE"
            :area="item.AREA"
            :village="item.VILLAGE"
            :district="item.DISTRICT"
            :province="item.PROVINCE"
            :price="item.PRICE"
            :price_string="item.PRICE_STRING"
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
            class="h-full"
            @view-details="viewDetails"
          />
        </div>
      </div>
    </div>
  </div>
</section>

    <!-- Properties Section -->
    <section class="bg-gray-100" data-section="properties">
      <div class="container mx-auto px-4 h-auto mt-40">
        <section class="py-5 bg-gray-50">
          <div class="container mx-auto px-4">
            <h2 class="text-xl font-bold text-gray-800 mb-8 mt-20 text-center">
              {{ $t("content.properties") }}
            </h2>

            <!-- Filter Tabs -->
            <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div
                class="flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              >
                <!-- Tabs -->
                <div
                  class="flex items-center gap-2 overflow-x-auto scrollbar-hide"
                >
                  <button
                    v-for="(tab, idx) in filterTabs"
                    :key="tab"
                    @click="activeFilterTab = idx"
                    :class="[
                      'whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all',
                      activeFilterTab === idx
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                    ]"
                  >
                    {{ tab }}
                  </button>
                </div>

                <!-- Result + Reset -->
                <div class="flex items-center gap-3">
                  <!-- <div class="text-sm text-gray-500">
                Showing <span class="font-semibold text-gray-700">{{ filteredProperties.length }}</span> results
              </div> -->
                  <button
                    @click="resetAllFilters"
                    class="text-sm px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    <!-- Reset all -->
                    {{ $t("filter_tab.reset_all") }}
                  </button>
                </div>
              </div>

              <!-- Filter Panels -->
              <div class="mt-4">
                <!-- All Filters -->
                <div
                  v-show="activeFilterTab === 0"
                  class="grid grid-cols-1 md:grid-cols-4 gap-3"
                >
                  <div>
                    <label class="block text-sm text-gray-600 mb-1"
                      >{{ $t("filter_tab.property_type") }}</label
                    >
                    <!-- <select
                      v-model="filterType"
                      @change="applyTabFilters"
                      class="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">{{ $t("filter_tab.all_type") }}</option>
                      <option
                        v-for="type in locationStore.types"
                        :key="type.id"
                        :value="type.TYPE"
                      >
                        {{ type.TYPE }}
                      </option>
                    </select> -->
                    <select
                      v-model="filterType"
                      @change="applyTabFilters"
                      class="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">{{ $t("filter_tab.all_type") }}</option>
                      <option
                        v-for="type in translatedTypes"
                        :key="type.id"
                        :value="type.ORIGINAL_TYPE"
                      >
                        {{ type.TYPE }} <!-- ใช้ค่าที่แปลแล้วสำหรับแสดง -->
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm text-gray-600 mb-1"
                      >{{ $t("filter_tab.province") }}</label
                    >
                    <select
                      v-model="filterProvince"
                      @change="applyTabFilters"
                      class="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">{{ $t("filter_tab.all_province") }}</option>
                      <option
                        v-for="province in locationStore.provinces"
                        :key="province.id"
                        :value="province.name"
                      >
                        {{ province.name }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm text-gray-600 mb-1"
                      >{{ $t("filter_tab.min_area") }} (m²)</label
                    >
                    <input
                      v-model="filterAreaMin"
                      @input="applyTabFilters"
                      type="number"
                      min="0"
                      placeholder="e.g. 50"
                      class="w-full text-sm px-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label class="block text-sm text-gray-600 mb-1"
                      >{{ $t("filter_tab.max_area") }} (m²)</label
                    >
                    <input
                      v-model="filterAreaMax"
                      @input="applyTabFilters"
                      type="number"
                      min="0"
                      placeholder="e.g. 500"
                      class="w-full text-sm px-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>

                <!-- Type Filter -->
                <div
                  v-show="activeFilterTab === 1"
                  class="grid grid-cols-1 md:grid-cols-3 gap-3"
                >
                  <div class="rounded">
                    <label class="block text-sm text-gray-600 mb-1"
                      >{{ $t("filter_tab.property_type") }}</label
                    >
                    <select
                      v-model="filterType"
                      @change="applyTabFilters"
                      class="w-full text-sm px-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">{{ $t("filter_tab.all_type") }}</option>
                      <option
                        v-for="type in locationStore.types"
                        :key="type.id"
                        :value="type.TYPE"
                      >
                        {{ type.TYPE }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm text-gray-600 mb-1"
                      >Quick Select</label
                    >
                    <div class="flex gap-2 flex-wrap">
                      <button
                        @click="setFilterType('House')"
                        class="px-3 py-2 text-sm bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors"
                      >
                        House
                      </button>
                      <button
                        @click="setFilterType('Apartment')"
                        class="px-3 py-2 text-sm bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors"
                      >
                        Apartment
                      </button>
                      <button
                        @click="setFilterType('Land')"
                        class="px-3 py-2 text-sm bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors"
                      >
                        Land
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Location Filter -->
                <div
                  v-show="activeFilterTab === 2"
                  class="grid grid-cols-1 md:grid-cols-3 gap-3"
                >
                  <div>
                    <label class="block text-sm text-gray-600 mb-1"
                      >{{ $t("filter_tab.province") }}</label
                    >
                    <select
                      v-model="filterProvince"
                      @change="applyTabFilters"
                      class="w-full text-sm px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">{{ $t("filter_tab.all_province") }}</option>
                      <option
                        v-for="province in locationStore.provinces"
                        :key="province.id"
                        :value="province.name"
                      >
                        {{ province.name }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm text-gray-600 mb-1"
                      >{{ $t("filter_tab.district") }}</label
                    >
                    <select
                      v-model="filterDistrict"
                      @change="applyTabFilters"
                      :disabled="!filterProvince"
                      class="w-full text-sm px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">{{ $t("filter_tab.all_district") }}</option>
                      <option
                        v-for="district in locationStore.districts"
                        :key="district"
                        :value="district"
                      >
                        {{ district }}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm text-gray-600 mb-1"
                      >{{ $t("filter_tab.village") }}</label
                    >
                    <select
                      v-model="filterVillage"
                      @change="applyTabFilters"
                      :disabled="!filterDistrict"
                      class="w-full text-sm px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">{{ $t("filter_tab.all_village") }}</option>
                      <option
                        v-for="village in locationStore.villages"
                        :key="village"
                        :value="village"
                      >
                        {{ village }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Area Filter -->
                <div
                  v-show="activeFilterTab === 3"
                  class="grid grid-cols-1 md:grid-cols-3 gap-3"
                >
                  <div>
                    <label class="block text-sm text-gray-600 mb-1"
                      >{{ $t("filter_tab.min_area") }} (m²)</label
                    >
                    <input
                      v-model="filterAreaMin"
                      @input="applyTabFilters"
                      type="number"
                      min="0"
                      placeholder="Minimum area"
                      class="w-full text-sm px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1"
                      >{{ $t("filter_tab.max_area") }} (m²)</label
                    >
                    <input
                      v-model="filterAreaMax"
                      @input="applyTabFilters"
                      type="number"
                      min="0"
                      placeholder="Maximum area"
                      class="w-full text-sm px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1"
                      >Quick Select</label
                    >
                    <div class="flex gap-2 flex-wrap">
                      <button
                        @click="setAreaRange(0, 100)"
                        class="px-3 py-2 text-sm bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors"
                      >
                        0-100m²
                      </button>
                      <button
                        @click="setAreaRange(100, 500)"
                        class="px-3 py-2 text-sm bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors"
                      >
                        100-500m²
                      </button>
                      <button
                        @click="setAreaRange(500, null)"
                        class="px-3 py-2 text-sm bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors"
                      >
                        500m²+
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Price Filter -->
                <div
                  v-show="activeFilterTab === 4"
                  class="grid grid-cols-1 md:grid-cols-3 gap-3"
                >
                  <div>
                    <label class="block text-sm text-gray-600 mb-1"
                      >{{ $t("filter_tab.price_min") }}</label
                    >
                    <input
                      v-model="filterPriceMin"
                      @input="applyTabFilters"
                      type="number"
                      min="0"
                      placeholder="Minimum price"
                      class="w-full text-sm px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label class="block text-sm text-gray-600 mb-1"
                      >{{ $t("filter_tab.price_max") }}</label
                    >
                    <input
                      v-model="filterPriceMax"
                      @input="applyTabFilters"
                      type="number"
                      min="0"
                      placeholder="Maximum price"
                      class="w-full text-sm px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <div>
                    <label class="block text-sm text-gray-600 mb-1"
                      >Quick Select</label
                    >
                    <div class="flex gap-2 flex-wrap">
                      <button
                        @click="setPriceRange(0, 100000)"
                        class="px-3 py-2 text-sm bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors"
                      >
                        Under 100K
                      </button>
                      <button
                        @click="setPriceRange(100000, 500000)"
                        class="px-3 py-2 text-sm bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors"
                      >
                        100K-500K
                      </button>
                      <button
                        @click="setPriceRange(500000, null)"
                        class="px-3 py-2 text-sm bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors"
                      >
                        500K+
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Active Filters Summary -->
              <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap gap-2">
                <span
                  v-if="filterType"
                  class="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                >
                  {{ $t("filter_tab.type") }}: {{ filterType }}
                  <button
                    @click="
                      filterType = '';
                      applyTabFilters();
                    "
                    class="ml-1 hover:text-blue-900"
                  >
                    &times;
                  </button>
                </span>
                <span
                  v-if="filterProvince"
                  class="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full"
                >
                  {{ $t("filter_tab.province") }}: {{ filterProvince }}
                  <button
                    @click="
                      filterProvince = '';
                      applyTabFilters();
                    "
                    class="ml-1 hover:text-green-900"
                  >
                    &times;
                  </button>
                </span>
                <span
                  v-if="filterDistrict"
                  class="inline-flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full"
                >
                  {{ $t("filter_tab.district") }}: {{ filterDistrict }}
                  <button
                    @click="
                      filterDistrict = '';
                      applyTabFilters();
                    "
                    class="ml-1 hover:text-purple-900"
                  >
                    &times;
                  </button>
                </span>
                <span
                  v-if="filterAreaMin || filterAreaMax"
                  class="inline-flex items-center gap-1 text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full"
                >
                  {{ $t("filter_tab.area") }}: {{ filterAreaMin || "0" }} -
                  {{ filterAreaMax || "∞" }} m²
                  <button
                    @click="
                      filterAreaMin = '';
                      filterAreaMax = '';
                      applyTabFilters();
                    "
                    class="ml-1 hover:text-orange-900"
                  >
                    &times;
                  </button>
                </span>
                <span
                  v-if="filterPriceMin || filterPriceMax"
                  class="inline-flex items-center gap-1 text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full"
                >
                  {{ $t("filter_tab.price") }}: {{ filterPriceMin || "0" }} -
                  {{ filterPriceMax || "∞" }}
                  <button
                    @click="
                      filterPriceMin = '';
                      filterPriceMax = '';
                      applyTabFilters();
                    "
                    class="ml-1 hover:text-red-900"
                  >
                    &times;
                  </button>
                </span>
              </div>
            </div>

            <!-- Properties Grid -->
            <div v-if="loading" class="text-center py-12">
              <!-- <div
                class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
              ></div>
              <p class="mt-2 text-gray-600">Loading properties...</p> -->
              <LoadingSpinner />
            </div>

            <div
              v-else-if="filteredProperties.length === 0"
              class="text-center py-12"
            >
              <div class="text-gray-400 mb-4">
                <svg
                  class="mx-auto h-16 w-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V9a2 2 0 012 2v0"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900">
                No properties found
              </h3>
              <p class="text-gray-500">
                Try adjusting your filters to see more results.
              </p>
            </div>

            <div
              v-else
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4"
            >
              <PropertyCard
                v-for="item in paginatedProperties"
                :key="item.id || item._id"
                :id="item.id || item._id"
                :type="item.TYPE"
                :area="item.AREA"
                :village="item.VILLAGE"
                :district="item.DISTRICT"
                :province="item.PROVINCE"
                :price="item.PRICE"
                :price_string="item.PRICE_STRING"
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

            <!-- Pagination -->
            <div
              v-if="totalPages > 1"
              class="flex justify-center items-center mt-8 space-x-1"
            >
              <button
                @click="goToPage(1)"
                :disabled="currentPage === 1"
                class="px-3 py-2 text-sm border rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &laquo;
              </button>
              <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-2 text-sm border rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &lsaquo;
              </button>

              <template v-for="page in visiblePages" :key="page">
                <button
                  @click="goToPage(page)"
                  :class="{
                    'bg-blue-900 text-white': currentPage === page,
                    'border hover:bg-gray-100': currentPage !== page,
                  }"
                  class="px-3 py-2 text-sm rounded transition"
                >
                  {{ page }}
                </button>
              </template>

              <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-2 text-sm border rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &rsaquo;
              </button>
              <button
                @click="goToPage(totalPages)"
                :disabled="currentPage === totalPages"
                class="px-3 py-2 text-sm border rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &raquo;
              </button>
            </div>

            <!-- Results Summary -->
            <div
              v-if="filteredProperties.length > 0"
              class="text-center mt-3 text-sm text-gray-600"
            >
              Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
              {{
                Math.min(currentPage * itemsPerPage, filteredProperties.length)
              }}
              of {{ filteredProperties.length }} properties
            </div>
          </div>
        </section>
      </div>
    </section>
    <!-- CTA Section -->
    <section class="py-16 bg-blue-50 hero-section ">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-white mb-6">
          <!-- ຕິດຕໍ່ສອບຖາມຂໍ້ມູນ -->
          {{ $t("contact.title") }}
        </h2>
        <p class="text-white max-w-2xl mx-auto mb-4">
          <span class="text-xl">{{ $t("contact.name") }}</span> <br>
          <span class="text-md">{{ $t("contact.name_sub") }}</span>
        </p>
        <p class="text-lg text-white font-medium mb-8">
          {{ $t("contact.tel") }}: 021 251418-666
        </p>
        
        <button
          @click="showContactModal = true"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          {{ $t("contact.contact_us") }}
        </button>
      </div>

      <!-- Contact Modal -->
      <div v-if="showContactModal" class="fixed inset-0 z-50 overflow-y-auto" @click="showContactModal = false">
        <div class="flex items-center justify-center min-h-screen px-4">
          <div class="fixed inset-0 bg-black opacity-50"></div>
          
          <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6" @click.stop>
            <button @click="showContactModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <h3 class="text-2xl font-bold text-gray-900 mb-6">ຕິດຕໍ່ພວກເຮົາ</h3>
            
            <div class="space-y-4">
              <a href="tel:021251418" class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center">
              ໂທລະສັບ: 021 251418-666
              </a>
              
              <a href="https://wa.me/856021251418" target="_blank" class="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center">
                WhatsApp
              </a>
              
              <!-- <a href="mailto:info@example.com" class="block w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center">
                Email
              </a> -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { debounce } from "lodash";
import { useRouter } from "vue-router";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  Square3Stack3DIcon,
  UserCircleIcon,
  EyeIcon,
  HeartIcon
} from "@heroicons/vue/24/outline";
import { usePostStore } from "../../stores/indexStore";
import { getProfileImageUrl, getDefaultImage } from "../../utils/getImage";
import { useLocationStore } from "../../stores/locationStore";
import LoadingSpinner from "../../components/common/Loading.vue";
import PropertyCard from "../../components/PropertyCard.vue";
import { useI18n } from "vue-i18n";
const bgImage = new URL('../../assets/images/BG.png', import.meta.url).href;
import heroBg from '../../assets/images/hero-bg.jpg'

const { locale, t } = useI18n();

const displayedText = ref('')
let index = 0
let intervalId = null

const startTypeWriter = () => {
  clearInterval(intervalId)
  const fullText = t('hero.head_title')
  index = 0
  displayedText.value = ''

  intervalId = setInterval(() => {
    displayedText.value = fullText.slice(0, index + 1)
    index++
    if (index >= fullText.length) {
      index = 0
      displayedText.value = ''
    }
  }, 150)
}

onMounted(() => {
  startTypeWriter()
})


watch(locale, () => {
  startTypeWriter()
})

const router = useRouter();
const locationStore = useLocationStore();
const postStore = usePostStore();
const currentPage = ref(1);
const itemsPerPage = 20;
const defaultImage = ref(getDefaultImage());
const allListings = ref([]);

const sliderRef = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

// เพิ่ม reactive variables สำหรับ filter tabs
const activeFilterTab = ref(0);
const filterTabs = ref(["All", "Type", "Location", "Area", "Price"]);

const filterType = ref("");
const filterProvince = ref("");
const filterDistrict = ref("");
const filterVillage = ref("");
const filterAreaMin = ref("");
const filterAreaMax = ref("");
const filterPriceMin = ref("");
const filterPriceMax = ref("");

// Hero Search Variables
const heroSearchQuery = ref("");
const heroPropertyType = ref("");
const heroPriceRange = ref("");
const heroAreaRange = ref("");
const activeTab = ref(0);
const tabs = ref(["Buy", "Rent", "Sell"]);

const showContactModal = ref(false);

const heroRanges = ref([
  { label: "Under 100K", min: 0, max: 100000 },
  { label: "100K - 500K", min: 100000, max: 500000 },
  { label: "500K - 1M", min: 500000, max: 1000000 },
  { label: "1M - 5M", min: 1000000, max: 5000000 },
  { label: "Above 5M", min: 5000000, max: 999999999 },
]);

const heroAreaRanges = ref([
  { label: "0-100 m²", min: 0, max: 100 },
  { label: "100-200 m²", min: 100, max: 200 },
  { label: "200-500 m²", min: 200, max: 500 },
  { label: "500-1000 m²", min: 500, max: 1000 },
  { label: "Above 1000 m²", min: 1000, max: 999999 },
]);

const propertyTypeMapping = {
  "ດິນປຸກສ້າງເປົ່າຫວ່າງ": "menu.vacant_land",
  "ດິນກະສິກໍາ": "menu.agriculture", 
  "ດິນ ແລະ ສິ່ງປຸກສ້າງທີ່ຢູ່ອາໄສ": "menu.residential",
  "ລົດ": "menu.car",
  "ເຄື່ອງຈັກ ແລະ ກົນຈັກໜັກ": "menu.machinery",
  "ດິນ ແລະ ໂຮງແຮມ, ບ້ານພັກ, ໂຮງງານ": "menu.commercial_land",
  "ສິດນຳໃຊ້ທີ່ດິນ ຫຼື ອາຄານ": "menu.property_use_rights",
  "ຊັບສິນອື່ນໆ": "menu.other_property"
}

const translatedTypes = computed(() => {
  if (!locationStore.types || !Array.isArray(locationStore.types)) {
    return []
  }
  
  return locationStore.types.map(type => {
    const originalType = type.TYPE
    const mappedKey = Object.keys(propertyTypeMapping).find(
      key => key === originalType
    )
    
    return {
      ...type,
      TYPE: mappedKey ? t(propertyTypeMapping[mappedKey]) : originalType,
      ORIGINAL_TYPE: originalType 
    }
  })
})

// Hero search functionality
const performHeroSearch = () => {
  // Reset existing filters first
  resetAllFilters();

  // Apply hero search parameters
  if (heroSearchQuery.value.trim()) {
    searchQuery.value = heroSearchQuery.value.trim();
  }

  if (heroPropertyType.value) {
    filterType.value = heroPropertyType.value;
  }

  if (heroPriceRange.value) {
    filterPriceMin.value = heroPriceRange.value.min;
    filterPriceMax.value = heroPriceRange.value.max;
  }

  if (heroAreaRange.value) {
    filterAreaMin.value = heroAreaRange.value.min;
    filterAreaMax.value = heroAreaRange.value.max;
  }

  // Apply filters and scroll to results
  applyTabFilters();
  scrollToPropertiesSection();
};

const scrollToPropertiesSection = () => {
  // Scroll to properties section
  const propertiesSection = document.querySelector(
    '[data-section="properties"]'
  );
  if (propertiesSection) {
    propertiesSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    // Fallback: scroll down by viewport height
    window.scrollTo({
      top: window.innerHeight * 1.5,
      behavior: "smooth",
    });
  }
};

const handleHeroSearchKeypress = (event) => {
  if (event.key === "Enter") {
    performHeroSearch();
  }
};

// Computed property สำหรับ filtered properties
const filteredProperties = computed(() => {
  let filtered = baseFilter(allListings.value);

  // Apply search query if exists
  if (searchQuery.value.trim()) {
    const searchTerm = normalize(searchQuery.value);
    filtered = filtered.filter(
      (item) =>
        normalize(item.TYPE).includes(searchTerm) ||
        normalize(item.PROVINCE).includes(searchTerm) ||
        normalize(item.DISTRICT).includes(searchTerm) ||
        normalize(item.VILLAGE).includes(searchTerm) ||
        normalize(item.DESCRIPTION || "").includes(searchTerm)
    );
  }

  // Apply type filter
  if (filterType.value) {
    filtered = filtered.filter((item) =>
      normalize(item.TYPE).includes(normalize(filterType.value))
    );
  }

  // Apply location filters
  if (filterProvince.value) {
    filtered = filtered.filter((item) =>
      normalize(item.PROVINCE).includes(normalize(filterProvince.value))
    );
  }

  if (filterDistrict.value) {
    filtered = filtered.filter((item) =>
      normalize(item.DISTRICT).includes(normalize(filterDistrict.value))
    );
  }

  if (filterVillage.value) {
    filtered = filtered.filter((item) =>
      normalize(item.VILLAGE).includes(normalize(filterVillage.value))
    );
  }

  // Apply area filters
  if (filterAreaMin.value) {
    filtered = filtered.filter((item) => {
      const area = parseFloat(item.AREA) || 0;
      return area >= parseFloat(filterAreaMin.value);
    });
  }

  if (filterAreaMax.value) {
    filtered = filtered.filter((item) => {
      const area = parseFloat(item.AREA) || 0;
      return area <= parseFloat(filterAreaMax.value);
    });
  }

  // Apply price filters
  if (filterPriceMin.value) {
    filtered = filtered.filter((item) => {
      const price = parseFloat(item.PRICE) || 0;
      return price >= parseFloat(filterPriceMin.value);
    });
  }

  if (filterPriceMax.value) {
    filtered = filtered.filter((item) => {
      const price = parseFloat(item.PRICE) || 0;
      return price <= parseFloat(filterPriceMax.value);
    });
  }

  return filtered;
});

// Computed property สำหรับ pagination
const paginatedProperties = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProperties.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredProperties.value.length / itemsPerPage);
});

// Check if there are active filters
const hasActiveFilters = computed(() => {
  return (
    filterType.value ||
    filterProvince.value ||
    filterDistrict.value ||
    filterVillage.value ||
    filterAreaMin.value ||
    filterAreaMax.value ||
    filterPriceMin.value ||
    filterPriceMax.value
  );
});

// Methods
const applyTabFilters = () => {
  currentPage.value = 1; // Reset to first page when filters change
};

const resetAllFilters = () => {
  filterType.value = "";
  filterProvince.value = "";
  filterDistrict.value = "";
  filterVillage.value = "";
  filterAreaMin.value = "";
  filterAreaMax.value = "";
  filterPriceMin.value = "";
  filterPriceMax.value = "";
  searchQuery.value = "";
  currentPage.value = 1;
  activeFilterTab.value = 0;
};

const setFilterType = (type) => {
  filterType.value = type;
  applyTabFilters();
};

const setAreaRange = (min, max) => {
  filterAreaMin.value = min || "";
  filterAreaMax.value = max || "";
  applyTabFilters();
};

const setPriceRange = (min, max) => {
  filterPriceMin.value = min || "";
  filterPriceMax.value = max || "";
  applyTabFilters();
};

const goToPage = (page) => {
  currentPage.value = page;
};

// Watch for location changes to update districts and villages
watch(filterProvince, async (newProvince) => {
  if (newProvince) {
    await locationStore.fetchDistricts(newProvince);
    filterDistrict.value = "";
    filterVillage.value = "";
  } else {
    locationStore.districts = [];
    locationStore.villages = [];
    filterDistrict.value = "";
    filterVillage.value = "";
  }
});

watch(filterDistrict, async (newDistrict) => {
  if (newDistrict && filterProvince.value) {
    await locationStore.fetchVillages(filterProvince.value, newDistrict);
    filterVillage.value = "";
  } else {
    locationStore.villages = [];
    filterVillage.value = "";
  }
});

const featuredProperties = computed(() => {
  const baseFilteredItems = baseFilter(allListings.value);

  const sortedByViews = baseFilteredItems.sort((a, b) => {
    const viewCountA = parseInt(a.VIEW_COUNT) || 0;
    const viewCountB = parseInt(b.VIEW_COUNT) || 0;
    return viewCountB - viewCountA;
  });

  // เอาแค่ 10 รายการแรก
  return sortedByViews.slice(0, 20);
});

const scrollLeft = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({
      left: -340, // width + gap
      behavior: "smooth",
    });
  }
};

const scrollRight = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({
      left: 340, // width + gap
      behavior: "smooth",
    });
  }
};

const handleScroll = () => {
  const currentScrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;
  if (currentScrollPosition < 0) return;
  if (currentScrollPosition < lastScrollPosition.value) {
    isNavbarHidden.value = false;
  } else if (
    currentScrollPosition > lastScrollPosition.value &&
    currentScrollPosition > 100
  ) {
    isNavbarHidden.value = true;
  }
  lastScrollPosition.value = currentScrollPosition;
};

const updateScrollButtons = () => {
  if (sliderRef.value) {
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.value;
    canScrollLeft.value = scrollLeft > 0;
    canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 10;
  }
};

const priceRanges = ref([
  { label: "All", min: 0, max: Infinity },
  { label: "Below 50,000", min: 0, max: 50000 },
  { label: "50,000 - 100,000", min: 50000, max: 100000 },
  { label: "100,000 - 500,000", min: 100000, max: 500000 },
  { label: "500,000 - 1,000,000", min: 500000, max: 1000000 },
  { label: "1,000,000 and above", min: 1000000, max: Infinity },
]);

const areaRanges = ref([
  { label: "All", min: 0, max: Infinity },
  { label: "Below 50 sqm", min: 0, max: 50 },
  { label: "50 - 100 sqm", min: 50, max: 100 },
  { label: "100 - 200 sqm", min: 100, max: 200 },
  { label: "200 - 500 sqm", min: 200, max: 500 },
  { label: "500 - 1000 sqm", min: 500, max: 1000 },
  { label: "1000 sqm and above", min: 1000, max: Infinity },
]);

const priceSqm = ref([
  { label: "All", min: 0, max: Infinity },
  { label: "Below 30", min: 0, max: 30 },
  { label: "30 - 100", min: 30, max: 100 },
  { label: "100 - 200", min: 100, max: 200 },
  { label: "200 - 500", min: 200, max: 500 },
  { label: "500 and above", min: 500, max: Infinity },
]);

const filters = ref({
  type: "",
  province: "",
  district: "",
  village: "",
  priceRange: "",
  areaRange: "",
  priceSqm: "",
});

const searchQuery = ref("");
const loading = ref(true);
const filteredListings = ref([]);

// onMounted(async () => {
//   await locationStore.fetchProvinces();
//   await locationStore.fetchTypes();
//   await postStore.fetchPosts();
//   allListings.value = [...postStore.posts];
//   filteredListings.value = [...allListings.value];
//   loading.value = false;
// });

const baseFilter = (items) => {
   return items.filter(
    (i) => i.STATUS?.AUTHORIZATION_LEVEL === 1 && i.STATUS?.VISIBILITY === "ALL"
  );
};

onMounted(async () => {
  await locationStore.fetchProvinces();
  await locationStore.fetchTypes();
  await postStore.fetchPosts();
  allListings.value = [...postStore.posts];

  //   filteredListings.value = allListings.value.filter((i) =>
  //     (i.STATUS?.VISIBILITY === 'PUBLIC')
  //   );
  // console.log("Post Data Log:", allListings.value);

  filteredListings.value = baseFilter(allListings.value);
  loading.value = false;
  setInterval(() => {
    if (sliderRef.value) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.value;

      // ถ้ายังเลื่อนได้ ก็เลื่อนไปทางขวา
      if (scrollLeft < scrollWidth - clientWidth - 10) {
        scrollRight();
      } else {
        // ถ้าเลื่อนถึงสุดแล้ว ให้กลับไปเริ่มต้น
        sliderRef.value.scrollTo({ left: 0, behavior: "smooth" });
      }
    }
  }, 5000);
});

const formatPrice = (price) => {
  return price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
};

const viewDetails = async (id) => {
  try {
    await postStore.viewCountDetail(id);
    router.push(`/public_detail?id=${id}`);
  } catch (error) {
    // console.error("Error:", error);
  }
};

const normalize = (str) => (str || "").toString().toLowerCase().trim();

const applyFilters = () => {
  loading.value = true;
  try {
    // let base = [...allListings.value];
    let base = baseFilter(allListings.value);

    if (filters.value.type) {
      base = base.filter((i) =>
        normalize(i.TYPE).includes(normalize(filters.value.type))
      );
    }

    if (filters.value.province) {
      base = base.filter((i) =>
        normalize(i.PROVINCE).includes(normalize(filters.value.province))
      );
    }

    if (filters.value.district) {
      base = base.filter((i) =>
        normalize(i.DISTRICT).includes(normalize(filters.value.district))
      );
    }

    if (filters.value.village) {
      base = base.filter((i) =>
        normalize(i.VILLAGE).includes(normalize(filters.value.village))
      );
    }

    if (
      filters.value.priceRange &&
      filters.value.priceRange.min !== undefined
    ) {
      base = base.filter((i) => {
        const price = parseFloat(i.PRICE) || 0;
        return (
          price >= filters.value.priceRange.min &&
          price <= filters.value.priceRange.max
        );
      });
    }

    if (filters.value.areaRange && filters.value.areaRange.min !== undefined) {
      base = base.filter((i) => {
        const area = parseFloat(i.AREA) || 0;
        return (
          area >= filters.value.areaRange.min &&
          area <= filters.value.areaRange.max
        );
      });
    }

    if (filters.value.priceSqm && filters.value.priceSqm.min !== undefined) {
      base = base.filter((i) => {
        const sqm = i.AREA
          ? (parseFloat(i.PRICE) || 0) / (parseFloat(i.AREA) || 1)
          : 0;
        return (
          sqm >= filters.value.priceSqm.min && sqm <= filters.value.priceSqm.max
        );
      });
    }

    filteredListings.value = base;
    currentPage.value = 1;
  } finally {
    loading.value = false;
  }
};

watch(
  [() => filters.value.province, () => filters.value.district],
  async ([newProvince, newDistrict], [oldProvince, oldDistrict]) => {
    if (newProvince !== oldProvince) {
      if (newProvince) {
        await locationStore.fetchDistricts(newProvince);
        filters.value.district = "";
        filters.value.village = "";
      } else {
        locationStore.districts = [];
        locationStore.villages = [];
        filters.value.district = "";
        filters.value.village = "";
      }
    }

    if (newDistrict !== oldDistrict && filters.value.province) {
      if (newDistrict) {
        await locationStore.fetchVillages(filters.value.province, newDistrict);
        filters.value.village = "";
      } else {
        locationStore.villages = [];
        filters.value.village = "";
      }
    }
  },
  { deep: true }
);

// const handleSearch = () => {
//   loading.value = true;
//   try {
//     if (!searchQuery.value.trim()) {
//     //   filteredListings.value = [...allListings.value];
//     filteredListings.value = baseFilter(allListings.value);
//       return;
//     }
//     const searchTerm = normalize(searchQuery.value);
//     filteredListings.value = allListings.value.filter(
//       (i) =>
//         normalize(i.TYPE).includes(searchTerm) ||
//         normalize(i.PROVINCE).includes(searchTerm) ||
//         normalize(i.DISTRICT).includes(searchTerm) ||
//         normalize(i.VILLAGE).includes(searchTerm) ||
//         normalize(i.DESCRIPTION || "").includes(searchTerm) ||
//         normalize(i.AREA || "").includes(searchTerm) ||
//         normalize(i.TYPE || "").includes(searchTerm) ||
//         (i.PRICE && i.PRICE.toString().includes(searchQuery.value))
//     );
//     currentPage.value = 1;
//   } finally {
//     loading.value = false;
//   }
// };

const handleSearch = () => {
  loading.value = true;
  try {
    const baseFilteredItems = baseFilter(allListings.value);

    if (!searchQuery.value.trim()) {
      filteredListings.value = baseFilteredItems;
      return;
    }

    const searchTerm = normalize(searchQuery.value);
    filteredListings.value = baseFilteredItems.filter(
      (i) =>
        normalize(i.TYPE).includes(searchTerm) ||
        normalize(i.PROVINCE).includes(searchTerm) ||
        normalize(i.DISTRICT).includes(searchTerm) ||
        normalize(i.VILLAGE).includes(searchTerm) ||
        normalize(i.DESCRIPTION || "").includes(searchTerm) ||
        normalize(i.AREA || "").includes(searchTerm) ||
        normalize(i.TYPE || "").includes(searchTerm) ||
        (i.PRICE && i.PRICE.toString().includes(searchQuery.value))
    );

    currentPage.value = 1;
  } finally {
    loading.value = false;
  }
};

const debouncedSearch = debounce(handleSearch, 1000);

const paginatedListings = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredListings.value.slice(start, end);
});

// const totalPages = computed(() => {
//   return Math.ceil(filteredListings.value.length / itemsPerPage);
// });

const visiblePages = computed(() => {
  const maxVisible = 5;
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(currentPage.value - half, 1);
  let end = Math.min(start + maxVisible - 1, totalPages.value);

  if (end - start + 1 < maxVisible) {
    start = Math.max(end - maxVisible + 1, 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

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

const handleImageError = (e) => {
  e.target.src = defaultImage.value;
};

const totalProperties = computed(() => {
  return baseFilter(allListings.value).length;
});

const totalProjects = computed(() => {
  const uniqueProjects = new Set(
    baseFilter(allListings.value)
      .map(item => item.PROJECT_NAME || item.CREATED_BY)
      .filter(Boolean)
  );
  return uniqueProjects.size;
});
</script>

<style>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

.hero-section {
  background-image: url('../../assets/images/BG.png');
  /* clip-path: none;  */
  height: 350px;
}


@media (min-width: 768px) {
  /* .hero-section {
    clip-path: ellipse(100% 95% at 50% 0%);
  } */
}

@keyframes bounceSmooth {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* ปรับความสูงที่เด้ง */
  }
}

.animate-bounce-smooth {
  animation: bounceSmooth 2s ease-in-out infinite;
}

div::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
div {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Ensure cards maintain consistent height */
:deep(.property-card) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Optional: Add smooth scroll behavior */
@media (prefers-reduced-motion: no-preference) {
  .scroll-smooth {
    scroll-behavior: smooth;
  }
}


</style>
