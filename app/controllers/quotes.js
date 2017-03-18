import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['limit','query'],
  limit: 50,
  query: '',
  total: function(){
    return this.get('model.meta').total;
  }.property('model.meta'),

  notShowingAll:function(){
    return this.get('total') > this.get('model.length');
  }.property('total','model'),
});
