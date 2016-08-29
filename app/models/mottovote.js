import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  motto: DS.belongsTo('motto'),
  note: DS.attr('string')
});
