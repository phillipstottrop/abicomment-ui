import Ember from 'ember';

export default Ember.Component.extend({
  //sortBy:['id:desc'],
  sortedComments:Ember.computed.sort("comments",function(a,b){
    return +a.get("id") < +b.get("id");
  }),
  actions:{
    blur(blur){

        this.sendAction("blur",blur);

    }
  }
});
