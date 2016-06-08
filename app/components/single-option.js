import Ember from 'ember';

export default Ember.Component.extend({
  showingModal:false,
  actions:{
    open(){
      this.set("showingModal",true);
      this.sendAction("blur",true);
    },
    close(){
      this.set("showingModal",false);
      this.sendAction("blur",false);

    },
    vote(option){
      this.set("showingModal",false);
      this.sendAction("blur",false);

      if(option){
        this.sendAction("vote",option);
      }
    },
  }
});
