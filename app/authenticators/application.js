import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
import Ember from 'ember';

const { RSVP, isEmpty, run } = Ember;

export default DeviseAuthenticator.extend({
  serverTokenEndpoint:"http://127.0.0.1:3000/auth/sign_in",
host: 'http://127.0.0.1:3000',

  restore(data){
    return new RSVP.Promise((resolve, reject) => {
      if (!isEmpty(data.accessToken) && !isEmpty(data.expiry) &&
          !isEmpty(data.tokenType) && !isEmpty(data.uid) && !isEmpty(data.client)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
  // authenticate(email, password) {
  //    return new Promise((resolve, reject) => {
  //      const { resourceName, identificationAttributeName } = this.getProperties('resourceName', 'identificationAttributeName');
  //      const data         = {};
  //      data.password =  password ;
  //      data.email = email;
  //
  //      return this.makeRequest(data).then(
  //        (response) => run(null, resolve, response),
  //        (xhr) => run(null, reject, xhr.responseJSON || xhr.responseText)
  //      );
  //    });
  //  },
  authenticate(identification, password) {
    return new RSVP.Promise((resolve, reject) => {
      const { identificationAttributeName } = this.getProperties('identificationAttributeName');
      const data         = { password };
      data[identificationAttributeName] = identification;

      this.makeRequest(data).then(function(response, status, xhr) {
        //save the five headers needed to send to devise-token-auth
        //when making an authorized API call
        console.log(xhr.getResponseHeader("access-token"));
        var result = {
          accessToken: xhr.getResponseHeader('access-token'),
          expiry: xhr.getResponseHeader('expiry'),
          tokenType: xhr.getResponseHeader('token-type'),
          uid: xhr.getResponseHeader('uid'),
          client: xhr.getResponseHeader('client')

        };
  console.log(result.accessToken);
       run(null, resolve, result);

      }, function(xhr) {
        run(null, reject, xhr.responseJSON || xhr.responseText);
      });
    });
  },
});
