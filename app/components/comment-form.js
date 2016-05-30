import Ember from 'ember';

export default Ember.Component.extend({
  showing:false,
  actions:{
    toggleShowing(){
      var showing=this.get("showing")
      if(showing)showing=false;
      else        showing=true;
      this.set("showing",showing);
    },
    create(){

      var text=this.get("text");
      var user=this.get("user");
      console.log(text);
      if (text && user) {

         this.sendAction("create",text,user);
         this.set("text","");
      }

    }
  }
});
