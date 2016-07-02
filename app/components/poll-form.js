import Ember from 'ember';

export default Ember.Component.extend({
  saving:false,
  store: Ember.inject.service(),
  createable:function(){
    var topic=this.get("poll.topic");

    return (topic && this.get("poll.options").length>1 && !this.get("saving"));
  }.property("poll.topic","poll.options","saving"),
  actions:{
    createOption(title){
      var poll=this.get("poll");
      var store=this.get("store");
      if(title && poll){
        var option= store.createRecord("option",{title:title});
        poll.get("options").pushObject(option);
      }
    },
    savePoll(){
      var that=this;
      var poll=this.get("poll");

      if(this.get("createable") ){
        this.set("saving",true);
        poll.save().then(function(){
          poll.reload().then(function(){
          Ember.RSVP.Promise.all(  poll.get("options").map(function(o){
              o.set("poll",poll);
            return o.save();
          }) ).then(function(){
            that.sendAction("redirect");

          });
          });
        });

      }
    },
    delete(option){
      option.destroy();
    },
  allUsers(){
    var poll=this.get("poll");
    var store=this.get("store");

    store.findAll("user").then(function(users){
      users.forEach(function(user){
        var fullName=user.get("forename")+" "+user.get("name");
        var option=store.createRecord("option",{
          title:fullName,
        });
        poll.get("options").pushObject(option);

      });
    });
  },
  removeAll(){
    var poll=this.get('poll');
    poll.get('options').forEach(function(option){
      option.destroy();
    });
  }
},

});
