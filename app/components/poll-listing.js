import Ember from 'ember';

export default Ember.Component.extend({
  sortBy:['id:desc'],
  sortedPolls:Ember.computed.sort("polls","sortBy"),
  session: Ember.inject.service('session'),
  administratable:function(){

    return ( this.isAdmin() || this.isModerator() );
  }.property("session"),
  getResponseJSON(){

    return this.get("session.data").authenticated.responseJSON;
  },
  isAdmin(){
    return this.getResponseJSON().status === "admin";
  },
  isModerator(){
    return this.getResponseJSON().status === "moderator";
  },
  actions:{
    voteForOption(option){
      if(option){
        this.sendAction("voteForOption",option);
      }},



  blur(blur){
  this.sendAction("blur",blur);
  }
  }
});
