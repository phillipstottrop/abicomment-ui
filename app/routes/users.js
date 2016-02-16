import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.findAll("user");
  },
  actions:{
    createUser(name,age){
      var user=this.store.createRecord("user",{
        name:name,
        age:age
      });
      user.save();
    }
  }
});
