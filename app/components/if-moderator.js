import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  moderator:function(){
    var id=this.get("user.id") || -1;
    return (
      this.getResponseJSON().status === "moderator"
      || this.getResponseJSON().status === "admin"
      || this.getResponseJSON.id == id);
  }.property("session"),
  getResponseJSON(){

    return this.get("session.data").authenticated.responseJSON;
  },

});
