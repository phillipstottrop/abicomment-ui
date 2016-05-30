import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  session: Ember.inject.service('session'),
  model(){
    this.store.findRecord("user",this.get("session.data").authenticated.responseJSON.id);
    return this.store.findAll("quote");

  },
  actions:{
    createQuote(text,quoted,userId){

      if(text && quoted){
        var user=this.store.peekRecord("user",userId);

        var q = this.store.createRecord("quote",{
          text:text,
          quoted:quoted,
          user:user
        });
        q.save();
      }else{
        console.log("arguments wrong");
      }
    }
  }

});
