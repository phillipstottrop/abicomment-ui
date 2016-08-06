import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  getResponseJSON(){
    return this.get("session.data").authenticated.responseJSON;
  },
  classes:function(){
    if(!this.get("showing")){ return this.get("iconShow")+" icon";}
    else {return this.get("iconHide")+" icon";}
  }.property("iconShow","iconHide","showing"),
  showing:false,
  createable:function(){
    var text=this.get("text");
    var quoted=this.get("quoted");
    return (text && quoted);
  }.property("text","quoted"),
  actions:{
    toggleShowing(){
      var showing=this.get("showing");
      if(showing){showing=false;}
      else        {showing=true;}
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
