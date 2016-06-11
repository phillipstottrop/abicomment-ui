import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  administratable:function(){
    var comment=this.get("comment");
    return ( this.isCurrentUser(comment.get("commentor.id")) || this.isCurrentUser(comment.get("user.id")) || this.isAdmin() );
  }.property("comment","session"),
  getResponseJSON(){

    return this.get("session.data").authenticated.responseJSON;
  },
  isAdmin(){
    return this.getResponseJSON().status === "admin";
  },
  isCurrentUser(id){
    return (this.getResponseJSON().id.toString()===id);
  },
  actions:{
    delete(){
      this.set("showingModal",false);
      this.sendAction("blur",false);
      var comment=this.get("comment");
      comment.deleteRecord();
      comment.save();
    },
    open(){
      this.set("showingModal",true);
      this.sendAction("blur",true);
    },
    close(){
      this.set("showingModal",false);
      this.sendAction("blur",false);

    },
  }
});
