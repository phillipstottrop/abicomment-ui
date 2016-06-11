import Ember from 'ember';

export default Ember.Component.extend({
  sortBy:['id:desc'],
  sortedComments:Ember.computed.sort("comments","sortBy"),
  actions:{
    blur(blur){

        this.sendAction("blur",blur);

    }
  }
});
