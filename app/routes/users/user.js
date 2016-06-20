import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin,{
  queryParams: {
    limit: {
      refreshModel: true
    }
  },
  model(params){

    return this.store.findRecord("user",params.user_id,{ adapterOptions: { query: {limit:params.limit} } });
  },
  actions:{

    loadMore(){
      var increment=10;

      const limit = this.controllerFor('users.user').get('limit');

      this.transitionTo({queryParams: { limit: limit+increment}});

    },
    createComment(text,user){

      var comment=this.store.createRecord("comment",{
        text:text,
        user:user
      });

      var that=this;
      comment.save().then(function(){

        that.refresh();

      });

    },

  blurBackground(blur) {
     this.controllerFor('application').set('blur', blur);
   }
},
});
