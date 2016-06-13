import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return this.store.findRecord("course",params.course_id);
  },
  actions:{
    joinCourse(){
    var note =  this.controllerFor('courses.course').get("note");
    var course = this.controllerFor('courses.course').get("model");
    console.log(course);
    var attending=this.store.createRecord("attending",{note:note,course:course});
    attending.save().then(function(){
      course.reload();
    });
  },
  leaveCourse(attending){
    var course = this.controllerFor('courses.course').get("model");
    attending.destroyRecord().then(function(){
      course.reload();
    });
  },
  createAnecdote(text){
    var course = this.controllerFor('courses.course').get("model");
    var a = this.store.createRecord('anecdote',{
      course:course,
      text:text
    });
    a.save().then(function(){
      course.reload();
    });
  },
  deleteAnecdote(anecdote){
    
    anecdote.destroyRecord();
  }
  }
});
