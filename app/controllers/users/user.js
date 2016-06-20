import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['limit'],
  limit: 10,


  limitTooHigh:function(){

    return this.get('model.comments.length') < this.get('limit');
  }.property('limit','model.comments.length'),
});
