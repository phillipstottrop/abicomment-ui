import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  queryParams: {
    limit: {
      refreshModel: true
    }
  },
  model(params){
    return this.store.query("fact",params);
  },
  actions:{
    loading(transition, originRoute){

      var model = this.controllerFor('facts').get('model');
      if (model){
        if(model.get("length") > 0){
          return false;
        }
      }
      return true;
    },
    showMore(){
      var increment=10;
      const total = this.controllerFor('facts').get('total');
      const limit = this.controllerFor('facts').get('limit');
      if(limit+increment <total){
      this.transitionTo({queryParams: { limit: limit+increment}});
      }
      else{
        this.transitionTo({queryParams: { limit: total}});
      }
    },
    createFact(text){
      var f = this.store.createRecord("fact",{
        text:text
      });
      var that=this;
      f.save().then(function(){
        that.refresh();
      });
    }
  }
});
