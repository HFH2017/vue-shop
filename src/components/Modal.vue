<template>
  <div>
    <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':showModal}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">提示：</div>
          <button class="md-close" @click="closeModal">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name="message"></slot>
          </div>
          <div class="btn-wrap" @click="closeModal">
            <slot name="btn"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="showModal" @click="closeModal"></div>
  </div>
</template>
<style>

</style>
<script>
export default {
  props:["showModal"],
  methods:{
    closeModal(){ 
      this.$emit("close")
    }
  }
}
</script>

