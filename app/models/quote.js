import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  quoted: DS.attr('string'),
  user: DS.belongsTo('user')
});
