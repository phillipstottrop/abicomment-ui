import Ember from 'ember';

export default Ember.Component.extend({

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
