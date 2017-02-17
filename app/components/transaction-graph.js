import Ember from 'ember';

export default Ember.Component.extend({
sortBy : ["time:asc","value:asc"],
graph : Ember.computed.sort("graphData","sortBy"),
graphData : function(){
  var data = [];
  var transactions = this.get("transactions");
  if(transactions){
  transactions.forEach(function(transaction){
    var id = transaction.get("id");
    var time = transaction.get("date");
    var value = transaction.get("balance");
    var difference = transaction.get("value");
    if(id && time && value && difference){
      data.push({
        id:id,
        time:time,
        value:value,
        difference:difference
      })
    }
  })}

  return data;

}.property("transactions.@each","transactions.@each.balance"),
graphDataUpdate:function(){
  this.get("graphData");
}.property("transactions.@each.balance")

});
