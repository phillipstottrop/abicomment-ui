import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    create(){
      var text=this.get("text");
      var user=this.get("user");
      if (text && user) {
        this.sendAction("create",text,user);
        this.set("text","");
      }

    }
  }
});
