import Ember from 'ember';

export default Ember.Component.extend({
  rawData:[],
  selected:[],
  store: Ember.inject.service(),
  didInsertElement(){
    var that = this;
  this.get("store").findAll("user").then(function(users){

    that.set("rawData",users);
  })
},
  data:function(){
    var raw=this.get("selected");
    var arr=[];
    arr=raw.map(function(user){
      if(user.get("currentsigninat")){


        return{
          value:user.get("signincount"),
          time:new Date(user.get("currentsigninat")),
          fullname:user.get("fullname"),
          id:user.get("id"),
          ip:user.get("currentsigninip"),
          status:user.get("status")
        }
      }else{
        return null;
      }
      });
      arr=arr.filter(function(d){
        return d!=null;
      });

  return  arr;

}.property("rawData","selected"),
actions:{
  setCurrentUsers(user){

    this.set("selected",user);
  },
  addAllUsers(){
    this.set("selected",this.get("rawData"));
  },
  removeAllUsers(){
    this.set("selected",[]);
  }
}
});
