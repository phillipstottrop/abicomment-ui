import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin,{
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
