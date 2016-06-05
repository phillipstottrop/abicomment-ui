import Ember from 'ember';

export default Ember.Component.extend({

  data:function(){

    var options=this.get("options");
    console.log(options);
    var arr=[];
    var notLoaded=false;
    options.forEach(function(o){
console.log(o);


      arr.push({key:o.get("title"),value:o.get("voteamount")});


    });


   return arr;

 }.property("options.@each"),
  lol:function(){
    console.log("observer");
  }.observes("options"),
  actions:{
    debug(){
      console.log(this.get("data"));
    }
  }

});
