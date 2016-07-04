import Ember from 'ember';

export default Ember.Component.extend({
  saving:false,
  store: Ember.inject.service(),
  createable:function(){
    var topic=this.get("poll.topic");

    return (topic && this.get("poll.options").length>1 && !this.get("saving"));
  }.property("poll.topic","poll.options","saving"),
  fuzzyCompare(term1,term2){
    term1=term1.toLowerCase();
    term1=term1.replace("frau","");
    term1=term1.replace("herr","");
    term1=term1.trim();

    term2=term2.toLowerCase();
    term2=term2.replace("frau","");
    term2=term2.replace("herr","");
    term2=term2.trim();
    return (term1===term2);
  },
  fuzzySearch(term,arr){
    var that=this;
    var result=false;
    arr.forEach(function(o){

      if(that.fuzzyCompare(term,o)){
        result=true;
      }
    });
    return result;
  },

  actions:{
    createOption(title){
      var poll=this.get("poll");
      var store=this.get("store");
      if(title && poll){
        var option= store.createRecord("option",{title:title});
        poll.get("options").pushObject(option);
      }
    },
    savePoll(){
      var that=this;
      var poll=this.get("poll");

      if(this.get("createable") ){
        this.set("saving",true);
        poll.save().then(function(){
          poll.reload().then(function(){
          Ember.RSVP.Promise.all(  poll.get("options").map(function(o){
              o.set("poll",poll);
            return o.save();
          }) ).then(function(){
            that.sendAction("redirect");

          });
          });
        });

      }
    },
    delete(option){
      option.destroy();
    },
  allUsers(){
    var poll=this.get("poll");
    var store=this.get("store");

    store.findAll("user").then(function(users){
      users.forEach(function(user){

        var fullName=user.get("fullname");
        var option=store.createRecord("option",{
          title:fullName,
        });
        poll.get("options").pushObject(option);

      });
    });
  },
  allCourses(){
    var poll=this.get("poll");
    var store=this.get("store");

    store.findAll("course").then(function(courses){
      courses.forEach(function(course){

        var name=course.get("name")+" bei "+course.get("teacher");
        var option=store.createRecord("option",{
          title:name,
        });
        poll.get("options").pushObject(option);

      });
    });
  },
  allTeachers(){
    var poll=this.get("poll");
    var store=this.get("store");


    var arr=[];
    var that=this;
    store.findAll("course").then(function(courses){
      courses.forEach(function(course){

        var options=poll.get("options");

        var names=options.map(function(o){
          return o.get("title")
        });


        var teacher=course.get("teacher");
        //console.log(that.fuzzySearch(teacher,names));
        if(!that.fuzzySearch(teacher,names)){
        var option=store.createRecord("option",{
          title:teacher,
        });
        poll.get("options").pushObject(option);
      }
      });
    });
  },
  removeAll(){
    var poll=this.get('poll');
    poll.get('options').forEach(function(option){
      option.destroy();
    });
  }
},

});
