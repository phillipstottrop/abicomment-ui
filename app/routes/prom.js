import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.findAll("promtable");
  },
  actions:{
    createEntry(promtable,seats){
      if (promtable && seats) {
        var entry = this.store.createRecord("promtableentry",{
          promtable:promtable,
          seats:seats
        });
        entry.save().then(()=>{
          this.refresh();
        });
      }
    },
    addTable(){
      var seats = this.controllerFor("prom").get("seats");
      var times = this.controllerFor("prom").get("times");
      if(seats && times){
        for (var i = 0; i < times; i++) {
          var table = this.store.createRecord("promtable",{
            seats:seats
          });
          table.save().then(()=>{
            this.refresh();
          });
        }

      }
    },
    destroyEntry(entry){
      if(entry){
        entry.destroyRecord().then(()=>{
          this.refresh();
        })
      }
    },
    destroyTable(table){
      if (table) {
        table.destroyRecord().then(()=>{
          this.refresh();
        });
      }
    }
  }
});
