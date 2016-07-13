import Ember from 'ember';

export default Ember.Component.extend({
  rawData:[],
  store: Ember.inject.service(),
  didInsertElement(){
    var that = this;
  this.get("store").findAll("user").then(function(users){
    console.log(users);
    that.set("rawData",users);
  })
},
  data:function(){
    var raw=this.get("rawData");
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
        return null
      }
      });
      arr=arr.filter(function(d){
        return d!=null;
      })
      console.log(arr);
  return  arr;

  }.property("rawData")
});
