<template>
  <div class="settings-page">
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold mb-6">ຕັ້ງຄ່າລະບົບ</h2>
      
      <div class="space-y-8">
        <!-- General Settings -->
        <div class="border-b border-gray-200 pb-6">
          <h3 class="text-md font-medium text-gray-900 mb-4">ການຕັ້ງຄ່າທົ່ວໄປ</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ຊື່ເວັບໄຊ</label>
              <input type="text" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="settings.siteName">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ອີເມວຕິດຕໍ່</label>
              <input type="email" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="settings.contactEmail">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ເບີໂທຕິດຕໍ່</label>
              <input type="tel" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="settings.contactPhone">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ສະຖານທີ່</label>
              <input type="text" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="settings.location">
            </div>
          </div>
        </div>

        <!-- Post Settings -->
        <div class="border-b border-gray-200 pb-6">
          <h3 class="text-md font-medium text-gray-900 mb-4">ການຕັ້ງຄ່າປະກາດ</h3>
          <div class="space-y-4">
            <div class="flex items-center">
              <input type="checkbox" id="postApproval" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" v-model="settings.postApproval">
              <label for="postApproval" class="ml-2 block text-sm text-gray-700">ຕ້ອງອະນຸມັດກ່ອນເຜີຍແຜ່ປະກາດ</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="allowEdit" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" v-model="settings.allowEdit">
              <label for="allowEdit" class="ml-2 block text-sm text-gray-700">ອະນຸຍາດໃຫ້ແກ້ໄຂປະກາດຫຼັງອະນຸມັດ</label>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ຈຳນວນປະກາດຕໍ່ໜ້າ</label>
              <select class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="settings.postsPerPage">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="border-b border-gray-200 pb-6">
          <h3 class="text-md font-medium text-gray-900 mb-4">ການແຈ້ງເຕືອນ</h3>
          <div class="space-y-4">
            <div class="flex items-center">
              <input type="checkbox" id="emailNotification" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" v-model="settings.emailNotification">
              <label for="emailNotification" class="ml-2 block text-sm text-gray-700">ແຈ້ງເຕືອນຜ່ານອີເມວ</label>
            </div>
            <div class="flex items-center">
              <input type="checkbox" id="smsNotification" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" v-model="settings.smsNotification">
              <label for="smsNotification" class="ml-2 block text-sm text-gray-700">ແຈ້ງເຕືອນຜ່ານ SMS</label>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ອີເມວຮັບການແຈ້ງເຕືອນ</label>
              <input type="email" class="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="settings.notificationEmails">
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end">
          <button 
            @click="saveSettings"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ບັນທຶກການປ່ຽນແປງ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const settings = ref({
  siteName: 'ລາວອອກຊັບສິນ',
  contactEmail: 'contact@laoasset.com',
  contactPhone: '020 12345678',
  location: 'ນະຄອນຫຼວງວຽງຈັນ',
  postApproval: true,
  allowEdit: false,
  postsPerPage: '10',
  emailNotification: true,
  smsNotification: false,
  notificationEmails: 'admin@laoasset.com,notify@laoasset.com'
})

const saveSettings = () => {
  // ส่งข้อมูลไปยัง API
  console.log('Saving settings:', settings.value)
  alert('ບັນທຶກການຕັ້ງຄ່າສຳເລັດແລ້ວ')
}
</script>