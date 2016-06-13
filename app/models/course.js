import DS from 'ember-data';

export default DS.Model.extend({
  teacher: DS.attr('string'),
  name: DS.attr('string'),
  attendings: DS.hasMany('attending'),
  isattending: DS.attr('boolean'),
  anecdotes: DS.hasMany('anecdote')
});
