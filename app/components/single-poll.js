import Ember from 'ember';

export default Ember.Component.extend({
  hasVotes:function(){
    return this.get("poll.voteamount")>0;
  }.property("poll.voteamount"),
  actions:{
    vote(option){
      if(option){
        this.sendAction("vote",option);
      }
    },

    blur(blur){
    this.sendAction("blur",blur);
  },
  delete(){
    var poll=this.get("poll");
    if(poll){
      poll.destroyRecord();
    }
  }
  },
});
