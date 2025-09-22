<template>
  <div class="posts-management">
    <!-- Header / Filters -->
    <div class="bg-white rounded-md shadow-sm p-4 mb-4 space-y-3">
  <!-- Search + Status -->
  <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
    <!-- Search Input -->
    <div class="relative w-full lg:max-w-sm">
      <MagnifyingGlassIcon
        class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search Post..."
        class="pl-9 pr-3 py-1.5 w-full text-xs border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>

    <!-- Status Filter + Add Button -->
    <div class="flex items-center gap-2">
      <select
        v-model="statusFilter"
        class="border border-gray-300 rounded-md px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="all">{{ $t('filters.all') }}</option>
      </select>
      <button
        v-if="isMaker || isAdmin || isChecker"
        @click="openCreateModal"
        :disabled="postStore.loading"
        class="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-blue-700 transition flex items-center"
      >
        <PlusIcon class="w-3.5 h-3.5 mr-1.5" />
        <span v-if="!postStore.loading">{{ $t('common.add_new') }}</span>
        <span v-else>{{ $t('common.loading') }}</span>
      </button>
    </div>
  </div>

  <!-- Filters -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 items-center">
    <select
      v-model="filters.type"
      class="border border-gray-300 rounded-md px-2.5 py-1.5 text-xs"
    >
      <option value="">{{ $t('filters.all_types') }}</option>
      <option
        v-for="type in locationStore.types"
        :key="type.id"
        :value="type.TYPE"
      >
        {{ type.TYPE }}
      </option>
    </select>

    <select
      v-model="filters.province"
      class="border border-gray-300 rounded-md px-2.5 py-1.5 text-xs"
    >
      <option value="">{{ $t('filters.province') }}</option>
      <option
        v-for="province in locationStore.provinces"
        :key="province.id"
        :value="province"
      >
        {{ province.name }}
      </option>
    </select>

    <select
      v-model="filters.district"
      :disabled="!filters.province"
      class="border border-gray-300 rounded-md px-2.5 py-1.5 text-xs"
    >
      <option value="">{{ $t('filters.district') }}</option>
      <option
        v-for="(district, index) in locationStore.districts"
        :key="index"
        :value="district"
      >
        {{ district }}
      </option>
    </select>

    <select
      v-model="filters.village"
      :disabled="!filters.district"
      class="border border-gray-300 rounded-md px-2.5 py-1.5 text-xs"
    >
      <option value="">{{ $t('filters.village') }}</option>
      <option
        v-for="(village, index) in locationStore.villages"
        :key="index"
        :value="village"
      >
        {{ village }}
      </option>
    </select>

    <button
      @click="applyFilters"
      class="bg-blue-600 text-white rounded-md px-3 py-2 text-xs hover:bg-blue-700 transition w-full lg:w-auto"
    >
      {{ $t('common.apply') }}
    </button>
  </div>
</div>

    <!-- Loading State -->
    <!-- <div v-if="postStore.loading && !showModal" class="text-center py-8">
      <span class="text-gray-500">ກຳລັງໂຫຼດຂໍ້ມູນ...</span>
    </div> -->
    <div v-if="postStore.loading && !showModal" class="text-center py-8">
      <LoadingSpinner />
    </div>

    <!-- Error State -->
    <div
      v-if="postStore.error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      {{ postStore.error }}
    </div>

    <!-- Posts Table -->
<!-- Posts Table -->
<div
  v-if="!postStore.loading"
  class="bg-white rounded-lg shadow overflow-hidden"
