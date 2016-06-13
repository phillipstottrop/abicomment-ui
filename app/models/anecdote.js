import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  course: DS.belongsTo('course'),
  text: DS.attr('string')
});
