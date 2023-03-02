<template>
  <div class="note_list">
    <div class="note_list_title"> {{ note.title }} </div>
    <ul class="notes_container">
      <TaskItem 
        v-for="note in tasksListSorted" 
        :item="note" 
        :key="note.id" 
        :edit="false"
        />
    </ul>
    <div>
      <router-link 
        class="open_more_tasks" 
        title="see all" 
        v-if="isMoreTasks"
        :to="{ name: 'NoteAddChange', params: { id: note.id }}"
        >
        <div class="more_tasks">...</div>
      </router-link>
      <div v-else></div>
    </div>
    <div class="note_list_control">
      <router-link 
        class="note_list_edit" 
        title='edit' 
        :to="{ name: 'NoteAddChange', params: { id: note.id }}"
        >
        <GeneralButton class="btn_edit">
          <i class="fa-solid fa-file-pen"></i>
        </GeneralButton>
      </router-link>
      <a class="note_delete" title="delete">
        <GeneralButton class="note_list_delete" @click="deleteListNote">
          <i class="fa-solid fa-trash-can"></i>
        </GeneralButton>
      </a>
    </div>
  </div>
</template>

<script>
import TaskItem from '@/components/TaskItem.vue'
import GeneralButton from '@/components/GeneralButton.vue'

export default {
  name: 'NoteTasksList',
  props: {
    note: {                      
      type: Object,
    }
  },
  components: {
    TaskItem,
    GeneralButton
  },
  computed: {
    tasksListSorted() {
      let tasksNoteCopy = [...this.note.tasksList]
      tasksNoteCopy = tasksNoteCopy.map(task => { return { ...task } })
      tasksNoteCopy.sort((a, b) => {
        if (a.done === b.done) {
          return 0
        } else if (a.done === false) {
          return -1
        } else {
          return 1
        }
      })
      return tasksNoteCopy.slice(0, 4)        
    },
    isMoreTasks() {
      return this.note.tasksList.length > 4       
    }
  },
  methods: {
    deleteListNote() {
      this.$store.dispatch('showModal', {
        text: `Хочете видалити нотатку? (${this.note.title})`,
        callBack: this.handleConfirmation(this._deleteListNote)
      })
    },
    _deleteListNote() {
      this.$store.dispatch('deleteNote', this.note.id)
    },
    handleConfirmation(callbackConfirmed, callbackEjected = null) {
      return (confirmed) => {
        if (confirmed) {
          callbackConfirmed()
        } else if (callbackEjected !== null) {
          callbackEjected()
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.note_list {
  padding: 2rem 3rem 2rem;
  border-radius: 15px;
  background-color: rgb(128 181 202 / 85%);
  max-width: 18rem;
  width: 300px;
  min-height: 22rem;
  display: grid;
  grid-template-rows: 60px 1fr 43px 46px;
  grid-template-columns: 100%;
}

.note_list_title {
  font-weight: 700;
  font-size: 1.5rem;
}

.notes_container {
  margin-bottom: 1.5rem;
}
.note_list_control {
    display: flex;
    justify-content: space-between;
}
.more_tasks {
    font-size: 2rem;
}
.fa-solid {
  font-size: 1.89rem;
}
</style>
