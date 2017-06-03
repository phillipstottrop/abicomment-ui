import DS from 'ember-data';

export default DS.Model.extend({
  seats: DS.attr('number'),
  promtable: DS.belongsTo('promtable'),
  user: DS.belongsTo('user')
});
