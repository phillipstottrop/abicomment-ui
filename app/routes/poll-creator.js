import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin,{
  session: Ember.inject.service('session'),
  getResponseJSON(){

    return this.get("session.data").authenticated.responseJSON;
  },
  isAdmin(){
    return this.getResponseJSON().status === "admin";
  },
  isModerator(){
    return this.getResponseJSON().status === "moderator";
  },






  beforeModel() {
    if(this.isAdmin()  || this.isModerator()){

    }else{
      this.transitionTo('polls');

    }
  },
  model(){
    return this.store.createRecord("poll");
  },
  actions:{
    willTransition: function(transition) {
      var poll = this.controllerFor("poll-creator").get("model");

      if(!poll.id){
        console.log("should delete");
        poll.get('options').forEach(function(option){
          option.deleteRecord();
        });
        poll.deleteRecord();

      }
    },
    redirect(){
      this.transitionTo("polls");
    }
  },

});
