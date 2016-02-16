import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    create(){
      console.log("actin");
      var name=this.get("name");
      var age=this.get("age");
      if (name && age) {
        this.sendAction("create",name,age);
        this.set("name","");
        this.set("age",null);
      }

    }
  }
});
