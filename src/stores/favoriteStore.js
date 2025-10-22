// stores/favoriteStore.js
import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: JSON.parse(Cookies.get('favorites') || '[]')
  }),

  getters: {
    isFavorite: (state) => (id) => state.favorites.includes(id),
    favoriteCount: (state) => state.favorites.length
  },

  actions: {
    toggleFavorite(id) {
      if (this.favorites.includes(id)) {
        this.favorites = this.favorites.filter(favId => favId !== id)
      } else {
        this.favorites.push(id)
      }

      // เก็บ cookie ไว้ 7 วัน
      Cookies.set('favorites', JSON.stringify(this.favorites), { expires: 7 })
    },

    addFavorite(id) {
      if (!this.favorites.includes(id)) {
        this.favorites.push(id)
        Cookies.set('favorites', JSON.stringify(this.favorites), { expires: 7 })
      }
    },

    removeFavorite(id) {
      this.favorites = this.favorites.filter(favId => favId !== id)
      Cookies.set('favorites', JSON.stringify(this.favorites), { expires: 7 })
    },

    clearFavorites() {
      this.favorites = []
      Cookies.remove('favorites')
    },

    // ฟังก์ชันสำหรับตรวจสอบว่ามี favorites หรือไม่
    hasFavorites() {
      return this.favorites.length > 0
    }
  }
})