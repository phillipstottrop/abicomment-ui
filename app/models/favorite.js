import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  favoritee: DS.belongsTo('user',{inverse:"favorited"})
});
