import Ember from 'ember';

export default Ember.Component.extend({
showing:false,
showingModal:false,
date:function(){
  var days = ["So","Mo","Di","Mi","Do","Fr","Sa"];
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];
  var date = this.get("transaction.date");
  var str = null;
  if(date){
    str = days[date.getDay( )]+" "+date.getDate() + ". "+months[date.getMonth()]+" "+date.getFullYear();
  }
  return str;
}.property("transaction.date"),
changeClass:function(){
  var value = this.get("transaction.value");
  var str = "change ";
  if(value < 0){
    str += "pay ";
  }
  if(value == 0){
    str += "neutral ";
  }
  if(value > 0){
    str += "receive ";
  }
  return str;
}.property("transaction.value"),
containerClass:function(){
  var str = "single-transaction ";
  var value = this.get("transaction.value");
  if(value < 0){
    str += "neg";
  }else if (value > 0) {
    str += "pos";
  }
  console.log(str);
  return str;
}.property("transaction.value"),
actions:{
  toggleShowing(){
    this.toggleProperty("showing");
  },
  delete(){
    this.set("showingModal",false);
    this.sendAction("blur",false);
    var transaction=this.get("transaction");
    this.sendAction("deleteTransaction",transaction);
  },
  open(){
    this.set("showingModal",true);
    this.sendAction("blur",true);
  },
  close(){
    this.set("showingModal",false);
    this.sendAction("blur",false);

  },
}
});
