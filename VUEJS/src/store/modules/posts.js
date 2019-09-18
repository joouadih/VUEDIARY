import Posts from '../../services/Posts';

const state =
{
	posts: [],
	tags: ["Aggravated", "Accepted ",  "Alienated ",  "Amazed ",  "Amused ",  "Angry ",  "Annoyed ",  "Anxious ",  "Apathetic",  "Ashamed ",  "Awful",
 				 "Blah",  "Blissful",  "Bored", "Calm", "Chaotic", "Cheerful", "Confident", "Confused", "Content", "Corgaeous", "Cranky", "Crazy", "Critical", "Crushed", "Curious", "Cynical",
				 "Defensive", "Depressed", "Determined", "Devestated", "Disappointed", "Disillusioned", "Drained","Eager", "Ecstatic", "Embarresed", "Empty", "Energetic", "Envious", "Excited",
				 "Fearful","Frustrated", "Fulfilled","Grateful", "Grief", "Grumpy", "Guilty","Happy","Heartbroken","Hopeful","Hurt","Ignored", "Important", "Inadequate", "Indifferent", "Inferior",
				 "Inspired","Irritaed","Jealous","Joyful","Lethargic","Listless","Lonely","Loved","Loving","Mellow","Micheivevious","Motivated","Naughty","Numb","Open","Optimistic","Overwhlemed",
				 "Peaceful","Pessimistic","Playful","Pleased","Powerful","Powerless","Proud","Refreshed","Rejected","Relaxed","Relieved","Restless","Sad","Satisfied","Scared","Sensitive","Skeptical",
				 "Shocked","Smart","Stressed","Surprised","Suspucious","Terrified","Threatened","Vulnerable","Worried","Worthless","Withdrawn"]
};

const getters =
{
	posts ()
	{
		return state.posts
	},
	tags ()
	{
		return state.tags
	}
};

const actions =
{
	getPosts({ commit }, userid)
	{
		return Posts.getPosts(userid).then(data => commit('setPosts', data));
	},
	addPost({ commit }, post)
	{
		return Posts.addPost(post).then(data =>
		{
			commit('addPost', data);
		});
	},
	removePost({ commit }, id)
	{
		return Posts.removePost(id).then(data =>
		{
			commit('removePost', id);
		});
	}
};

const mutations =
{
	setPosts (state, posts)
	{
		//Converting Tag IDs to Text
		posts.messages.forEach(message =>
		{
				var tagsIDs = message.tags.split(',');
				var tagsNames = [];

				tagsIDs.forEach(id =>
				{
					tagsNames.push(state.tags[id]);

				});

				message.tags = tagsNames;
		});

		state.posts = posts;
	},
	addPost (state, post)
	{
		state.posts.push(post);
	},
	removePost (state, id)
	{

		state.posts.messages.forEach(function(message)
		{
			 if(message.id == id)
			 {
				 var index = state.posts.messages.indexOf(message);
				 if (index !== -1) state.posts.messages.splice(index, 1);
			 }
		});

	}
};

export default
{
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
