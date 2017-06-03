import Ember from 'ember';

export default Ember.Component.extend({

  actions:{
    joinTable(bla){
      var seats = this.get("seats");
      if(seats){
        this.sendAction("addEntry",this.get("promtable"),seats);
      }
    },
    destroyEntry(entry){
      this.sendAction("destroyEntry",entry);
    },
    destroyTable(table){
      this.sendAction("destroyTable",table);
    }
    }
});
