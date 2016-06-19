import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin,{

  model(params){

    return this.store.findRecord("user",params.user_id);
  },
  actions:{
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
