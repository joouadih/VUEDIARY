<template>

  <div class="home columns">


      <div class="column is-two-thirds">

        <div class="box" style="width:33%; text-align:center;">
          <h1 class="title is-2">Letters</h1>
        </div>

        <!-- message list -->
        <transition-group name="fade" tag="div">
        <div class="box" v-for="(message,index) in getFilterMessages().slice().reverse()" v-bind:key="index ^ 3">
          <article class="media">
            <div class="media-content">
              <div class="content" >

                <a @click.prevent="removeMessage(message.id)" class="delete is-small is-pulled-right"></a>

                  <strong>{{ message.date }}</strong> <small v-for="tag in message.tags">@{{tag}}  </small>
                  <br><br>
                      <p>{{ message.message }}</p>



              </div>
            </div>
          </article>
        </div>
        </transition-group>


      </div>


      <div class="column is-one-third">

        <!-- Tags list -->
        <div class="box">

             <h1 class="title is-3">Filters</h1>

             <span class="tag chosen" v-for="tag in filtertags">
               {{tag}}
             </span>

             <hr/>

             <div class="control is-expanded">
                  <a @click="$event.target.classList.toggle('active')" @click.prevent="addfiltertag({tag})" v-for="(tag,index) in tags" ref="tags">
                    <span class="tag" v-bind:id="index"  >
                      {{tag}}
                    </span>
                  </a>
             </div>

        </div>

      </div>

  </div>




</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'home',
  data () {
    return {
        filtertags:[]
    }
  },
  mounted()
  {
    this.getPosts(this.auth.user.id)
      .then(() => this.setFeedback({message: 'Getting Letters', type: 'success'}) )
      .catch((error) => this.setFeedback({message: error.data, type: 'warning'}));
  },
  computed: {

    //GET values from STORE
    ...mapGetters({
      data: 'posts/posts',
      tags: 'posts/tags',
      auth: 'auth/auth'
      })
  },
  methods:{
    ...mapActions({
      getPosts: 'posts/getPosts',
      setFeedback: 'feedback/setFeedback',
      removePost:'posts/removePost'
    }),
    addfiltertag(tag)
    {
      if(this.filtertags.includes(tag.tag))
      {
         var index = this.filtertags.indexOf(tag.tag);

         if (index > -1)
         {
            this.filtertags.splice(index, 1);
         }
      }

      else
      {
        this.filtertags.push(tag.tag);
      }

    },
    getFilterMessages()
    {

  		if(this.filtertags == null || this.filtertags == undefined || this.filtertags.length == 0 )
  		{
  			return this.data.messages
  		}

      var filtermsg = [];
      var filtertagz = this.filtertags; //Why can't I access the regular THIS array inside the Foreach?

      this.data.messages.forEach(function(message)
      {

        let checkarr = (arr, target) => target.every(v => arr.includes(v));

        if(checkarr(message.tags, filtertagz))
        {
          filtermsg.push(message);
        }

      });

      return filtermsg
    },
    removeMessage(postid)
    {

      this.removePost(postid)
        .then(() => this.setFeedback({message: 'Letter removed', type: 'success'}) )
        .catch((error) => this.setFeedback({message: error.data, type: 'warning'}));

    }
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

  .fade-enter-active,
  .fade-leave-active
  {
    transition: opacity .3s;
  }

  .fade-enter,
  .fade-leave-to
  {
    opacity: 0;
  }

  .tag
  {
    margin:1px;
  }

  .tag > .chosen
  {
    background-color:black;
  }


</style>
