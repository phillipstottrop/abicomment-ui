import Ember from 'ember';
import Devise from 'ember-simple-auth/authorizers/devise';
const { isEmpty } = Ember;

export default Devise.extend({
  authorize(data, block) {
    alert("trying to authorize");

      const userToken          = data.accessToken;
      const userIdentification = data.uid;
      console.log(data);
      console.log(userToken);
      console.log(userIdentification);
      if (!isEmpty(userToken) && !isEmpty(userIdentification)) {
        console.log("yay");
        block('Authorization', `Bearer `+userToken);
        block("uid",userIdentification);
      }
    }

});
