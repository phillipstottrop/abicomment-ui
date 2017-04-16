import Ember from 'ember';

export default Ember.Component.extend({
  //sortBy:['id:desc'],
  sortedPolls:Ember.computed.sort("polls",function(a,b){
    return +a.get("id") < +b.get("id");
  }),

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
