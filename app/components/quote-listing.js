import Ember from 'ember';

export default Ember.Component.extend({
  //sortBy:["id:desc"],
  sortedQuotes:Ember.computed.sort('quotes',function(a,b){
    return +a.get("id") < +b.get("id");
  }),
  actions:{
    blur(blur){
      this.sendAction("blur",blur);
    }
  }
});
