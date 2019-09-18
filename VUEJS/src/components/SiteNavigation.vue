<template>



  <nav class="navbar" role="navigation" aria-label="main navigation">

    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="../../static/img/logo_vuediary.png" width="134" height="59">
      </a>



      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbar" class="navbar-menu" >

      <div class="navbar-start" v-if="loggedin" >

        <router-link to="/" class="navbar-item">Create</router-link>

        <router-link to="/posts" class="navbar-item">Archive</router-link>

      </div>




      <div class="navbar-end" v-if="!loggedin">
        <div class="navbar-item">
          <div class="buttons">

            <router-link class="button is-primary" to="/register">Sign Up</router-link>

            <router-link class="button is-light" to="/login">Login</router-link>

          </div>
        </div>
      </div>


      <div class="navbar-end" v-if="loggedin">
        <div class="navbar-item">
          <div class="buttons">

            <span class="tag" > Logged in as:  <strong> {{currentUser.name}} </strong> </span>

            <button class="button is-primary" v-on:click="logoutUser">Logout</button>

          </div>
        </div>
      </div>

    </div>





  </nav>

</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'site-navigation',
  data () {
    return {

    }
  },
  computed: {
  	...mapGetters({
  		loggedin: 'auth/loggedin',
  		currentUser: 'auth/user'
  	})
  },
  methods: {
  	...mapActions({
  		logout: 'auth/logout',
      setDelayedFeedback: 'feedback/setDelayedFeedback'
  	}),
  	logoutUser () {
  		this.logout().then(() => {
        this.setDelayedFeedback({feedback: { message: 'Successfully logged out', type: 'info'}});
  			return this.$router.push({path: '/login'});
  		});
  	}
  }
}
</script>

<style scoped>

      nav
      {

        margin: auto;

        font-size:1em;

        /* width:66%; */
        margin-bottom:66px;
        border-radius: 0px 0px 5px 5px;

        -webkit-box-shadow: 0 8px 6px -6px black;
      	   -moz-box-shadow: 0 8px 6px -6px black;
      	        box-shadow: 0 8px 6px -6px black;
      }

      .router-link-active
      {
        font-size:1.2em;
      }

      .tag
      {
        margin:13px;
        background-color:#3B8EA5;
        color:white;
      }

      strong
      {
         color:white;
         margin:3px;
         text-transform: capitalize;
      }

</style>
