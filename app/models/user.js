import DS from 'ember-data';

export default DS.Model.extend({
  forename:DS.attr('string'),
  name: DS.attr('string'),
  fullname:DS.attr('string'),
  currentsigninat:DS.attr('date'),
  currentsigninip:DS.attr('string'),
  signincount:DS.attr('number'),
  status:DS.attr('string'),
  isfavorited:DS.attr('boolean'),
  comments: DS.hasMany('comment',{inverse:"user"}),
  commentswritten: DS.hasMany('comment',{inverse:"commentor"}),
  quotes: DS.hasMany('quote'),
  attendings: DS.hasMany('attending'),
  anecdotes: DS.hasMany('anecdote'),
  courses: DS.hasMany('course'),
  mottos: DS.hasMany('motto'),
  mottovotes: DS.hasMany('mottovote'),
  favorites:DS.hasMany('favorite'),
  favorited:DS.hasMany('favorite',{inverse: "favoritee"}),
  transactions:DS.hasMany('transaction'),
  promtables:DS.hasMany('promtable'),
  promtableentry:DS.belongsTo('promtableentry')
});
