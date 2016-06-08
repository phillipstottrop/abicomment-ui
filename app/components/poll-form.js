import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  createable:function(){
    var topic=this.get("poll.topic");

    return (topic && this.get("poll.options").length>1);
  }.property("poll.topic","poll.options"),
  actions:{
    createOption(title){
      var poll=this.get("poll");
      var store=this.get("store");
      if(title && poll){
        var option= store.createRecord("option",{title:title,poll:poll});
        poll.get("options").pushObject(option);
      }
    },
    savePoll(){
      var that=this;
      var poll=this.get("poll");

      if(this.get("createable")){
        poll.save().then(function(){
          poll.reload().then(function(){
            poll.get("options").forEach(function(o){
              o.set("poll",poll);
              o.save().then(function(){
              });

            });

          });
        });
        that.sendAction("redirect");
      }
    }
  }
});
