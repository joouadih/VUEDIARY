<template>

  <div class="feedback">
    <div class="modal" :class="feedbackClass" v-if="feedback.message">
      <div class="modal-background"></div>
      <div class="modal-content">
           {{ feedback.message }}
      </div>
      <button class="modal-close is-large" aria-label="close" @click="clearFeedback"></button>
    </div>
  </div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'feedback',
  computed: {
    ...mapGetters({
    	feedback: 'feedback/feedback',
      feedbackClass: 'feedback/feedbackClass',
    })
  },
  methods: {
  	...mapActions({
  		clearFeedback: 'feedback/clearFeedback'
  	})
  },
  watch: {
    $route () {
      this.clearFeedback();
    }
  }
}
</script>

<style scoped>

</style>
