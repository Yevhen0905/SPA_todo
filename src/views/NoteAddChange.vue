<template>
  <div class="note_add_change">
    <div class="note_add_head">
      <div class="note_add_input">
        <input class="note_add_title" 
           required 
           v-model="todoListLocal.title" 
           placeholder="name note..." />
      </div>
      <div class="note_add_buttons">
        <GeneralButton class="btn_delete" @click="deleteListNote" title="delete" >
          <i class="fa-solid fa-trash-can"></i>
        </GeneralButton>
        <div class="buttons_arrow">
          <GeneralButton class="btn_undo" title="undo" @click="undoChanges" :disabled="todoNotChanged" >
            <i class="fa-sharp fa-solid fa-arrow-left"></i>
          </GeneralButton>
          <GeneralButton class="btn_redo" title="redo" :disabled="!(redoEnabled)" @click="redoChanges" >
            <i class="fa-sharp fa-solid fa-arrow-right"></i>
          </GeneralButton>
        </div>
      </div>
    </div>
    <div class="tasks_container">
      <TaskItemNew :callback="addTask" />
      <TaskItem
        class="task_item" 
        v-for="item in todoListLocal.tasksList" 
        :item="item" 
        :key="item.id"
        :edit="true"
        :deleteItemAction="deleteTask"
        />
    </div>
    <div class="note_add_confirm">
      <GeneralButton @click="cancelChanges" class="btn_confirm">
      cancel
    </GeneralButton>
    <GeneralButton type="button" @click="saveChanges" class="btn_confirm">
      save
    </GeneralButton>
    </div>
  </div>
</template>

<script>
import TaskItem from '@/components/TaskItem.vue'
import TaskItemNew from '@/components/TaskItemNew.vue'
import GeneralButton from '@/components/GeneralButton.vue'


export default {
  name: 'NoteAddChange',
  components: {
    TaskItem,
    TaskItemNew,
    GeneralButton
  },
  data() {
    return {
      todoListLocal: null,        
      todoListLastChange: null, 
      redoEnabled: false,
    }
  },
  computed: {
    id() {                                         
      return this.$route.params.id
    },
    todoList() {
      return this.$store.getters.TODO_LISTS                 
        .find(list => list.id === parseInt(this.id))
    },
    todoNotChanged() {                                                                  
      return JSON.stringify(this.todoList) === JSON.stringify(this.todoListLocal)
    },
    isNew() {                                            
      return this.$route.query.new === 'true'
    }
  },
  methods: {
    addTask(text) {                                                       
      this.todoListLocal.tasksList.push({
        id: this.todoListLocal.tasksList.length + 1,                   
        done: false,
        text: text                                                       
      })
    },
    deleteTask(taskId) {                                              
      this.todoListLocal.tasksList = this.todoListLocal.tasksList
        .filter(task => task.id !== taskId)
    },
    deleteListNote() {           
      this.$store.dispatch('showModal', { text: 'Хочете видалити нотаток?', callBack: this.handleConfirmation(this._deleteListNote) })
    },     
    handleConfirmation(callbackConfirmed, callbackEjected = null) {     
      return (confirmed) => {
        if (confirmed) {
          callbackConfirmed()
        } else if (callbackEjected !== null) {
          callbackEjected()
        }
      }
    },
    _deleteListNote() {                   
      this.$store.dispatch('deleteNote', this.todoListLocal.id)
      this.goHome()
    },
    cancelChanges() {           
      if (this.isNew) {
        this.$store.dispatch('showModal', {            
          text: 'Хочете відминити створення?',
          callBack: this.handleConfirmation(this._deleteListNote)
        })
      } else {
        this.$store.dispatch('showModal', {             
          text: 'Хочете відминити редагування?',
          callBack: this.handleConfirmation(this.goHome) 
        })
      }
    },
    undoChanges() {                                  
      if (this.todoNotChanged) {          
        return false
      }
      this.todoListLastChange = { ...this.todoListLocal }   
      this.todoListLocal = JSON.parse(JSON.stringify(this.todoList))   // 
      this.redoEnabled = true                           
    },
    redoChanges() {                                                   
      if (this.todoListLastChange === null) {
        return false
      }
      this.todoListLocal = JSON.parse(JSON.stringify(this.todoListLastChange))     
      this.todoListLastChange = null                                              
      this.redoEnabled = false
    },
    saveChanges(e) {
      e.preventDefault()                                                    
      if (!this.todoListLocal.title) {
        this.todoListLocal.title = this.todoList.title                     
      }
      this.updateListNote()
      this.goHome()
    },
    goHome() {                  
      this.$router.push({ name: 'MainPage' })
    },
    updateListNote() {                      
      this.$store.dispatch('updateNote', this.todoListLocal)
    }
  },
  created() {                                 
    this.todoListLocal = JSON.parse(JSON.stringify(this.todoList))
  }
}
</script>

<style scoped lang="scss">
.note_add_change {
  padding: 50px 0;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.note_add_input {
  width: 40%;
  margin: 0 auto 18px;
}

.note_add_title {
  width: 100%;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  font-size: 1.2rem;
  border: 2px solid #b4abab;

  &:focus {
    box-shadow: 1px 1px 5px #1b9441;
    outline: none;
  }
}
.note_add_buttons {
  margin-bottom: 50px;
  display: flex;
    justify-content: space-around;
}
.buttons_arrow {
    display: flex;
    gap: 20px;
}
.tasks_container {
    width: 80%;
    margin: 0 auto;
}

.note_add_confirm {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    width: 40%;
    margin: 1.8rem auto;
}
.btn_confirm {
   width: 8rem;
   padding: 0.5rem;
}
.fa-solid {
    font-size: 1.89rem;
}
.fa-sharp {
    color: #8a3939;
}
</style>
