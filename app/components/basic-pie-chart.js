import Ember from 'ember';
import d3 from 'd3';
export default Ember.Component.extend({
  classNames:['chart','responsive-container'],
    outerWidth:500,
    outerHeight:500,
    margins:{
      top:10,
      right:10,
      bottom:10,
      left:10,
    },


  data:[],
  svg:null,
  chart:null,
  tooltip:null,

  width:function(){
    return (this.get("outerWidth")- (this.get("margins").left+this.get("margins").right));
  }.property("outerWidth","margins"),
  height:function(){
    return (this.get("outerHeight")- (this.get("margins").top+this.get("margins").bottom));
  }.property("outerHeight","margins"),
  radius:function(){
    return d3.min([this.get("width"),this.get("height")])/2;
  }.property("width","height"),
  colors:d3.scale.category20(),
  arc:function(){
    return (  d3.svg.arc()
                .outerRadius(this.get("radius")-10)
                .innerRadius(this.get("radius")/2));
  }.property("radius"),
  pie: d3.layout.pie()
          .sort(null)
          .value(function(d){return d.value;}),
  didInsertElement(){
    var svg = d3.select(this.$().get(0)).append("svg");
        svg.attr('viewBox', '0 0 '+this.get("outerWidth")+" "+this.get("outerHeight"))
        //.attr('width', this.get("outerWidth"))
        .attr('class', 'responsive-svg')
        .attr('preserveAspectRatio', 'xMinYMin meet');
      var chart = svg.append('g')
        .attr('transform', 'translate('+(this.get("margins").left+this.get("width")/2)+","+(this.get("margins").top+this.get("height")/2)+")")
        .attr('width', this.get("width"))
        .attr('height', this.get("height"));
    var tooltip=d3.select(this.$().get(0)).append('div')
        .attr('class', 'tooltip')
        .style("opacity",0);
    this.set("svg",svg);
    this.set("chart",chart);
    this.set("tooltip",tooltip);
this.update();
  },
  update(){

    var data =this.get("data").map(function(d){return d;});
    var chart=this.get("chart");
    var tooltip=this.get("tooltip");
    var arc=this.get("arc");
    var pie=this.get("pie");
      //pie.value(function(d) { return d.value; });
    var colors=this.get("colors");
    var path = chart.datum(data).selectAll("path").data(pie);

    path.enter().append("path")
    .attr("fill", function(d, i) { return colors(i); })
    .attr("d", arc)
    .on("mouseover",function(d){
      tooltip.transition().duration(200)
      .style("opacity",0.9);
      tooltip.html(d.data.key+" : "+d.value+" Stimmen ("+ Math.round(100*(d.data.value*100/d3.sum(data,function(o){return o.value;})))/100+"%)")
      .style("left",d3.event.pageX+10+"px")
      .style("top",d3.event.pageY+"px");
    })
    .on("mouseout",function(){
      tooltip.transition().duration(500)
      .style("opacity",0);
    })
    .each(function(d) { this._current = d; });

    var that=this;
    path=path.data(pie);
    path.transition().duration(750).attrTween('d',function(a){return that.get("arcTween")(a,that,this);});
  },
  arcTween : function(a,that,thot) {
    var arc = that.get("arc");
    thot._current =thot._current || 0;
     var i = d3.interpolate(thot._current, a);
     thot._current = i(0);
     return function(t) {
       return arc(i(t));
     };
   },


  updateHelper:function(){
    this.update();
  }.observes("data","xScale","yScale"),

});
