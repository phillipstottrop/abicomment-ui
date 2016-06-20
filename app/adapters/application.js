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
 }

});
