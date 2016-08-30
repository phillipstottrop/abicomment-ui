import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['limit'],
  limit: 10,


  limitTooHigh:function(){

    return this.get('model.comments.length') < this.get('limit');
  }.property('limit','model.comments.length'),
  session: Ember.inject.service('session'),
  getResponseJSON(){
    return this.get("session.data").authenticated.responseJSON;
  },
  isCurrentUser(id){
    return (this.getResponseJSON().id.toString()===id);
  },
  currentUser:function(){
    var id=this.get("model").id;
    return this.isCurrentUser(id);
  }.property("model"),
});
