<template>
  <div id="app">
    <router-view/>
      <ModalWindow
          v-show="isModalOpen"
          :onClose="closeModal"
          :text="text"
          :isModalOpen="isModalOpen"
        />

  </div>
</template>

<script>
import ModalWindow from '@/components/ModalWindow.vue'

export default {
  name: 'App',
  components: {
    ModalWindow
  },
  methods: {
    closeModal (confirmed) {        
      this.$store.dispatch('closeModal', confirmed)   
    }
  },
  computed: {
    isModalOpen () {
      return this.$store.getters.PROMPT.isModalOpen
    },
    text () {
      return this.$store.getters.PROMPT.text
    }
  }
}
</script>

<style>


</style>

