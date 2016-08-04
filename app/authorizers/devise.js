import Ember from 'ember';
import Devise from 'ember-simple-auth/authorizers/devise';
const { isEmpty } = Ember;

export default Devise.extend({
  authorize(data, block) {


      const userToken          = data.accessToken;
      const userIdentification = data.uid;
      const client = data.client;

      if (!isEmpty(userToken) && !isEmpty(userIdentification) && !isEmpty(client)) {

      //  block('Authorization', `Bearer `+"access-token="+userToken+","+"client="+client);
      block("access-token", userToken);
      block("uid",userIdentification);
      block("client",client);
      }
    }

});
