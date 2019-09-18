<template>

  <div class="register columns">


    <div class="column is-half">

        <h1 class="title is-3">Sign Up</h1>

        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input id="username" class="input" type="text" placeholder="Username" v-model="user.username">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>

        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input id="email_address" class="input" type="email" placeholder="Email" v-model="user.email">
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check"></i>
            </span>
          </p>
        </div>

        <div class="field">
          <p class="control has-icons-left">
            <input id="password" class="input" type="password" placeholder="Password" v-model="user.password">
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </p>
        </div>

        <div class="field">
          <p class="control">
            <button class="button is-primary" @click.prevent="register(user)">
              Sign Up
            </button>
          </p>
        </div>
    </div>

    <div class="column is-two-fifths">
      <svg id="Layer_1_1_" style="enable-background:new 0 0 52 41;" version="1.1" viewBox="0 0 52 41" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M37,0c-4.216,0-8.162,1.742-11,4.818C23.162,1.742,19.216,0,15,0C6.729,0,0,6.729,0,15s6.729,15,15,15  c5.514,0,10,4.486,10,10c0,0.553,0.448,1,1,1s1-0.447,1-1c0-5.514,4.486-10,10-10c8.271,0,15-6.729,15-15S45.271,0,37,0z M37,28  c-4.913,0-9.146,2.968-11,7.205C24.146,30.968,19.913,28,15,28C7.832,28,2,22.168,2,15S7.832,2,15,2  c4.003,0,7.726,1.813,10.214,4.977c0.38,0.482,1.192,0.482,1.572,0C29.274,3.813,32.997,2,37,2c7.168,0,13,5.832,13,13  S44.168,28,37,28z"/><path d="M26,11c-6.994,0-12.514,6.074-12.745,6.333c-0.34,0.38-0.34,0.954,0,1.334C13.486,18.926,19.006,25,26,25  s12.514-6.074,12.745-6.333c0.34-0.38,0.34-0.954,0-1.334C38.514,17.074,32.994,11,26,11z M26,23c-4.81,0-9.012-3.501-10.591-5  c1.579-1.499,5.781-5,10.591-5s9.012,3.501,10.591,5C35.012,19.499,30.81,23,26,23z"/><circle cx="26" cy="18" r="2"/></svg>
    </div>

  </div>

</template>

<script>

import Auth from '../../services/Auth';
import { mapActions } from 'vuex';

export default {
  name: 'register',
  data () {
    return {
    	user: {
    		username: '',
    		email: '',
    		password: ''
    	}
    }
  },
  methods: {
  	...mapActions({
  		setFeedback: 'feedback/setFeedback',
  		login: 'auth/login'
  	}),
  	register (user) {
      console.log(user);
  		Auth.register(user)
  			.then((data) => this.login({email: this.user.email, password: this.user.password}))
        .then(() => this.$router.push({path: '/'}))
  			.catch((error) => this.setFeedback({message: error.data, type: 'warning'}))
  	}
  }
}
</script>

<style scoped>

  .title
  {
    color:White;
  }

  @media screen and (min-width: 800px)
  {
    .column
    {
      padding:144px;
      margin-left:33px;
    }
  }



</style>
