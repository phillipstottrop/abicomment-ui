import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  model(){
    return this.store.findAll("poll");
  },
  actions:{
    voteForOption(option){
      if(option){
        var v=this.store.createRecord("vote",{
          option:option
        });
        var that=this;
        v.save().then(function(){
        option.get("poll.options").reload();
        option.get("poll").then(function(p){
          p.reload();
        })
        });
      }},

    createPoll(topic){

    if(topic){
      var poll=this.store.createRecord("poll",{topic:topic});
      poll.save().then(function(){
        poll.reload();
      });
    }
  },
  createOption(title,poll){
    if(title && poll){
      var option=this.store.createRecord("option",{
        title:title,
        poll:poll
      });
      option.save().then(function(){
        option.reload();
      });
    }
  }
  }
});
