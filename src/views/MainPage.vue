<template>
  <div class='main_page'>
    <h1 class="main_page_title">NOTES</h1>
    <a @click="addNoteList()" class='add_button'>add note</a>
    <NotesBlock />
  </div>
</template>

<script>
import NotesBlock from '@/components/NotesBlock.vue'

export default {
  name: 'MainPage',
  components: {
    NotesBlock
  },
  methods: {
    addNoteList: async function () {
      const newNoteId = await this.$store.dispatch('addNote')    
      this.$router.push({
        name: 'NoteAddChange',                                   
        params: { id: newNoteId },
        query: { new: 'true' }                                  
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main_page {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 0.8rem;
}

.main_page_title {
  margin-bottom: 2rem;
  font-size: 2.5rem;
  color: #cf4230;
}

.add_button {
  display: inline-block;
  position: relative;
  background-color: #e2b8b8;
  border-radius: 2rem;
  font-size: 1.8rem;
  color: white;
  padding: 1rem 2rem;
  user-select: none;
  text-align: center;
  cursor: pointer;
  transition-duration: 0.4s;
  margin-bottom: 2rem;
  border: 5px solid #d79bae;
  box-shadow: 0px 2px 7px rgb(24 31 31 / 77%);
}

.add_button:hover {
  transition-duration: 0.1s;
  color: #68a169;
  background-color: #ef9d9d;
  border: 5px solid #68a169;
}

.add_button:after {
  content: "";
  display: block;
  position: absolute;
  border-radius: 2em;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.5s;
  box-shadow: 0 0 10px 40px white;
}

.add_button:active:after {
  box-shadow: 0 0 0 0 white;
  position: absolute;
  border-radius: 2em;
  left: 0;
  top: 0;
  opacity: 1;
  transition: 0s;
}

.add_button:active {
  top: 3px;
}
</style>
