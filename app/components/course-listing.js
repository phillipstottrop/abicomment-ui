import Ember from 'ember';

export default Ember.Component.extend({
  courseListingascByNameAndTeacher:['name:asc','teacher:asc'],
  sortedCourses:Ember.computed.sort('courses','courseListingascByNameAndTeacher')
});
