import Ember from 'ember';

export default Ember.Controller.extend({

  session: Ember.inject.service('session'),
  actions: {
  invalidateSession() {
    this.get('session').invalidate();
  },
  debugSession(){
    console.log(this.get("session.data").authenticated.responseJSON);
  }
},
getResponseJSON(){
  return this.get("session.data").authenticated.responseJSON;
},
isCurrentUser(id){
  return (this.getResponseJSON.id==id);
}

});
