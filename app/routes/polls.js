import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  queryParams: {
    limit: {
      refreshModel: true
    }
  },
  model(params){
    return this.store.query("poll",params);
  },
  actions:{
    showMore(){
      var increment=5;
      const total = this.controllerFor('polls').get('total');
      const limit = this.controllerFor('polls').get('limit');
      if(limit+increment <total){
      this.transitionTo({queryParams: { limit: limit+increment}});
      }
      else{
        this.transitionTo({queryParams: { limit: total}});
      }
    },
    voteForOption(option){
      if(option){
        var v=this.store.createRecord("vote",{
          option:option
        });
        v.save().then(function(){
        option.get("poll.options").reload();
        option.get("poll").then(function(p){
          p.reload();
        });
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
  },
  blurBackground(blur) {
     this.controllerFor('application').set('blur', blur);
   }
  }
});
