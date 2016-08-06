import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  admin:function(){

    var id=this.get("user").get('id') || -1;
    return (this.getResponseJSON().status === "admin" || this.getResponseJSON().id.toString()===id );
  }.property("session","user"),
  getResponseJSON(){

    return this.get("session.data").authenticated.responseJSON;
  },

});
