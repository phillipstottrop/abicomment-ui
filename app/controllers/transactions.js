import Ember from 'ember';

export default Ember.Controller.extend({
  sortBy:["id:desc"],
  transactions:Ember.computed.sort("model","sortBy"),

  total: function(){
    return this.get("model.meta").total
  }.property("model.meta.total"),
  actions: {
    create(reason){
      var date = this.get("date");
      var value = this.get("value");
      var receipt = this.get("receipt");
      var excerpt = this.get("excerpt");
      var cardnumber = this.get("cardnumber");
      if(reason || date || value || receipt || excerpt || cardnumber){
        this.send("createTransaction",reason,date,value,receipt,excerpt,cardnumber);
      }
    }
  }


});
