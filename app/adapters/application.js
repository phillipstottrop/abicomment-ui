import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
   host: config.host,
  authorizer: 'authorizer:devise' ,
  pathForType: function(type) {
   return Ember.String.pluralize(Ember.String.underscore(type));
 }
});
