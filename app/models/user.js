import DS from 'ember-data';

export default DS.Model.extend({
  forename:DS.attr('string'),
  name: DS.attr('string'),
  age: DS.attr('number'),
  comments: DS.hasMany('comment',{inverse:"user"}),
  commentsWritten: DS.hasMany('comment',{inverse:"commentor"}),
  quotes: DS.hasMany('quote'),
  attendings: DS.hasMany('attendings'),
  anecdotes: DS.hasMany('anecdote')
});
