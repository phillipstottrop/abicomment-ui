import Ember from 'ember';

export default Ember.Component.extend({
    withNotes:function(){
      var attendings = this.get("user.attendings");
      var arr=[];
      attendings.forEach(function(a){
        if(a.get("note")){
          arr.push(a);
        }
      });
      return arr;
    }.property('user.attendings'),
    withoutNotes:function(){
      var attendings = this.get("user.attendings");
      var arr=[];
      attendings.forEach(function(a){
        if(!a.get("note")){
          arr.push(a);
        }
      });
      return arr;
    }.property('user.attendings'),
  

  actions:{
    create(text){

      var user=this.get("user");
      var commentorId=this.getResponseJSON().id;
      if (text && user) {

         this.sendAction("create",text,user,commentorId);
         this.set("text","");
      }


    },
    blur(blur){

        this.sendAction("blur",blur);

    }
  }
});
