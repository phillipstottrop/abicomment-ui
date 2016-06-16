import Ember from 'ember';

export default Ember.Component.extend({
    withNotes:function(){
      console.log("compute with notes");
      var attendings = this.get("user.attendings");
      var arr=[];
      attendings.forEach(function(a){
        if(a.get("note")){
          arr.push(a);
        }
      });
      console.log(arr);
      return arr;
    }.property('user.attendings.@each.note'),
    withoutNotes:function(){
      console.log("compute without notes");

      var attendings = this.get("user.attendings");
      var arr=[];
      attendings.forEach(function(a){
        if(!a.get("note")){
          arr.push(a);
        }
      });

      return arr;
    }.property('user.attendings.@each.note'),
    session: Ember.inject.service('session'),
    getResponseJSON(){
      return this.get("session.data").authenticated.responseJSON;
    },
    isCurrentUser(id){
      return (this.getResponseJSON().id.toString()===id);
    },
    currentUser:function(){
      var id=this.get("user").id;
      return this.isCurrentUser(id);
    }.property("user"),


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
