import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  administratable:function(){
    var quote=this.get("quote");
    return ( this.isCurrentUser(quote.get("user.id"))  || this.isAdmin() );
  }.property("quote","session"),
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
      var quote=this.get("quote");
      quote.deleteRecord();
      quote.save();
    }
  }
});
