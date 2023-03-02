<template>
  <button
    class="btn_general"
    :type="type"
    @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'GeneralButton',
  props: {
    type: {
      type: String,
      default: 'button'
    }
  }
}
</script>

 <style scoped lang="scss">
  .btn_general {
    font-size: 1.1rem;
    color: #fff;
    background-color: #84848c;
    border: none;
    border-radius: 0.5rem;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    box-shadow: 0px 2px 7px rgb(24 31 31 / 77%);

    &:hover {
      background-color: #dc8a8a;
    }
  }
  .btn_general:active:not([disabled]) {
    background-color: #f6653c;
  
  }
  .btn_general[disabled] {
    background-color: white;
 
  }
</style>
