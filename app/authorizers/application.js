import Devise from 'ember-simple-auth/authorizers/devise';
import Ember from 'ember';
const { isEmpty } = Ember;
export default Devise.extend({
host: 'http://127.0.0.1:3000',
});
