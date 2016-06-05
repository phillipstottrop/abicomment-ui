import Ember from 'ember';

export default Ember.Component.extend({

  actions:{
    vote(option){
      if(option){
        this.sendAction("vote",option);
      }
    },
    createOption(title){
      var poll=this.get("poll");
      if(title && poll){
        this.sendAction("create",title,poll);
      }
    }
  }
});
