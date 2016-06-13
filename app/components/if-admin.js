import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  admin:function(){
    var id=this.get("user.id");
    return (this.getResponseJSON().status === "admin" || this.getResponseJSON().id.toString()===id );
  }.property("session"),
  getResponseJSON(){

    return this.get("session.data").authenticated.responseJSON;
  },

});
