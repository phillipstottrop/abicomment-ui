import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  showing:false,
  createable:function(){
    var text=this.get("text");
    var user=this.get("user");
    return (text && user);
  }.property("text","user"),

  getResponseJSON(){
    return this.get("session.data").authenticated.responseJSON;
  },

  actions:{
    toggleShowing(){
      var showing=this.get("showing");
      if(showing){showing=false;}
      else        {showing=true;}
      this.set("showing",showing);
    },
    create(){
      var text=this.get("text");
      var user=this.get("user");
      var commentorId=this.getResponseJSON().id;
      if (text && user) {

         this.sendAction("create",text,user,commentorId);
         this.set("text","");
      }


    }
  }
});
