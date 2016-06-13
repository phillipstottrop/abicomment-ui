import DS from 'ember-data';

export default DS.Model.extend({
  note:DS.attr('string'),
  user: DS.belongsTo('user'),
  course:DS.belongsTo('course')
});