>
  <div class="overflow-x-auto">
    <!-- กำหนดความสูงสูงสุดและเพิ่ม scroll แนวตั้ง -->
    <div class="max-h-[calc(100vh-250px)] overflow-y-auto">
      <table class="w-full table-fixed">
        <thead class="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th class="w-8 px-2 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider bg-gray-50">No.</th>
            <th class="w-20 px-2 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider bg-gray-50">ຮູບ</th>
            <th class="w-20 px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider bg-gray-50">{{ $t('modal.type') }}</th>
            <th class="w-20 px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider bg-gray-50">{{ $t('modal.price') }}</th>
            <th class="w-16 px-2 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider bg-gray-50">{{ $t('modal.area') }}</th>
            <th class="w-20 px-2 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider bg-gray-50">{{ $t('property.location') }}</th>
            <th class="w-18 px-2 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider bg-gray-50">{{ $t('property.visibility') }}</th>
            <th class="w-20 px-2 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider bg-gray-50">{{ $t('property.status') }}</th>
            <th class="w-60 px-2 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider bg-gray-50">{{ $t('common.action') }}</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(post, index) in paginatedPosts"
            :key="post.id"
            class="hover:bg-gray-50 transition-colors duration-150"
          >
            <!-- No. -->
            <td class="px-2 py-3 text-center text-sm font-medium text-gray-900">
              {{ index + 1 }}
            </td>

            <!-- Image -->
            <td class="px-2 py-3">
              <div class="flex justify-center">
                <img
                  v-if="post.IMAGES && post.IMAGES.PROFILE_IMAGE"
                  :src="post?.IMAGES?.PROFILE_IMAGE ? getProfileImageUrl(post.IMAGES) : defaultImage"
                  @error="handleImageError"  
                  alt="Property preview"
                  class="w-16 h-16 object-cover rounded border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                />
                <div v-else class="w-16 h-16 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                  <span class="text-gray-400 text-xs">No Image</span>
                </div>
              </div>
            </td>

            <!-- Type -->
            <td class="px-2 py-3">
              <span class="text-xs font-medium text-gray-900 line-clamp-2">
                {{ post.TYPE || "N/A" }}
              </span>
            </td>

            <!-- Price -->
            <td class="px-2 py-3">
              <div class="flex">
                <div class="text-xs font-medium text-gray-900 me-1">
                  {{ (post.PRICE || 0).toLocaleString() }}
                </div>
                <div class="text-xs text-gray-700">
                  {{ post.CURRENCY }}
                </div>
              </div>
            </td>

            <!-- Area -->
            <td class="px-2 py-3 text-center">
              <span class="text-xs font-medium text-gray-900 me-1">
                {{ post.AREA || 0 }}
              </span>
              <span class="text-xs text-gray-700">(m²)</span>
            </td>

            <!-- Location -->
            <td class="px-2 py-3">
              <span class="text-xs text-gray-700 line-clamp-2">
                {{ formatLocation(post) }}
              </span>
            </td>

            <!-- VISIBILITY -->
            <td class="px-2 py-3 text-center">
              <span 
                :class="{
                  'bg-green-100 text-green-800 border border-green-200': post.STATUS?.VISIBILITY === 'PRIVATE',
                  'bg-blue-100 text-blue-800 border border-blue-200': post.STATUS?.VISIBILITY === 'PUBLIC',
                  'bg-gray-100 text-gray-800 border border-gray-200': !post.STATUS?.VISIBILITY
                }" 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                {{ post.STATUS?.VISIBILITY ?? 'N/A' }}
              </span>
            </td>

            <!-- STATUS -->
            <td class="px-2 py-3 text-center">
              <span 
                :class="{
                  'bg-yellow-100 text-yellow-800 border border-yellow-200': post.STATUS?.AUTHORIZATION_LEVEL === 0,
                  'bg-green-100 text-green-800 border border-green-200': post.STATUS?.AUTHORIZATION_LEVEL === 1,
                  'bg-red-100 text-red-800 border border-red-200': post.STATUS?.AUTHORIZATION_LEVEL === 2,
                  'bg-gray-100 text-gray-800 border border-gray-200': post.STATUS?.AUTHORIZATION_LEVEL == null
                }" 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              >
                {{
                  post.STATUS?.AUTHORIZATION_LEVEL === 0 ? 'Pending' :
                  post.STATUS?.AUTHORIZATION_LEVEL === 1 ? 'Authorized' :
                  post.STATUS?.AUTHORIZATION_LEVEL === 2 ? 'Disable' : 'N/A'
                }}
              </span>
            </td>

            <!-- Actions -->
