<template>
  <form class="task_item_new" @submit.prevent>
    <input class="task_item_input" v-model="newTodoText" placeholder='what should be done?..' required />
    <button class="task_item_btn" @click="addTodo" title="add task" type="submit">+</button>
  </form>
</template>

<script>
export default {
  name: 'TaskItemNew',
  props: {
    callback: {                                   
      type: Function,
      required: true
    }
  },
  data() {
    return {
      newTodoText: ''
    }
  },
  methods: {
    addTodo() {                                                     
      const newTodoText = this.newTodoText                            
      if (!newTodoText) {                                         
        return false
      }
      setTimeout(() => {                                              
        this.callback(newTodoText)
        this.newTodoText = ''
      }, 0)
    }
  }
}
</script>

<style scoped lang="scss">
.task_item_new {
  display: flex;
  margin: 0 0 1.2rem 1.3rem;
}

.task_item_input {
  width: 100%;
  padding: 0.6rem 0.5rem;
  font-size: 1rem;
  border-radius: 10px;
  border: 2px solid #baa0a0;

  &:focus {
    box-shadow: 1px 1px 5px #c12d4a;
    outline: none;
  }
}

.task_item_btn {
  color: #c12d4a;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.5s ease;
  padding: 0;
  margin: 0 4px;
  background: none;
  border: none;

  &:hover {
  transform: scale(1.4);
}
}

</style>
