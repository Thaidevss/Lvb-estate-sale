<template>
  <div class="posts-management">
    <!-- Header / Filters -->
    <div class="bg-white rounded-md shadow-md p-6 px-10 mb-6 space-y-4">
      <!-- Search + Status -->
      <div
        class="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <!-- Search Input -->
        <div class="relative w-full lg:max-w-md">
          <MagnifyingGlassIcon
            class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="ຄົ້ນຫາປະກາດ..."
            class="pl-10 pr-4 py-2 w-full text-sm border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Status Filter + Add Button -->
        <div class="flex items-center gap-2">
          <select
            v-model="statusFilter"
            class="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">ທັງໝົດ</option>
            <!-- <option value="pending">ລໍຖ້າອະນຸມັດ</option>
            <option value="approved">ອະນຸມັດແລ້ວ</option>
            <option value="rejected">ຖືກປະຕິເສດ</option> -->
          </select>
          <button
            @click="openCreateModal"
            :disabled="postStore.loading"
            class="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition flex items-center"
          >
            <PlusIcon class="w-4 h-4 mr-2" />
            <span v-if="!postStore.loading">ເພີ່ມໃໝ່</span>
            <span v-else>ກຳລັງໂຫຼດ...</span>
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center"
      >
        <select
          v-model="filters.type"
          class="border border-gray-300 rounded px-3 py-1.5 text-sm"
        >
          <option value="">ປະເພດທັງໝົດ</option>
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
          class="border border-gray-300 rounded px-3 py-1.5 text-sm"
        >
          <option value="">ແຂວງ</option>
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
          class="border border-gray-300 rounded px-3 py-1.5 text-sm"
        >
          <option value="">ເມືອງ</option>
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
          class="border border-gray-300 rounded px-3 py-1.5 text-sm"
        >
          <option value="">ບ້ານ</option>
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
          class="bg-blue-600 text-white rounded px-4 py-2 text-sm hover:bg-blue-700 transition w-full lg:w-auto"
        >
          ຄົ້ນຫາ
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
    <div
      v-if="!postStore.loading"
      class="bg-white rounded-lg shadow overflow-auto"
    >
      <table class="min-w-full divide-y divide-gray-200 text-sm">
        <thead class="bg-gray-50 text-gray-700 font-medium text-left">
          <tr>
            <th class="px-4 py-3">No.</th>
            <th class="px-4 py-3">ຮູບ</th>
            <th class="px-4 py-3">ປະເພດ</th>
            <th class="px-4 py-3">ລາຄາ</th>
            <th class="px-4 py-3">ເນື້ອທີ່</th>
            <th class="px-4 py-3">ສະຖານທີ່</th>
            <th class="px-4 py-3">ລາຍລະອຽດ</th>
            <th class="px-4 py-3 text-center">ຈັດການ</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="(post, index) in paginatedPosts"
            :key="post.id"
            class="hover:bg-gray-50"
          >
            <td class="text-center font-bold">{{ index + 1 }}</td>
            <td class="px-4 py-2">
              <!-- <img
              v-if="post?.IMAGES?.PROFILE_IMAGE"
              :src="getProfileImageUrl(post.IMAGES)"
              alt="Property preview"
              class="w-full h-40 object-cover p-1 rounded-lg"
            /> -->
              <img
                v-if="post.IMAGES && post.IMAGES.PROFILE_IMAGE"
                :src="
                  post?.IMAGES?.PROFILE_IMAGE
                    ? getProfileImageUrl(post.IMAGES)
                    : defaultImage
                "
                @error="handleImageError"  
                alt="Property preview"
                class="w-full h-40 object-cover p-1 rounded cursor-pointer hover:opacity-90 transition"
              />
            </td>
            <td class="px-4 py-2 text-xs">{{ post.TYPE || "N/A" }}</td>
            <td class="px-4 py-2 text-xs">
              {{ (post.PRICE || 0).toLocaleString() }} {{ post.CURRENCY }}
            </td>
            <td class="px-4 py-2 text-xs">{{ post.AREA || 0 }} ຕມ.</td>
            <td class="px-4 py-2 text-xs">{{ formatLocation(post) }}</td>
            <td class="px-4 py-2 w-2/6 text-xs">{{ post.DESCRIPTION }}</td>
            <td class="px-4 py-2 text-right space-x-2 w-40">
              <button
                class="text-blue-600 hover:bg-blue-600 hover:text-white hover:cursor-pointer duration-75 text-xs border border-blue-600 rounded py-1 px-2"
                @click="openEditModal(post)"
                :disabled="postStore.loading"
              >
                <span class="flex">
                  <PencilIcon class="w-3.5 h-3.5" />
                  ແກ້ໄຂ
                </span>
              </button>
              <button
                class="text-red-600 hover:bg-red-600 hover:text-white hover:cursor-pointer duration-75 text-xs border border-red-600 rounded py-1 px-2"
                @click="deletePost(post.id)"
                :disabled="postStore.loading"
              >
                <span class="flex">
                  <TrashIcon class="w-3.5 h-3.5" />
                  ລຶບ
                </span>
              </button>
            </td>
          </tr>
          <tr v-if="filteredPosts.length === 0 && !postStore.loading">
            <td colspan="7" class="py-6 text-gray-500 mx-auto w-full">
              <div class="text-center py-70 mx-auto">
                <img
                  class="mx-auto h-20 w-20"
                  src="../../assets/images/box.png"
                  alt=""
                />
                <p>Data is Empty.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, getCurrentInstance, watch } from "vue";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import PostModal from "../admin/components/PostModal.vue";
