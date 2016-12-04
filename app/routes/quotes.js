import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  session: Ember.inject.service('session'),

  queryParams: {
    limit: {
      refreshModel: true
    },
    query : {
      refreshModel: true
    }
  },

  model(params){
    return this.store.query("quote",params);

  },
  actions:{
    loading(transition, originRoute){

      var model = this.controllerFor('quotes').get('model');
      if (model){

          return false;
        
      }
      return true;
    },
    showMore(){
      var increment=10;
      const total = this.controllerFor('quotes').get('total');
      const limit = this.controllerFor('quotes').get('limit');
      if(limit+increment <total){
      this.transitionTo({queryParams: { limit: limit+increment}});
      }
      else{
        this.transitionTo({queryParams: { limit: total}});
      }
    },
    createQuote(text,quoted){
      if(text && quoted){

        var q = this.store.createRecord("quote",{
          text:text,
          quoted:quoted,
        });
        var that=this;
        q.save().then(function(){
          that.refresh();

        });
            }else{
        console.log("arguments wrong");
      }
    },
    blurBackground(blur){
      this.controllerFor("application").set('blur',blur);
    }
  }

});
