import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  moderator:function(){

    return (this.getResponseJSON().status === "moderator" || this.getResponseJSON().status === "admin");
  }.property("session"),
  getResponseJSON(){

    return this.get("session.data").authenticated.responseJSON;
  },

});
