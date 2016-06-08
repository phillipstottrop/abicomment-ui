import DS from 'ember-data';

export default DS.Model.extend({
  hasvoted:DS.attr('boolean', 'value'),
  topic: DS.attr('string'),
  options: DS.hasMany('option',{async:false})
});
