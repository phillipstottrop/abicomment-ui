import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.findAll("fact");
  },
  actions:{
    createFact(text){
      var f = this.store.createRecord("fact",{
        text:text
      });
      f.save().then(function(){
        f.reload();
      });
    }
  }
});
