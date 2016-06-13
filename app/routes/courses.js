import Ember from 'ember';

export default Ember.Route.extend({
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
    }
  }
});
