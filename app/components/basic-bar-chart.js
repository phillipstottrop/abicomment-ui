import Ember from 'ember';
import d3 from 'd3';
export default Ember.Component.extend({

    outerWidth:300,
    outerHeight:400,
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
  xScale:function(){
    var data=this.get("data");
    var width=this.get("width");
    console.log(data);

    return d3.scale.linear()
            .domain([0,d3.max(data,function(o){return o.value;})])
            .range([10,width]);
  }.property("data","width"),
  yScale:function(){
    var data=this.get("data");
    var height=this.get("height");
    console.log(data);
    return d3.scale.ordinal()
            .domain(data.map(function(o){return o.key;}))
            .rangeRoundBands([0,height]);
  }.property("data","height"),

  width:function(){
    return (this.get("outerWidth")- (this.get("margins").left+this.get("margins").right));
  }.property("outerWidth","margins"),
  height:function(){
    return (this.get("outerHeight")- (this.get("margins").top+this.get("margins").bottom));
  }.property("outerHeight","margins"),
  didInsertElement(){
    var svg = d3.select(this.$().get(0)).append("svg")
        .attr('width', this.get("outerWidth"))
        .attr('height', this.get("outerHeight"));
    var chart = svg.append('g')
        .attr('transform', 'translate('+this.get("margins").left+","+this.get("margins").top+")")
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
    console.log("yay");
    var data=this.get("data");
    var chart=this.get("chart");
    var xScale=this.get("xScale");
    var yScale=this.get("yScale");
    var barHeight=this.get("height")/data.length/4*3;
    var tooltip=this.get("tooltip");

    var chartUpdate = chart.selectAll("rect").data(data);

    chartUpdate.enter()
      .append('rect')
      .attr('x', 0)
      .attr('height', barHeight)
      .on("mouseover",function(d){
        tooltip.transition().duration(200)
        .style("opacity",0.9);
        tooltip.html(d.key+" : "+d.value+" Stimmen ("+ Math.round(100*(d.value*100/d3.sum(data,function(o){return o.value;})))/100+"%)")
        .style("left",d3.event.pageX+10+"px")
        .style("top",d3.event.pageY+"px");
      })
      .on("mouseout",function(){
        tooltip.transition().duration(500)
        .style("opacity",0);
      })
      .attr('y', function(d){return yScale(d.key); })
      .attr('width', function(d){return xScale(d.value);});
    chartUpdate
      .transition().duration(500)
      .attr('width', function(){return xScale(0);})
      .transition().duration(500)
      .attr('width', function(d){return xScale(d.value);})
      .attr('y', function(d){return yScale(d.key); })
      .attr('height', barHeight);
    chartUpdate.exit()
      .transition().duration(500)
      .attr('width', 0)
      .transition()
      .remove();

  },
  updateHelper:function(){
    this.update();
  }.observes("data","xScale","yScale"),
});
