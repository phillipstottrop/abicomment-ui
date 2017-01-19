import DS from 'ember-data';

export default DS.Model.extend({
  reason: DS.attr('string'),
  date: DS.attr('date'),
  receipt: DS.attr('number'),
  excerpt: DS.attr('number'),
  value: DS.attr('number'),
  cardnumber: DS.attr('number'),
  balance: DS.attr('number'),
});
