import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('users',{path:"users"},function(){
    this.route('user',{path:":user_id"});
  });

  this.route('login');
  this.route('quotes');
  this.route('polls');
});

export default Router;
