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
      var quoted=this.get("quoted");
      if (text && quoted) {

         this.sendAction("create",text,quoted);
         this.set("text","");
         this.set("quoted","");
      }

    }
      } 
});
