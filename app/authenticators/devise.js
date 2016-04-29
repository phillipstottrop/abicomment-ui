import Devise from 'ember-simple-auth/authenticators/devise';
const { RSVP: { Promise }, isEmpty, run, get, $ } = Ember;

export default Devise.extend({
  serverTokenEndpoint: 'http://localhost:3000/auth/sign_in',
  authenticate(identification, password) {
   return new Promise((resolve, reject) => {
     var data={email:identification,password:password};

     this.makeRequest(data).then(function(response, status, xhr) {
       //save the five headers needed to send to devise-token-auth
       //when making an authorized API call
       var result = {
         accessToken: xhr.getResponseHeader('access-token'),
         expiry: xhr.getResponseHeader('expiry'),
         tokenType: xhr.getResponseHeader('token-type'),
         uid: xhr.getResponseHeader('uid'),
         client: xhr.getResponseHeader('client')
       };

       run(null, resolve, result);
     }, function(xhr) {
       run(null, reject, xhr.responseJSON || xhr.responseText);
     });
   });
 }
});
