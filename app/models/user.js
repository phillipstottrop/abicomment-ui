import DS from 'ember-data';

export default DS.Model.extend({
  forename:DS.attr('string'),
  name: DS.attr('string'),
  fullname:DS.attr('string'),
  currentsigninat:DS.attr('date'),
  currentsigninip:DS.attr('string'),
  signincount:DS.attr('number'),
  status:DS.attr('string'),
  comments: DS.hasMany('comment',{inverse:"user"}),
  commentswritten: DS.hasMany('comment',{inverse:"commentor"}),
  quotes: DS.hasMany('quote'),
  attendings: DS.hasMany('attendings'),
  anecdotes: DS.hasMany('anecdote'),
  courses: DS.hasMany('course'),
  mottos: DS.hasMany('motto'),
  mottovotes: DS.hasMany('mottovotes')
});
