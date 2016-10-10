import Ember from 'ember';

export default Ember.Component.extend({
  //sortBy:['id:desc'],
  //sortedPolls:Ember.computed.sort("polls","sortBy"),
  sortedPolls:function(){
    var polls = this.get("polls");
    return polls.map(function(p){return p}).sort(function(a,b){
      return +b.get("id") - +a.get("id");
    });
    }.property("polls"),
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
