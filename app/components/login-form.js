import Ember from 'ember';
const { service } = Ember.inject;
export default Ember.Component.extend({
    session: service('session'),
    errorMessage:null,
      actions: {
        authenticate() {
          alert("trying to authenticate");
          var credentials = this.getProperties(
        				'email', 'password'
        			);
              var email= this.get("email");
              var password=this.get("password");
              console.log(credentials);
        			this.get('session').authenticate(
        				'authenticator:devise',
        				email,password
        			);

        }
      }


});
