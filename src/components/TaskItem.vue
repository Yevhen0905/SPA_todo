<template>
  <li class="task_item" :class="{ 'task_item_done': item.done }">
    <div v-if="edit" class="task_edit">
      <input class="task_checkbox" type="checkbox" v-model="item.done" />
      <input class="task_text" :disabled="item.done" required minlength='1' type="text" v-model="item.text" />
      <button class="btn_delete_item" title="delete task" type="button" @click="deleteItem">
        <i class="fa-solid fa-minus"></i>
      </button>
    </div>
    <div v-else class="task_not_edit">
      <input class="task_checkbox" type="checkbox" :checked="item.done" disabled="true" />
      <p class="task_text_not_edit"> {{ item.text }} </p>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    item: {                                    
      type: Object,
      required: true
    },
    edit: {                                   
      type: Boolean,
      required: true
    },
    deleteItemAction: {                             
      type: Function,
      default: function () { }
    }
  },
  methods: {                        
    deleteItem() {
      return this.deleteItemAction(this.item.id)
    }
  }
}
</script>

<style scoped lang="scss">
.task_item {
  list-style: none;
}

.task_text {
  width: 100%;
  padding: 0.6rem 0.5rem;
  font-size: 1rem;
  border-radius: 10px;
  border: 2px solid #4bad60;
  margin-bottom: 0.1rem;

  &:focus {
    box-shadow: 1px 1px 5px #4bad60;
    outline: none;
  }
}

.btn_delete_item {
  border: none;
  background-color: inherit;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.5s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
  }
}

.task_edit {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* динамічний клас для текста якщо виконано то буде перекреслено */
.task_item_done .task_text {
  text-decoration: line-through;
}

.task_checkbox {
  width: 17px;
  height: 17px;
  margin-right: 0.3rem;
}

.task_not_edit {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.task_text_not_edit {
  height: 18px;
  ;
  overflow: hidden;
  font-style: italic;
  text-align: start;
}

.fa-solid, .fas {
  color: #c12d4a;
}</style>
