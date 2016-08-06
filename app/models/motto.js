import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  hasupvoted: DS.attr('boolean'),
  upvotes: DS.attr('number'),
  mottovotes: DS.hasMany('mottovote'),
  user:DS.belongsTo('user')
});
