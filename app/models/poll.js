import DS from 'ember-data';

export default DS.Model.extend({
  voteamount:DS.attr('number'),
  topic: DS.attr('string'),
  options: DS.hasMany('option')
});
