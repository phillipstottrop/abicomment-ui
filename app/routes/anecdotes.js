import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin,{
  queryParams: {
    limit: {
      refreshModel: true
    }
  },
  model(params){
    return this.store.query("anecdote",params);
  },
  actions:{
    showMore(){
      var increment=20;
      const total = this.controllerFor('anecdotes').get('total');
      const limit = this.controllerFor('anecdotes').get('limit');
      if(limit+increment <total){
      this.transitionTo({queryParams: { limit: limit+increment}});
      }
      else{
        this.transitionTo({queryParams: { limit: total}});
      }
    },
  }
});