import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['limit'],
  limit: 10,

  total: function(){
    var total =this.get('model.meta').total || 20;
    return total;
  }.property('model.meta'),

  notShowingAll:function(){
    return this.get('total') > this.get('model.length');
  }.property('total','model'),
});
