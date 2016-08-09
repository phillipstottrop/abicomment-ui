import Ember from 'ember';

export default Ember.Component.extend({
store:Ember.inject.service(),
allUsers:[],
directComments:[],
indirectUsers:[],
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
  console.log(indirectUsers);
  var that = this;
  selected.forEach(function(user){
    rev.push(user);
  });
  indirectUsers.forEach(function(user){
    var contains = that.arrayContainsUser(rev,user);

    if(!contains){
      rev.push(user);
    }
  });
  return rev;
}.property("selected","indirectUsers.@each"),
updateIndirectUsers:function(){
  var directComments=this.get("directComments");
  var that = this;
  that.set("indirectUsers",[]);
  directComments.forEach(function(comment){
    comment.get("user").then(function(user){
      if(user){
      var users = that.get("indirectUsers");
      var _users = users.copy();
      _users.push(user);
      that.set("indirectUsers",_users);
    }
    });
  })
}.observes("directComments.@each"),
updateDirectComments:function(){
  this.set("directComments",[]);
  var selected=this.get("selected");
  var that = this;

  selected.forEach(function(user){
    user.get("commentswritten").then(function(comments){
      comments.forEach(function(comment){
        if(comment.get("user.id") && comment.get("commentor.id")){
        var directComments=that.get("directComments");
        var directs = directComments.copy();
        directs.push(comment);
        that.set("directComments",directs);
      }
      });
    });
  });
}.observes("selected"),
arrayContainsUser:function(arr,u){
  var temp = false;
  arr.forEach(function(item){
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
      connections:0,
    };
    i++;
    return node;
  });
  directComments.forEach(function(comment){
    var source = that.getIndexOfUserID(comment.get("commentor.id"),nodes);
    var target = that.getIndexOfUserID(comment.get("user.id"),nodes);
    var _comment = {
        id:comment.get("id"),
        text:comment.get("text")
      };
    var sameLink = that.getSameLink(source,target,links);
  //  console.log(sameLink);
    if(sameLink != null){
      console.log("pushed same link");
      sameLink.comments.push(comment);
    }else {


    var link={
      comments:[_comment],
      source:source,
      target:target
    }
    links.push(link);
  }

    //that.addConnectionToIdInNodes(comment.get("commentor.id"),nodes);

  });




//  console.log(nodes);
  _graph.nodes=nodes;
  _graph.links=links;
  console.log(_graph);
  return _graph;
}.property("directComments","relevantUsers"),
addConnectionToIdInNodes(id,nodes){
  nodes[this.getIndexOfUserID(id,nodes)].connections++;
},
getSameLink(source,target,links){

  var _link = null;
  links.forEach(function(link){
    // console.log(source +":"+link.source);
    // console.log(target +":"+link.target);
    // console.log("....");

    if(link.source==source && link.target==target){
      _link=link;
    }
  });
  return _link;
},
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
    // console.log(user);
    // console.log(this.get("selected"));
    this.set("selected",user);
  },
  addAllUsers(){
    this.set("selected",this.get("allUsers"));
  },
  removeAllUsers(){
    this.set("selected",[]);
  },

}
});
