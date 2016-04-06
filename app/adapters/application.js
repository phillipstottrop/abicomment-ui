import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
   host: 'http://127.0.0.1:3000',
  authorizer: 'authorizer:devise'
});
