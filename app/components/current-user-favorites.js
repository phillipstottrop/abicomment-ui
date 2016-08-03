import Ember from 'ember';

export default Ember.Component.extend({
  favorites:function(){
    var favorites=[];
    for (var i = 0; i < 50; i++) {
      favorites.push({
        fullname:"f: "+i,
         id:i

      });
    }
    return favorites;
  }.property(),
});
