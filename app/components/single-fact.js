import Ember from 'ember';

export default Ember.Component.extend({
  actions:{
    delete(fact){
      if(fact){
        fact.destroyRecord();
      }
    }
  }
});
