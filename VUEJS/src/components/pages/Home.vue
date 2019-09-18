<template>

  <div class="home columns">

      <div class="column is-full">

        <!-- message list -->
        <transition name="slide-fade">
          <div class="box">

                <div class="control is-expanded">
                </br><h3 class="title is-4">{{ new Date().toDateString() }} </h3></br>
                </div>

                <!-- <drawingboard></drawingboard> -->

                <div class="controls field has-addons">
                    <div class="control is-expanded">
                      <textarea-autosize auto-grow class="input is-primary" v-model="message" placeholder="Write your toughts for today..."rows="3" max-rows="6" no-resize></textarea-autosize>
                    </div>

                    <div class="control">
                        <button @click.prevent="add({message:message,user_id:auth.user.id})" :disabled="!message" class="button is-primary">Send</button>
                    </div>
                </div>

                <div class="control is-expanded">
                  <a @click="$event.target.classList.toggle('active')" v-for="(tag,index) in tags" ref="tags">
                    <span style="margin:2px;" class="tag" v-bind:id="index"  >
                      {{tag}}
                    </span>
                  </a>
                </div>


          </div>
        </transition>

      </div>


  </div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex';


export default {
  name: 'home',
  data () {
    return {
        message:null,
        selectedtags:[]
    }
  },
  mounted ()
  {
    //Trigger GET request for Posts
    //this.$store.dispatch('posts/getPosts',);

    this.getPosts(this.auth.user.id)
      .then(() => this.setFeedback({message: 'Getting Letters', type: 'success'}) )
      .catch((error) => this.setFeedback({message: error.data, type: 'warning'}));

  },
  methods:{
    ...mapActions({
      setFeedback: 'feedback/setFeedback',
      newPost: 'posts/addPost',
      getPosts: 'posts/getPosts'
    }),
    add(post) {

      console.log(post);

      //Gather all active tags and format them with X,X,X then attach to message
      var activetags = this.$el.querySelectorAll('a > .active');
      var tagscont = [];

      for (var i = 0; i < activetags.length; i++)
      {
         tagscont.push(activetags[i].id);
         activetags[i].classList.remove('active');
      }

      post.tags = tagscont.join(',');

      this.newPost(post)
        .then(() => this.setFeedback({message: 'Letter added', type: 'success'}) )
        .catch((error) => this.setFeedback({message: error.data, type: 'warning'}));

        this.message = null;
    }
  },
  computed:{

    ...mapGetters({
      auth: 'auth/auth',
      tags: 'posts/tags'
    })

  }
}
</script>

<style scoped>


  textarea
  {
    resize: vertical;
    max-height: 300px;
  }

  a .active
  {
    background-color: #fffbd5;
  }


</style>
