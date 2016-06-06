import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.createRecord("poll");
  },
  actions:{
    redirect(){
      this.transitionTo("polls");
    }
  }
});
