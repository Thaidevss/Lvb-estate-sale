<template>
  <RouterView />
  <AlertModal ref="modalRef" />
</template>

<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted, getCurrentInstance } from 'vue'
import AlertModal from './components/AlertModal.vue'

const modalRef = ref();
const loadingRef = ref();

onMounted(() => {

  const internalInstance = getCurrentInstance()
  if (internalInstance) {
    internalInstance.appContext.config.globalProperties.$modal = {
      open: (title, message) => {
        return modalRef.value?.open(title, message)
      }
    }

    internalInstance.appContext.config.globalProperties.$loading = {
      show: () => loadingRef.value?.show(),
      hide: () => loadingRef.value?.hide(),
    }
  }
})
</script>