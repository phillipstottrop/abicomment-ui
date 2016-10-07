import Ember from 'ember';

export default Ember.Component.extend({

  data:function(){

    var options=this.get("options");
    var arr=[];
    options.forEach(function(o){

      if(o.get("title")){
      arr.push({key:o.get("title"),value:o.get("voteamount"),id: +o.get("id")});
}

    });
   return arr;

 }.property("options.@each.voteamount"),
  lol:function(){
    console.log("observer");
  }.observes("options"),


});
