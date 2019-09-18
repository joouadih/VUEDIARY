<template>

  <div id="app">

    <site-navigation></site-navigation>
    <div class="container pt-3 pb-3">

      <loading></loading>
      <feedback></feedback>

      <router-view></router-view>

    </div>
  </div>

</template>

<script>

import SiteNavigation from './components/SiteNavigation';
import Feedback from './components/Feedback';
import Loading from './components/Loading';
import Auth from './services/Auth';
import store from './store/store';
import { mapActions } from 'vuex';

export default {
  name: 'app',
  components:
  {
    SiteNavigation,
    Feedback,
    Loading
  },
  methods:
  {
    ...mapActions([

    ])
  }
}
</script>

<style>

    html
    {
      background: #fffbd5;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #b20a2c, #fffbd5);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #b20a2c, #fffbd5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

      height:100%;
    }

    body, .input
    {
      font-family: 'Work Sans', sans-serif;
    }

    #navbar, .box, .input
    {
      background-color:#FFFDFC;
      /*  F7FCFC */
    }

    .is-primary.input, .is-primary.textarea
    {
      border-color: #A6B1E1;
    }

    .button.is-primary[disabled], fieldset[disabled] .button.is-primary, .button.is-primary
    {
      background-color:#1B998B;
    }

    .button.is-primary:hover
    {
      background-color:#D5F2E3;
    }

    .title
    {
      font-family: 'Permanent Marker', cursive;
    }

    small, .tag, strong
    {
      font-family: 'Work Sans ', sans-serif;
      font-weight: 300;
    }



</style>
