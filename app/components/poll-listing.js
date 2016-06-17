import Ember from 'ember';

export default Ember.Component.extend({
  sortBy:['id:desc'],
  sortedPolls:Ember.computed.sort("polls","sortBy"),
  
  actions:{
    voteForOption(option){
      if(option){
        this.sendAction("voteForOption",option);
      }},



  blur(blur){
  this.sendAction("blur",blur);
  }
  }
});
