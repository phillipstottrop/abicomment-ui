import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  administratable:function(){
    console.log(this.getResponseJSON());
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
      var comment=this.get("comment");
      comment.deleteRecord();
      comment.save();
    }
  }
});
