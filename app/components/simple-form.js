import Ember from 'ember';

export default Ember.Component.extend({
  noCreateable:false,
  classes:function(){
    if(!this.get("showing")){ return this.get("iconShow")+" icon";}
    else {return this.get("iconHide")+" icon";}
  }.property("iconShow","iconHide","showing"),
  createable:function(){
    if(this.get("noCreateable")){return true;}
    var text=this.get("text");
    return text;
  }.property("text"),
  actions:{
    toggleShowing(){
      var showing=this.get("showing");
      if(showing){showing=false;}
      else        {showing=true;}
      this.set("showing",showing);
    },
    create(){
      var text=this.get("text");
      if (text || this.get("noCreateable")) {

         this.sendAction("create",text);
         this.set("text","");
      }
    }
  }




});
