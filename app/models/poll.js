import DS from 'ember-data';
import AutoReload from 'ember-data-autoreload';

export default DS.Model.extend(AutoReload, {
  hasvoted:DS.attr('boolean', 'value'),
  topic: DS.attr('string'),
  options: DS.hasMany('option',{async:true}),
  autoReloadDelay: 500,
  autoReloadMaximumDelay:2000
});
