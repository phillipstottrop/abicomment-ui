import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service('session'),
    courses:function(){
      var attendings = this.get("user.attendings");
      var courses = [];
      attendings.forEach(function(a){
        courses.push(a.get("course"));
      })
      return courses;
    }.property("user.attendings.@each.course"),
    withNotes:function(){
      var attendings = this.get("user.attendings");
      var arr=[];
      attendings.forEach(function(a){
        if(a.get("note")){
          arr.push(a);
        }
      });

      arr = arr.sort(function(a,b){
        return a.get("note")>b.get("note");
      });

      return arr;
    }.property('user.attendings.@each.note'),
    withoutNotes:function(){

      var attendings = this.get("user.attendings");
      var arr=[];
      attendings.forEach(function(a){
        if(!a.get("note")){
          arr.push(a);
        }
      });
      arr = arr.sort(function(a,b){
        return a.get("course.name").toLowerCase()>b.get("course.name").toLowerCase();
      });

      return arr;
    }.property('user.attendings.@each.note','courses.@each.name'),


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
