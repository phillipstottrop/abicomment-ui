import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    deleteMotto(){
      if(this.get("motto")){
        this.sendAction("delete",this.get("motto"));
      }
    },
    voteFor(motto){
      this.sendAction("voteFor",motto);
    }
  }
});