<td class="px-2 py-3">
  <div class="flex flex-wrap gap-1 justify-center">
    <!-- View Button - แสดงสำหรับทุก role -->
    <button
      class="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded-md text-xs hover:bg-green-100 hover:border-green-300 transition-colors duration-150"
      @click="openViewModal(post)"
      :disabled="postStore.loading"
      title="View"
    >
      <EyeIcon class="w-3 h-3 mr-1" />
      {{ $t('common.view') }}
    </button>

    <!-- Close Button - แสดงเฉพาะ checker และ admin -->
    <button
      v-if="isAdmin || isChecker"
      class="inline-flex items-center px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded-md text-xs hover:bg-red-100 hover:border-red-300 transition-colors duration-150"
      @click="disablePost(post.id)"
      :disabled="postStore.loading"
      title="Close"
    >
      <EyeSlashIcon class="w-3 h-3 mr-1" />
      {{ $t('common.close') }}
    </button>

    <!-- Undo Button - แสดงเฉพาะ checker และ admin -->
    <button
      v-if="isAdmin || isChecker"
      class="inline-flex items-center px-2 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-md text-xs hover:bg-purple-100 hover:border-purple-300 transition-colors duration-150"
      @click="setPendingPost(post.id)"
      :disabled="postStore.loading"
      title="undo"
    >
      <ArrowPathIcon class="w-3 h-3 mr-1" />
      Undo
    </button>

    <!-- Authorize Button - แสดงเฉพาะ checker และ admin -->
    <button
      v-if="isAdmin || isChecker"
      class="inline-flex items-center px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-xs hover:bg-amber-100 hover:border-amber-300 transition-colors duration-150"
      @click="authorizePost(post.id)"
      :disabled="postStore.loading"
      title="Authorize"
    >
      <CheckCircleIcon class="w-3 h-3 mr-1" />
       {{ $t('modal.auth') }}
    </button>

    <!-- Edit Button - แสดงเฉพาะ maker และ admin -->
    <button
      v-if="isMaker || isAdmin || isChecker"
      class="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs hover:bg-blue-100 hover:border-blue-300 transition-colors duration-150"
      @click="openEditModal(post)"
      :disabled="postStore.loading"
      title="Edit"
    >
      <PencilIcon class="w-3 h-3 mr-1" />
       {{ $t('common.edit') }}
    </button>

    <!-- Delete Button - แสดงเฉพาะ maker และ admin -->
    <button
      v-if="isMaker || isAdmin || isChecker"
      class="inline-flex items-center px-2 py-1 bg-red-600 text-white border border-red-700 rounded-md text-xs hover:bg-red-700 hover:border-red-800 transition-colors duration-150"
      @click="deletePost(post.id)"
      :disabled="postStore.loading"
      title="Delete"
    >
      <TrashIcon class="w-3 h-3 mr-1" />
       {{ $t('common.delete') }}
    </button>

    <!-- แสดงข้อความหากไม่มีสิทธิ์ใดๆ -->
    <span 
      v-if="!isMaker && !isChecker && !isAdmin" 
      class="text-xs text-gray-500"
    >
      No actions available
    </span>
  </div>
