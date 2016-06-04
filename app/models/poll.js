import DS from 'ember-data';

export default DS.Model.extend({
  topic: DS.attr('string'),
  options: DS.hasMany('option')
});
