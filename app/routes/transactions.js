import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin,{
  session: Ember.inject.service('session'),
  getResponseJSON(){

    return this.get("session.data").authenticated.responseJSON;
  },
  isAdmin(){
    return this.getResponseJSON().status === "admin";
  },
  isTrusted(){
    return this.getResponseJSON().status === "trusted";
  },
  isModerator(){
    return this.getResponseJSON().status === "moderator";
  },


  beforeModel() {
    if(this.isAdmin() || this.isTrusted()){

    }else{
      this.transitionTo('index');

    }
  },


  model(params){
    return this.store.findAll("transaction");
  },
  actions:{
    createTransaction(reason,date,value,receipt,excerpt,cardnumber){
      var that = this;
      var _date = new Date(date.setHours(12)));
      var transaction = this.store.createRecord("transaction",{
        reason:reason,
        date:_date,
        value:value,
        receipt:receipt,
        excerpt:excerpt,
        cardnumber:cardnumber
      });
      transaction.save().then(function(){
        that.refresh();
      });
    },
    deleteTransaction(transaction){
      var that = this;
      if(transaction){
        transaction.destroyRecord().then(function(){
          that.refresh();
        });
      }
    }
  }
});
