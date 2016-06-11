import Ember from 'ember';

export default Ember.Component.extend({
  sortBy:["id:desc"],
  sortedQuotes:Ember.computed.sort('quotes','sortBy'),
  actions:{
    blur(blur){
      this.sendAction("blur",blur);
    }
  }
});
