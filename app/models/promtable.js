import DS from 'ember-data';

export default DS.Model.extend({
  seats: DS.attr('number'),
  taken: DS.attr('number'),
  free: DS.attr('number'),
  promtableentries: DS.hasMany('promtableentry'),
  user:DS.belongsTo('user'),
  entryallowed:DS.attr('boolean')
});