</td>
          </tr>

          <!-- Empty State -->
          <tr v-if="filteredPosts.length === 0 && !postStore.loading">
            <td colspan="9" class="px-4 py-8 text-center">
              <div class="flex flex-col items-center justify-center">
                <img
                  class="h-16 w-16 mb-4 opacity-50"
                  src="../../assets/images/box.png"
                  alt="Empty data"
                />
                <p class="text-gray-500 text-sm">Data is Empty.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

    <!-- Pagination -->
    <div
      v-if="filteredPosts.length > 0"
      class="mt-4 flex justify-center items-center space-x-2 text-sm"
    >
      <button
        @click="currentPage = 1"
        :disabled="currentPage === 1"
        class="px-2 py-1 border rounded hover:bg-gray-100 transition disabled:opacity-50"
      >
        &laquo;
      </button>
      <button
        @click="currentPage = currentPage - 1"
        :disabled="currentPage === 1"
        class="px-2 py-1 border rounded hover:bg-gray-100 transition disabled:opacity-50"
      >
        &lsaquo;
      </button>

      <template v-for="page in visiblePages" :key="page">
        <button
          @click="currentPage = page"
          :class="{
            'bg-blue-600 text-white': currentPage === page,
            border: currentPage !== page,
          }"
          class="px-3 py-1 rounded hover:bg-gray-100 transition"
        >
          {{ page }}
        </button>
      </template>

      <button
        @click="currentPage = currentPage + 1"
        :disabled="currentPage === totalPages"
        class="px-2 py-1 border rounded hover:bg-gray-100 transition disabled:opacity-50"
      >
        &rsaquo;
      </button>
      <button
        @click="currentPage = totalPages"
        :disabled="currentPage === totalPages"
        class="px-2 py-1 border rounded hover:bg-gray-100 transition disabled:opacity-50"
      >
        &raquo;
      </button>
    </div>

    <!-- Create/Edit Modal -->
    <PostModal
      v-if="showModal"
      :post="currentPost"
      :mode="modalMode"
      :loading="modalLoading"
      @close="closeModal"
      @save="handleSave"
      @saved="handleSaved"
    />

    <!-- View post detail -->
    <DetailModal
      v-if="showDetailModal"
      :land="selectedPost"
      @close="closeViewModal"
    />

  </div>
</template>

<script setup>
import { ref, computed, onMounted, getCurrentInstance, watch } from "vue";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  EyeSlashIcon,
  EyeIcon,
  LockClosedIcon, 
  GlobeAltIcon,
  ClockIcon,
  ArrowPathIcon
} from "@heroicons/vue/24/outline";
import PostModal from "../admin/components/PostModal.vue";
import { usePostStore } from "../../stores/indexStore";
import { getImageUrl, getProfileImageUrl } from "../../utils/getImage";
import { getDefaultImage } from "../../utils/getImage";
import { useLocationStore } from "../../stores/locationStore";
import LoadingSpinner from "../../components/common/Loading.vue";
import DetailModal from "../admin/PostDetail.vue"
import { getUser } from '../../services/tokenService';
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

// for alert modal
const { $modal, $loading } =
  getCurrentInstance().appContext.config.globalProperties;
const modal = getCurrentInstance().appContext.config.globalProperties.$modal;

const postStore = usePostStore();
const locationStore = useLocationStore();
const allPosts = ref([]);

// Filters
const searchQuery = ref("");
const statusFilter = ref("all");

// Modal state
const showModal = ref(false);
const modalMode = ref("create");
const currentPost = ref({});
const modalLoading = ref(false);

const showDetailModal = ref(false);
const selectedPost = ref(null);

// for pagination
const currentPage = ref(1);
const itemsPerPage = 10;

const defaultImage = ref(getDefaultImage());

// เพิ่มตัวแปรหลังส่วน const declaration
// User data
const userData = ref({
  name: '',
  email: '',
  dep: '',
  branch: '',
  code: '',
  role_code: '',
})

const filters = ref({
  type: "",
  province: "",
  district: "",
  village: "",
});

