import Ember from 'ember';

export default Ember.Component.extend({
  userSortingDescByName:['name:asc','forename:asc'],
  sortedUsers:Ember.computed.sort('users','userSortingDescByName')
});
