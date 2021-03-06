import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  admin:function(){
    var status = this.get("status") || "admin";
    var id=this.get("user.id") || -1;
    return (this.getResponseJSON().status === "admin"
            || this.isPartOf(this.getResponseJSON().status,status)
            || this.getResponseJSON().id.toString()===id );
  }.property("session","user"),
  getResponseJSON(){

    return this.get("session.data").authenticated.responseJSON;
  },
  isPartOf(s1,s2){

    return s2.indexOf(s1) >= 0;
  }
});
