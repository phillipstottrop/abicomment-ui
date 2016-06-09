import Ember from 'ember';
const { service } = Ember.inject;
export default Ember.Component.extend({
    session: service('session'),
    errorMessage:null,
      actions: {
        authenticate(){
          var identification = this.get("identification").trim();
          var password = this.get("password");
	        this.get('session').authenticate(
        				'authenticator:devise',
        				identification,password
        			).catch((reason) => {
                console.log(reason);
        this.set('errorMessage', reason.errors || reason);
      });
        }
      }


});
