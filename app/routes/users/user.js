import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return this.store.findRecord("user",params.user_id);
  },
  actions:{
    createComment(text,user){
      var comment=this.store.createRecord("comment",{
        text:text,
        user:user
      });
      comment.save();
    }
  }
});