const openViewModal = (post) => {
  selectedPost.value = {
    LAND_DETAILS: {
      TYPE: post.TYPE,
      PROVINCE: post.PROVINCE,
      DISTRICT: post.DISTRICT,
      VILLAGE: post.VILLAGE,
      AREA: post.AREA,
      PRICE: post.PRICE,
      CURRENCY: post.CURRENCY,
      DESCRIPTION: post.DESCRIPTION,
      STATUS: post.STATUS,
      VIEW_COUNT: post.VIEW_COUNT,
      CONTACT: {
        TEL: post.TEL,
        EMAIL: post.EMAIL,
      },
      IMAGES: post.IMAGES,
    },
    MAP_LOCATION: post.MAP_LOCATION,
    CREATED_BY: post.CREATED_BY,
    CREATED_AT: post.CREATED_AT,
    UPDATED_BY: post.UPDATED_BY,
    APPROVED_BY: post.APPROVED_BY,
  }
  showDetailModal.value = true
}


const closeViewModal = () => {
  showDetailModal.value = false
  selectedPost.value = null
}


const handleImageError = (e) => {
  e.target.src = defaultImage.value;
  e.target.classList.add("bg-gray-100");
};

const formatLocation = (post) => {
  return [post.VILLAGE, post.DISTRICT, post.PROVINCE]
    .filter(Boolean)
    .join(", ");
};

onMounted(async () => {
  try {
    // ดึงข้อมูลผู้ใช้จาก Local Storage
    const storedUser = getUser();
    // if (storedUser && storedUser.DATA) {
    //   userData.value = storedUser.DATA;
    //   userRole.value = storedUser.DATA.ROLE_CODE || '';
    //   console.log('User role:', userRole.value);
    // }
    if (storedUser) {
      userData.value.name = storedUser.EMPNAME || 'Admin';
      userData.value.email = storedUser.EMAIL || 'Admin@gmail.com';
      userData.value.dep = storedUser.DEP || 'Null';
      userData.value.branch = storedUser.CUSTOM_BRN_NAME || 'Null';
      userData.value.code = storedUser.BRANCH_LIST || 'Null';
      userData.value.role_code = storedUser.ROLE_CODE || 'Null';
    }

    await locationStore.fetchProvinces();
    await locationStore.fetchTypes();
    await postStore.fetchPosts();
    allPosts.value = [...postStore.posts];
  } catch (error) {
    console.error("Error loading posts:", error);
  }
});

const userName = computed(() => userData.value.name)
const userEmail = computed(() => userData.value.email)
const userDep = computed(() => userData.value.dep)
const userBranch = computed(() => userData.value.branch)
const userCode = computed(() => userData.value.code)
const userRoleCode = computed(() => userData.value.role_code)

// computed properties สำหรับตรวจสอบสิทธิ์
const isMaker = computed(() => userRoleCode.value === 'MAKER');
const isChecker = computed(() => userRoleCode.value === 'CHECKER');
const isAdmin = computed(() => userRoleCode.value === 'ADMIN');

watch(
  [() => filters.value.province, () => filters.value.district],
  async ([newProvince, newDistrict], [oldProvince, oldDistrict]) => {
    if (newProvince !== oldProvince) {
      if (newProvince && newProvince.name) {
        await locationStore.fetchDistricts(newProvince.name);
        filters.value.district = "";
        filters.value.village = "";
      }
    }

    if (newDistrict !== oldDistrict && filters.value.province) {
      if (newDistrict) {
        await locationStore.fetchVillages(
          filters.value.province.name,
          newDistrict
        );
        filters.value.village = "";
      }
    }
  },
  { deep: true }
);

const normalize = (str) => (str || "").toString().toLowerCase().trim();

const applyFilters = () => {
  let base = [...allPosts.value];

  if (filters.value.type) {
    base = base.filter((p) => normalize(p.TYPE).includes(normalize(filters.value.type)));
  }

  if (filters.value.province) {
    base = base.filter((p) => normalize(p.PROVINCE).includes(normalize(filters.value.province.name || filters.value.province)));
  }

  if (filters.value.district) {
    base = base.filter((p) => normalize(p.DISTRICT).includes(normalize(filters.value.district)));
  }

  if (filters.value.village) {
    base = base.filter((p) => normalize(p.VILLAGE).includes(normalize(filters.value.village)));
  }

  // update postStore.posts เพื่อให้ filteredPosts ใช้งาน
  postStore.posts = base;
  currentPage.value = 1;
};


