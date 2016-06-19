import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin,{
  model(){
    return this.store.findAll("user");
  },
  actions:{
    transition(user){
      this.transitionTo("users.user", user.id);
    },
    willTransition(transition){
      if(transition.params["users.user"]){
      var id=transition.params["users.user"]["user_id"]
      var user=this.store.peekRecord("user",id);
      this.controllerFor("users").set("selected",user);
    }
    }
  }
});
