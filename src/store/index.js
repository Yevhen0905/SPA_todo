import Vue from 'vue'
import Vuex from 'vuex'

import {
  loadState,
  saveState
} from './localStorage'

const startState = {}
startState.todoLists = loadState() || [] 

startState.prompt = {
  text: '',
  confirmed: null,
  isModalOpen: false,
  callBack: null
}

Vue.use(Vuex)

const store = new Vuex.Store({
  state: startState,
  mutations: {
    addNote(state) {
      let newId //нова id
      const listsLength = state.todoLists.length
      if (listsLength > 0) { 
        const lastList = state.todoLists[state.todoLists.length - 1]  
        newId = lastList.id + 1  
      } else {
        newId = 1
      }
      state.todoLists.push({ 
        id: newId,
        title: `${newId} notes`,
        tasksList: []
      })
    },
    deleteNote(state, id) { 
      state.todoLists = state.todoLists.filter(list => list.id !== id)
    },
    updateNote(state, updatedList) { 
      const index = state.todoLists.findIndex(list => list.id === updatedList.id)  
      if (index !== -1) {                  
        state.todoLists[index] = updatedList
      }
    },
    showModal(state, { text, callBack }) { 
      state.prompt = {
        text,
        confirmed: null,
        isModalOpen: true,
        callBack
      }
    },
    closeModal(state, confirmed) { 
      state.prompt = {
        ...state.prompt,
        text: '',
        isModalOpen: false,
        confirmed
      }
      const callBack = state.prompt.callBack
      if (callBack != null) {
        callBack(confirmed)
      }
    }
  },


  actions: {
    addNote: (context) => {
      context.commit('addNote')
      return context.state.todoLists[context.state.todoLists.length - 1].id         
    },
    deleteNote: (context, id) => {
      context.commit('deleteNote', id)
    },
    updateNote: (context, updatedList) => {
      context.commit('updateNote', updatedList)
    },
    showModal: (context, { text, callBack }) => {
      context.commit('showModal', {
        text,
        callBack
      })
    },
    closeModal: (context, confirmed) => {
      context.commit('closeModal', confirmed)
    }
  }, 
  getters: {
    TODO_LISTS: state => state.todoLists,
    PROMPT: state => state.prompt
  }
})

const TodoListsMutationTypes = ['addNote', 'deleteNote', 'updateNote']

store.subscribe((mutation, state) => {
  if (TodoListsMutationTypes.includes(mutation.type)) {
    saveState(state.todoLists)
  }
})

export default store