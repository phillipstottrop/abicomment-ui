import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  model(){
    return this.store.findAll("quote");

  },
  actions:{
    createQuote(text,quoted){
      if(text && quoted){
        var q = this.store.createRecord("quote",{
          text:text,
          quoted:quoted
        });
        q.save();
      }else{
        console.log("arguments wrong");
      }
    }
  }

});
