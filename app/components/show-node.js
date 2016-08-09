import Ember from 'ember';

export default Ember.Component.extend({
  classNames:["show-node-info"],
  store:Ember.inject.service(),
  id:-1,
  user:function(){
    return this.get("store").findRecord("user",this.get("id"));
  }.property("id"),
});
