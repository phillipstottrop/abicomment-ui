import Ember from 'ember';

export default Ember.Controller.extend({
session: Ember.inject.service('session'),

sortFavoritesBy:["favoritee.name:asc","favoritee.forename:asc"],
sortedFavorties:Ember.computed.sort("model.favorites","sortFavoritesBy"),

getResponseJSON(){
  return this.get("session.data").authenticated.responseJSON;
},
currentUserId:function(){
  return this.getResponseJSON().id;
}.property("session"),
name:function(){
  return this.getResponseJSON().name;
}.property("session"),
forename:function(){
  return this.getResponseJSON().forename;
}.property("session"),
});
