import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
   host: config.host,

  authorizer: 'authorizer:devise',
  urlForFindRecord(id, modelName, snapshot) {
  let url = this._super(...arguments);
  let query = Ember.get(snapshot, 'adapterOptions.query');
  if (query) {
    url += '?' + Ember.$.param(query); // assumes no query params are present already
  }
  return url;
},


  pathForType: function(type) {
   return Ember.String.pluralize(Ember.String.underscore(type));
 },
 handleResponse(status,headers){
   console.log(headers);
   var token = headers["access-token"];
   var client = headers["client"];
   var userIdentification=headers["uid"];
   var expiry=headers["expiry"];
   console.log(token);
   console.log(client);
   console.log(userIdentification);
   console.log(expiry);
   if (token) {
     console.log("used to be: ");
     console.log(this.get("session.data.authenticated"));
     this.get("session").set("data.authenticated.accessToken",token);
     this.get("session").set("data.authenticated.client",client);
     this.get("session").set("data.authenticated.uid",userIdentification);
     this.get("session").set("data.authenticated.expiry",expiry);
     console.log("now: ");
     console.log(this.get("session.data.authenticated"));
     console.log(this.get("session.data"));
   }
   return this._super(...arguments);
 },


});
