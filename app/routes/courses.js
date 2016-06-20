import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Ember.Route.extend(AuthenticatedRouteMixin,{
  model(){
return this.store.findAll("course");
  },
  actions:{
    createCourse(teacher,name){
      var c = this.store.createRecord("course",{
        name:name,
        teacher:teacher
      });
      c.save().then(function(){
        c.reload();
      });
    },
    transition(course){
      this.transitionTo("courses.course",course.get("id"));
    }
  }
});
