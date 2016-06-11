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
    this.set("showingModal",false);
    this.sendAction("blur",false);
    var poll=this.get("poll");
    if(poll){
      poll.destroyRecord();
    }
  },
  open(){
    this.set("showingModal",true);
    this.sendAction("blur",true);
  },
  close(){
    this.set("showingModal",false);
    this.sendAction("blur",false);

  },
  },
});
