<template>
  <div class="modal_window">
    <div class="modal_container">
      <div class="modal_close">
        <button class="btn_modal_close" @click="onClose(false)">
          Х
        </button>
      </div>
      <div class="modal_hero">
        <div class="modal_text">
          {{ text }}
        </div>
        <div class="modal_control">
          <GeneralButton @click="onClose(true)" class="btn_confirm">
            Yes
          </GeneralButton>
          <GeneralButton @click="onClose(false)" class="btn_confirm">
            No
          </GeneralButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GeneralButton from '@/components/GeneralButton.vue'

export default {
  name: 'ModalWindow',
  components: {
    GeneralButton
  },
  props: {
    onClose: {
      type: Function,
      required: true
    },
    text: {
      type: String,
    },
    isModalOpen: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    close(state) {
      return () => {
        this.onClose(state)
      }
    },
  }
}
</script>

<style scoped>
.modal_window {
  display: flex;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgb(14 13 13 / 67%);
}

.modal_container {
  position: relative;
  top: 15%;
  max-width: 27.22rem;
  width: 100%;
  height: 14.22rem;
  margin: 0 0.3rem;
  padding: 10px;
  background:#f3e2b5;
  box-shadow: 0px 2px 7px rgb(24 31 31 / 77%);
}

.modal_hero {
  padding: 0.6rem;
  height: 12rem;
}

.modal_control {
  margin-top: 1.1rem;
}

.modal_control button:first-child {
  margin-right: 20px;
}

.modal_text {
  height: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
}

.modal_close {
  position: absolute;
  top: 5px;
  right: 5px;
}

.btn_modal_close {
  border: none;
  background: inherit;
  font-size: 1.3rem;
  cursor: 
  pointer;
}
.btn_confirm {
   width: 8rem;
   padding: 0.5rem;
}
</style>
