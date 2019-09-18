<template>
  <div class="box loading" v-if="isLoading">
  	<div class="container">
  		<h2 class="title loadingdots"> Loading </h2>
  	</div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'loading',
  computed: {
    ...mapGetters({
    	isLoading: 'loading/isLoading'
    })
  }
}
</script>

<style scoped>

  .box
  {
    width:200px;
  }

	div.loading
	{
  		position : fixed;
  		bottom : 20px;
  		left : 0;
  		right : 0;
      font-size: 3em
	}
  /* loading dots */

  .loadingdots:after
  {
      content: ' .';
      animation: dots 1s steps(5, end) infinite;
  }

  @keyframes dots
  {
      0%, 20%
      {
        color: rgba(0,0,0,0);
        text-shadow:
          .25em 0 0 rgba(0,0,0,0),
          .5em 0 0 rgba(0,0,0,0);
      }

      40%
      {
        color: white;
        text-shadow:
          .25em 0 0 rgba(0,0,0,0),
          .5em 0 0 rgba(0,0,0,0);
      }

      60%
      {
        text-shadow:
          .25em 0 0 white,
          .5em 0 0 rgba(0,0,0,0);
      }

      80%, 100%
      {
        text-shadow:
          .25em 0 0 white,
          .5em 0 0 white;
      }
  }



</style>
