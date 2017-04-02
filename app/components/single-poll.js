import Ember from 'ember';

export default Ember.Component.extend({

  filter: '' ,
  filteredOptions:function(){
    var options = this.get("poll.options").filter((option)=>{

      if(!option.get("title")  ){
        return false;
      }
      if(this.get("filter").length<1){
        return true;
      }
      var title=option.get("title").toLowerCase();
      var filter=this.get("filter").toLowerCase();
      return title.indexOf(filter)>-1;
    });

    return options;
  }.property("poll.options.@each.title","filter"),
  voteAmount:function(){
    var amount = 0;

    var options = this.get("poll.options");
    if (options) {

    options.forEach(function(o){
      amount+=o.get("voteamount");
    });
    }

    return amount;


  }.property("poll.options.@each.voteamount"),
  shouldShowVoteAmount:function(){
    var voteAmount=this.get("voteAmount");

    if (!isNaN(voteAmount) && voteAmount != undefined && voteAmount != 0) {
      return true;
    }else{
      return false;
    }
  }.property("voteAmount"),
  actions:{
    vote(option){
      if(option){
        this.sendAction("vote",option);
      }
    },

    blur(blur){
    this.sendAction("blur",blur);
  },
  delete(){
    this.set("showingModal",false);
    this.sendAction("blur",false);
    var poll=this.get("poll");
    if(poll){
      poll.destroyRecord();
    }
  },
  open(){
    this.set("showingModal",true);
    this.sendAction("blur",true);
  },
  close(){
    this.set("showingModal",false);
    this.sendAction("blur",false);

  },
  startReload(){

   this.get("poll").startAutoReloading();
 },
 stopReload(){
   this.get("poll").stopAutoReloading()
 },
  },
});