const openCreateModal = () => {
  modalMode.value = "create";
  currentPost.value = {
    VILLAGE: "",
    DISTRICT: "",
    PROVINCE: "",
    AREA: 0,
    PRICE: 0,
    CURRENCY: "LAK",
    TYPE: "",
    DESCRIPTION: "",
    STATUS: "",
    MAP_LOCATION: "",
    TEL: "",
    EMAIL: "",
    PROFILE_IMAGE: null,
    DETAILS_IMAGE: [],
    CREATED_BY: "ADMIN",
  };
  showModal.value = true;
};

const openEditModal = (post) => {
  modalMode.value = "edit";
  currentPost.value = { ...post };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleSave = async (postData) => {
  try {
    modalLoading.value = true;
    if (modalMode.value === "create") {
      await postStore.createPost(postData);
    } else {
      await postStore.updatePost(postData.id, postData);
    }
    closeModal();
  } catch (error) {
    console.error("Error saving post:", error);
  } finally {
    modalLoading.value = false;
  }
};

const handleSaved = async () => {
  try {
    await postStore.fetchPosts();
    console.log("🔄 Updated posts list after save");
  } catch (err) {
    console.error("Failed to fetch posts after save:", err);
  }
};


const deletePost = async (id) => {
  console.log("Delete ID:", id);

  try {
    const result = await modal.open({
      title: "ຢືນຢັນການລຶບ",
      message: "ທ່ານແນ່ໃຈທີ່ຈະລຶບຂໍ້ມູນນີ້ແທ້ບໍ?",
      type: "warning",
      showCancel: true,
      confirmButtonText: "ລຶບ",
      cancelButtonText: "ຍົກເລີກ",
    });

    if (result === "confirm") {
      const deletedData = await postStore.deletePost(id);
      
      if (deletedData && deletedData.error === "0") {
        await modal.open({
          title: "ສຳເລັດ",
          message: "ລຶບຂໍ້ມູນສຳເລັດແລ້ວ",
          type: "success",
          confirmButtonText: "OK",
        });
        await postStore.fetchPosts();
      }
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    await modal.open({
      title: "ຜິດພາດ",
      message: "ບໍ່ສາມາດລຶບຂໍ້ມູນໄດ້: " + error.message,
      type: "error",
      confirmButtonText: "OK",
    });
  }
};

const authorizePost = async (id) => {
  try {
    const result = await modal.open({
      title: "ຢືນຢັນການອະນຸມັດ",
      message: "ທ່ານແນ່ໃຈທີ່ຈະອະນຸມັດຂໍ້ມູນນີ້ແທ້ບໍ?",
      type: "warning",
      showCancel: true,
      confirmButtonText: "ອະນຸມັດ",
      cancelButtonText: "ຍົກເລີກ",
    });

    if (result === "confirm") {
      await postStore.authorizePost(id);
      
      await modal.open({
        title: "ສຳເລັດ",
        message: "ອະນຸມັດຂໍ້ມູນສຳເລັດແລ້ວ",
        type: "success",
        confirmButtonText: "OK",
      });
      
      console.log('อนุญาตการขายสำเร็จ');
      await postStore.fetchPosts(); // รีเฟรชข้อมูลหลังการดำเนินการ
    }
  } catch (error) {
    console.error('Failed to authorize post:', error);
    await modal.open({
      title: "ຜິດພາດ",
      message: "ບໍ່ສາມາດອະນຸມັດຂໍ້ມູນໄດ້: " + error.message,
      type: "error",
      confirmButtonText: "OK",
    });
  }
};

const disablePost = async (id) => {
  try {
    const result = await modal.open({
      title: "ຢືນຢັນການປິດການຂາຍ",
      message: "ທ່ານແນ່ໃຈທີ່ຈະປິດການຂາຍຂໍ້ມູນນີ້ແທ້ບໍ?",
      type: "warning",
      showCancel: true,
      confirmButtonText: "ປິດການຂາຍ",
      cancelButtonText: "ຍົກເລີກ",
    });

    if (result === "confirm") {
      await postStore.disablePost(id);
      
      await modal.open({
        title: "ສຳເລັດ",
        message: "ປິດການຂາຍສຳເລັດແລ້ວ",
        type: "success",
        confirmButtonText: "OK",
      });
      
      console.log('ปิดการขายสำเร็จ');
      await postStore.fetchPosts(); // รีเฟรชข้อมูลหลังการดำเนินการ
    }
  } catch (error) {
    console.error('Failed to disable post:', error);
    await modal.open({
      title: "ຜິດພາດ",
      message: "ບໍ່ສາມາດປິດການຂາຍໄດ້: " + error.message,
      type: "error",
      confirmButtonText: "OK",
    });
  }
};

const setPendingPost = async (id) => {
  try {
    const result = await modal.open({
      title: "ຢືນຢັນການຕັ້ງການລໍຖ້າ",
      message: "ທ່ານແນ່ໃຈທີ່ຈະຕັ້ງຂໍ້ມູນນີ້ໃຫ້ຢູ່ໃນສະຖານະລໍຖ້າແທ້ບໍ?",
      type: "warning",
      showCancel: true,
      confirmButtonText: "ຕັ້ງລໍຖ້າ",
      cancelButtonText: "ຍົກເລີກ",
    });

    if (result === "confirm") {
      await postStore.setPendingPost(id);
      
      await modal.open({
        title: "ສຳເລັດ",
        message: "ຕັ້ງສະຖານະລໍຖ້າສຳເລັດແລ້ວ",
        type: "success",
        confirmButtonText: "OK",
      });
      
      await postStore.fetchPosts(); // รีเฟรชข้อมูลหลังการดำเนินการ
    }
  } catch (error) {
    console.error('Failed to set pending post:', error);
    await modal.open({
      title: "ຜິດພາດ",
      message: "ບໍ່ສາມາດຕັ້ງສະຖານະລໍຖ້າໄດ້: " + error.message,
      type: "error",
      confirmButtonText: "OK",
    });
  }
};

// const filteredPosts = computed(() => {
//   if (!Array.isArray(postStore.posts)) {
//     return []
//   }

//   return postStore.posts.filter(post => {
//     const matchesSearch =
//       (post.TYPE?.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
//       (post.VILLAGE?.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
//       (post.DISTRICT?.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
//       (post.PROVINCE?.toLowerCase().includes(searchQuery.value.toLowerCase()))

//     const matchesStatus = statusFilter.value === 'all' || (post.status || 'pending') === statusFilter.value
//     return matchesSearch && matchesStatus
//   })
// })

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredPosts.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / itemsPerPage);
});

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

const filteredPosts = computed(() => {
  if (!Array.isArray(postStore.posts)) {
    return [];
  }

  return postStore.posts.filter((post) => {
    const matchesSearch =
      normalize(post.TYPE).includes(normalize(searchQuery.value)) ||
      normalize(post.VILLAGE).includes(normalize(searchQuery.value)) ||
      normalize(post.DISTRICT).includes(normalize(searchQuery.value)) ||
      normalize(post.PROVINCE).includes(normalize(searchQuery.value));

    const matchesStatus =
      statusFilter.value === "all" ||
      (post.status || "pending") === statusFilter.value;

    return matchesSearch && matchesStatus;
  });
});

</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.table-fixed {
  table-layout: fixed;
}

/* สำหรับการแสดงผลบน mobile */
@media (max-width: 768px) {
  .table-fixed {
    table-layout: auto;
  }
  
  .overflow-x-auto {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>