import Ember from 'ember';

export default Ember.Route.extend({
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
    redirect(){
      this.transitionTo("polls");
    }
  }
});
