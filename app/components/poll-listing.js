import Ember from 'ember';

export default Ember.Component.extend({
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

    createPoll(topic){

    if(topic){
      this.sendAction("createPoll",topic);
    }
  },
  createOption(title,poll){
    if(title && poll){
      this.sendAction("createOption",title,poll);
    }
  }
  }
});
