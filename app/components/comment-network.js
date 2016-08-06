import Ember from 'ember';

export default Ember.Component.extend({
store:Ember.inject.service(),
allUsers:[],
directComments:[],
indirectUsers:[],
showing:false,
didInsertElement(){
  var store=this.get("store");
  var that= this;
  store.findAll("user").then(function(users){
    that.set("allUsers",users);
  })
},
relevantUsers:function(){
  var rev = [];
  var selected = this.get("selected") || [];
  var indirectUsers=this.get("indirectUsers");
  var that = this;
  selected.forEach(function(user){
    rev.push(user);
  });
  indirectUsers.forEach(function(user){
    var contains = that.arrayContainsUser(rev,user);
    console.log(contains);
    if(!contains){
      rev.push(user);
    }
  });
  return rev;
}.property("selected","indirectUsers.@each"),
updateIndirectUsers:function(){
  var directComments=this.get("directComments");
  var that = this;
  directComments.forEach(function(comment){
    comment.get("user").then(function(user){
      var users = that.get("indirectUsers");
      var _users = users.copy();
      _users.push(user);
      that.set("indirectUsers",_users);
    });
  })
}.observes("directComments.@each"),
updateDirectComments:function(){
  this.set("directComments",[]);
  var selected=this.get("selected");
  var that = this;

  selected.forEach(function(user){
    console.log("adding commentswritten");
    user.get("commentswritten").then(function(comments){
      comments.forEach(function(comment){
        console.log("adding: "+comment.get("text"));

        var directComments=that.get("directComments");
        var directs = directComments.copy();
        directs.push(comment);
        that.set("directComments",directs);

      });
    });
  });
}.observes("selected"),
arrayContainsUser:function(arr,u){
  var temp = false;
  arr.forEach(function(item){
    console.log("item id: "+item.id+" user id: "+ u.get('id'));
    if(item.get("id")==u.get("id")){
      console.log("huh?");
      temp= true;
    }
  });
  return temp;
},
graph:function(){
var directComments=this.get("directComments");
var relevantUsers=this.get("relevantUsers");
var _graph = {};
var nodes=[];
var links=[];
var that= this;
  var i = 0;
  nodes =relevantUsers.map(function(user){
    var node = {
      id:user.get("id"),
      name:user.get("fullname"),
      index:i,
    };
    i++;
    return node;
  });
  links=directComments.map(function(comment){
    var link={
      id:comment.get("id"),
      text:comment.get("text"),
      source:that.getIndexOfUserID(comment.get("commentor.id"),nodes),
      target:that.getIndexOfUserID(comment.get("user.id"),nodes)
    }
    console.log(link);
    return link;
  });




  console.log(nodes);
  _graph.nodes=nodes;
  _graph.links=links;
  console.log(_graph);
  return _graph;
}.property("directComments","relevantUsers"),
getIndexOfUserID:function(id,arr){
  var index = -1;
  arr.forEach(function(item){
    if(item.id == id){
      index=item.index;
    }
  });
  if(index <0){
    console.log("SHOULD NOT HAVE HAPPEND");
  }
  return index;
},
actions:{
  setCurrentUsers(user){
    console.log(user);
    console.log(this.get("selected"));
    this.set("selected",user);
  },
  addAllUsers(){
    this.set("selected",this.get("allUsers"));
  },
  removeAllUsers(){
    this.set("selected",[]);
  },
  toggleShowing(){
    this.set("showing", this.get("showing") ? false:true);
  }
}
});
