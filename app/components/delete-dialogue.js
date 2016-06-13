import Ember from 'ember';

export default Ember.Component.extend({

  actions:{
    open(){
      this.set("showingModal",true);
      this.sendAction("blur",true);
    },
    close(){
      this.set("showingModal",false);
      this.sendAction("blur",false);

    },
    confirm(){
      this.set("showingModal",false);
      this.sendAction("blur",false);

      this.sendAction("confirm",this.get("param"));
    }
  }
});
