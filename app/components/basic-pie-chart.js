import Ember from 'ember';
import { select,event } from 'd3-selection';
import d3_scale from 'd3-scale';
import { min, max,sum } from 'd3-array';
import { transition } from 'd3-transition';
import d3_interpolate from 'd3-interpolate';
import axis from 'd3-axis';
import d3_shape from 'd3-shape';
import d3_time from 'd3-time-format';
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
    console.log(d3_scale);
    return min([this.get("width"),this.get("height")])/2;
  }.property("width","height"),
  colors: function(i){
    console.log(d3_scale);
    return d3_scale.schemeCategory20[i%20];
  },
  arc:function(){
    return (  d3_shape.arc()
                .outerRadius(this.get("radius")-10)
                .innerRadius(this.get("radius")/2));
  }.property("radius"),
  pie: d3_shape.pie()
          .sort(null)
          .value(function(d){return d.value;}),
  didInsertElement(){
    var svg = select(this.$().get(0)).append("svg");
        svg.attr('viewBox', '0 0 '+this.get("outerWidth")+" "+this.get("outerHeight"))
        //.attr('width', this.get("outerWidth"))
        .attr('class', 'responsive-svg')
        .attr('preserveAspectRatio', 'xMinYMin meet');
      var chart = svg.append('g')
        .attr('transform', 'translate('+(this.get("margins").left+this.get("width")/2)+","+(this.get("margins").top+this.get("height")/2)+")")
        .attr('width', this.get("width"))
        .attr('height', this.get("height"));
    var tooltip=select(this.$().get(0)).append('div')
        .attr('class', 'tooltip')
        .style("opacity",0);
    this.set("svg",svg);
    this.set("chart",chart);
    this.set("tooltip",tooltip);
this.update();
  },
  update(){
    var data =this.get("data").map(function(d){return d;}).sort(function(a,b){
      return b.value-a.value;
    });

    var chart=this.get("chart");
    var tooltip=this.get("tooltip");
    var arc=this.get("arc");
    var pie=this.get("pie");
      //pie.value(function(d) { return d.value; });
    var colors=this.get("colors");
    var path = chart.datum(data).selectAll("path").data(pie);

    //enter
    path.enter().append("path")
    .attr("fill", function(d, i) { return colors(i); })
    .attr("d", arc)
    .on("mouseover",function(d){
      tooltip.transition().duration(200)
      .style("opacity",0.9);
      tooltip.html(d.data.key+" : "+d.value+" Stimmen ("+ Math.round(100*(d.data.value*100/sum(data,function(o){return o.value;})))/100+"%)")
      .style("left",event.layerX+20+"px")
      .style("top",event.layerY+"px");
    })
    .on("mouseout",function(){
      tooltip.transition().duration(500)
      .style("opacity",0);
    })
    .each(function(d) { this._current = d; });

    //update
    path.on("mouseover",function(d){
      tooltip.transition().duration(200)
      .style("opacity",0.9);
      tooltip.html(d.data.key+" : "+d.value+" Stimmen ("+ Math.round(100*(d.data.value*100/sum(data,function(o){return o.value;})))/100+"%)")
      .style("left",event.layerX+20+"px")
      .style("top",event.layerY+"px");
    })
    .on("mouseout",function(){
      tooltip.transition().duration(500)
      .style("opacity",0);
    })

    var that=this;
    path=path.data(pie);
   path.transition().duration(750).attrTween('d',function(a){return that.get("arcTween")(a,that,this);});
  },
  arcTween : function(a,that,thot) {
    var arc = that.get("arc");
    thot._current =thot._current || 0;
     var i = d3_interpolate.interpolate(thot._current, a);
     console.log(i);
     thot._current = i(0);
     return function(t) {
       return arc(i(t));
     };
   },


  updateHelper:function(){
    this.update();
  }.observes("data","xScale","yScale"),

});
