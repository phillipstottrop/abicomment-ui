import Ember from 'ember';

export default Ember.Component.extend({
active:false,
actions:{
  toggle(){
    if(this.get("active")){
      this.set('active',false);
      this.sendAction("off");
    }else{
      this.set('active',true);
      this.sendAction('on');
    }
  }
}
});
