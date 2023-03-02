<template>
  <div class='notes_block'>
    <NoteTasksList
        v-for="note in noteLists"
        :note="note"
        :key="note.id"
      ></NoteTasksList>
  </div>
</template>

<script>
import NoteTasksList from '@/components/NoteTasksList.vue'

export default {
  name: 'NotesBlock',
  components: {
    NoteTasksList
  },
  data: () => ({
    isModalOpen: false
  }),
  computed: {
    noteLists () {                                
      return this.$store.getters.TODO_LISTS
    }
  }
}
</script>

<style scoped>
.notes_block {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem 0.3rem;
}
</style>
