import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  getResponseJSON(){
    return this.get("session.data").authenticated.responseJSON;
  },
  isCurrentUser(id){
    return (this.getResponseJSON().id.toString()===id);
  },
  currentUser:function(){
    var id=this.get("user").id;
    return this.isCurrentUser(id);
  }.property("user"),
  actions:{
    create(text){
      var user=this.get("user");
      if(text && user){
        this.sendAction("create",text,user);
      }
    }
  }
});
