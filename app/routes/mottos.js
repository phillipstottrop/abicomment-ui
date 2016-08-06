import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  queryParams: {
    limit: {
      refreshModel: true
    }
  },
  model(params){
    return this.store.query("motto",params);
  },
  actions:{
    showMore(){
      var increment=20;
      const total = this.controllerFor('mottos').get('total');
      const limit = this.controllerFor('mottos').get('limit');
      if(limit+increment <total){
      this.transitionTo({queryParams: { limit: limit+increment}});
      }
      else{
        this.transitionTo({queryParams: { limit: total}});
      }
    },
    createMotto(text){
      var m = this.store.createRecord("motto",{
        text:text
      });
      var that=this;
      m.save().then(function(){
        var v = that.store.createRecord("mottovote",{
          motto:m
        });
        v.save().then(function(){
          that.refresh();
          });
      });
    },
    deleteMotto(motto){
      var that = this;
      motto.destroyRecord().then(function(){
        that.refresh();
      });
    },
    voteFor(motto){
      var v = this.store.createRecord("mottovote",{
        motto:motto
      });
      var that=this;
      v.save().then(function(){
        that.refresh();
      });
    }
  }
});