import { usePostStore } from "../../stores/indexStore";
import { getImageUrl, getProfileImageUrl } from "../../utils/getImage";
import { getDefaultImage } from "../../utils/getImage";
import { useLocationStore } from "../../stores/locationStore";
import LoadingSpinner from "../../components/common/Loading.vue";

// for alert modal
const { $modal, $loading } =
  getCurrentInstance().appContext.config.globalProperties;
const modal = getCurrentInstance().appContext.config.globalProperties.$modal;

const postStore = usePostStore();
const locationStore = useLocationStore();

// Filters
const searchQuery = ref("");
const statusFilter = ref("all");

// Modal state
const showModal = ref(false);
const modalMode = ref("create");
const currentPost = ref({});
const modalLoading = ref(false);

// for pagination
const currentPage = ref(1);
const itemsPerPage = 5;

const defaultImage = ref(getDefaultImage());

const filters = ref({
  type: "",
  province: "",
  district: "",
  village: "",
});

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
    await locationStore.fetchProvinces();
    await locationStore.fetchTypes();
    await postStore.fetchPosts();
    console.log("Loaded posts:", postStore.posts);
    console.log("token:", localStorage.getItem("token"));
  } catch (error) {
    console.error("Error loading posts:", error);
  }
});

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

const applyFilters = async () => {
  const apiFilters = {
    TYPE: filters.value.type || "",
    PROVINCE: filters.value.province?.name || filters.value.province || "",
    DISTRICT: filters.value.district || "",
    VILLAGE: filters.value.village || "",
  };
  await postStore.fetchPosts(apiFilters);
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

// const deletePost = async (id) => {
//   console.log('Delete ID:', id);

//   if (!confirm('ທ່ານແນ່ໃຈທີ່ຈະລຶບຂໍ້ມູນນີ້ແທ້ບໍ?')) {
//     return;
//   }

//   try {
//     await postStore.deletePost(id);
//     alert('ລຶບຂໍ້ມູນສຳເລັດແລ້ວ!');
//     // โหลดข้อมูลใหม่หรืออัปเดต UI
//     await postStore.fetchPosts();
//   } catch (error) {
//     console.error('Error deleting post:', error);
//     alert(`ລຶບຂໍ້ມູນບໍ່ສຳເລັດ: ${error.message}`);
//   }
// };


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
    currentPage.value = 1; // รีเซ็ตหน้าเมื่อไม่มีข้อมูล
    return [];
  }

  const filtered = postStore.posts.filter((post) => {
    const matchesSearch =
      post.TYPE?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.VILLAGE?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.DISTRICT?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.PROVINCE?.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesStatus =
      statusFilter.value === "all" ||
      (post.status || "pending") === statusFilter.value;
    return matchesSearch && matchesStatus;
  });

  // รีเซ็ตไปที่หน้าแรกเมื่อผลลัพธ์การกรองเปลี่ยน
  if (
    currentPage.value > 1 &&
    filtered.length <= (currentPage.value - 1) * itemsPerPage
  ) {
    currentPage.value = 1;
  }

  return filtered;
});
</script>
