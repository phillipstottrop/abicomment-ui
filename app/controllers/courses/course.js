import Ember from 'ember';

export default Ember.Controller.extend({
  sortAnecdotesBy:["id:desc"],
  sortedAnecdotes:Ember.computed.sort("model.anecdotes","sortAnecdotesBy"),

  sortAttendingsBy:["user.name:asc","user.forename:asc"],
  sortedAttendings:Ember.computed.sort("model.attendings","sortAttendingsBy")
});
