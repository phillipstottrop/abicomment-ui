import Ember from 'ember';

import { select,event } from 'd3-selection';
import { scaleLinear,scaleTime } from 'd3-scale';
import { min, max } from 'd3-array';
import { transition } from 'd3-transition';

import axis from 'd3-axis';
import d3_shape from 'd3-shape';
import d3_time from 'd3-time-format';
// { easeCubicInOut } from 'd3-ease';

export default Ember.Component.extend({
  outerWidth:1000,
  outerHeight:800,
  margins:{
    top:50,
    right:50,
    bottom:50,
    left:70,
  },
  data:[],
  svg:null,
  chart:null,
  tooltip:null,
  selection:null,
  xScale:function(){

    var data=this.get("data");
    var width=this.get("width");
    var lowest=min(data,function(datum){return datum.time;});
    var highest=max(data,function(datum){return datum.time;});




    return scaleTime()
            .domain([lowest, highest])
            .range([0,width]);
  }.property("data.@each","width"),

  yScale:function(){
    var data=this.get("data");
    var height=this.get("height");
    var minimum = min(data,function(datum){return datum.value});

    return scaleLinear()
            .domain([minimum < 0 ? minimum : 0,max(data,function(datum){return datum.value})])
            .range([height,0]);
  }.property("data.@each","height"),

  width:function(){
    return (this.get("outerWidth")- (this.get("margins").left+this.get("margins").right));
  }.property("outerWidth","margins"),
  height:function(){
    return (this.get("outerHeight")- (this.get("margins").top+this.get("margins").bottom));
  }.property("outerHeight","margins"),

  xAxis:function(){
  var xScale=this.get("xScale");

    return axis.axisBottom()
    .scale(xScale)
    // .innerTickSize(2)
    // .outerTickSize(2)
    // .tickSize(4)
    // .tickPadding(8)
    //  .tickFormat(time.format('%b %d %Y'))
      //.ticks(7);

  }.property("xScale"),

  yAxis:function(){
    var yScale=this.get("yScale");
      return axis.axisLeft()
      .scale(yScale)
      // .innerTickSize(0)
      // .outerTickSize(0)
      // .tickSize(4)
      // .tickPadding(8)
      //  .tickFormat(d3.time.format('%b %d %Y'))
      //  .ticks(20);

  }.property("yScale"),

  line:function(){
    var xScale=this.get("xScale");
    var yScale=this.get("yScale");
    return d3_shape.line()
    .x(function(d) { return xScale(d.time); })
    .y(function(d) { return yScale(d.value); });

  }.property("data.@each","xScale","yScale"),
  didInsertElement(){
    var svg = select(this.$().get(0)).select("svg");
        svg.attr('viewBox', '0 0 '+this.get("outerWidth")+" "+this.get("outerHeight"))
        //.attr('width', this.get("outerWidth"))
        .attr('class', 'dotted-line responsive-svg')
        .attr('preserveAspectRatio', 'xMinYMin meet');

    var chart = svg.append('g')
          .attr('transform', 'translate('+this.get("margins").left+","+this.get("margins").top+")")
          .attr('width', this.get("width"))
          .attr('height', this.get("height"));

    var tooltip=select(this.$().get(0)).select(".dotted-line-container").append('div')
          .attr('class', 'tooltip')
          .style("opacity",0);

        chart.append('g')
          .attr('class', 'xaxis axis')
          .attr('transform', 'translate(0,'+(this.get("height")+1)+')')
          .call(this.get("xAxis"));

        chart.append('g')
          .attr('class', 'yaxis axis')
          .attr('transform', 'translate('+(-1)+',0)')
          .call(this.get("yAxis"));

      this.set("svg",svg);
      this.set("chart",chart);
      this.set("tooltip",tooltip);




        this.update();
  },
  update(){
    console.log("update");
    var width=this.get("width");
    var height=this.get("height");
    var data=this.get("data");
    var svg=this.get("svg");
    var chart=this.get("chart");
    var xScale=this.get("xScale");
    var yScale=this.get("yScale");
    var circleRadius=7;
    var tooltip=this.get("tooltip");
    var line = this.get("line");
    //  var min = min(data,function(datum){return datum.value});
    //  yScale.domain([min < 0 ? min : 0,d3.max(data,function(datum){return datum.value})])
    chart.selectAll(".xaxis").transition().call(this.get("xAxis"));
    chart.selectAll(".yaxis").transition().call(this.get("yAxis"));

    var lineUpdate = chart.selectAll(".line").data([1]);
    lineUpdate
      .transition().delay(200).duration(300)
      .attr('d', line(data));

    lineUpdate.enter().append('path')
      .attr('class', 'line')
      .attr('d', line(data))
      .style("fill","none")
      // .style("opacity",0)
      // .transition().duration(500)
      .style("opacity",1);


    var mouseoverHandler = function(d){
      tooltip.transition().duration(200)
      .style("opacity",0.9);

      var valueSpanClass = d.value > 0 ? "pos" : "neg";
      var differenceSpanClass = d.difference > 0 ? "pos" : "neg";

      tooltip.html(
        ""+d3_time.timeFormat("%a %d %B %Y")(d.time) + "<br>"
        +"Kontostand: "+"<span class="+valueSpanClass+">"+d.value+"</span>" +"<br>"+" Änderung: "+"<span class="+differenceSpanClass+">"+d.difference+"</span>"
      )
      .style("left",event.layerX+20+"px")
      .style("top",event.layerY+"px");
    };
    var mouseoutHandler = function(d){
      tooltip.transition().duration(200)
        .style('opacity',0);
    }

    var circleUpdate = chart.selectAll(".marker").data(data,function(d){return ""+d.id+d.value});
    circleUpdate
      .on('mouseover', mouseoverHandler)
      .on('mouseout', mouseoutHandler)
      .style('opacity', 1)
       .transition().duration(500)
       .attr('cx', function(d){return xScale(d.time);})
       .attr('cy', function(d){return yScale(d.value);})
       .style('fill',function(d){return d.difference >= 0 ? "green" : "red";});
  circleUpdate.enter().append('circle')
       .attr('class', 'marker')
       .attr('cx', function(d){return xScale(d.time);})
       .attr('cy', function(d){return yScale(d.value);})
       .style('fill',function(d){return d.difference >= 0 ? "green" : "red";})
       .attr('r', circleRadius)
       .style('opacity', 0)
       .on('mouseover', mouseoverHandler)
       .on('mouseout', mouseoutHandler)
       .transition()
       .duration(500)
       .style('opacity', 1);

    circleUpdate.exit()
       .transition().duration(200)
       .style('opacity',0)
       .transition()
       .remove();




  },
  updateHelper:function(){
    this.update();
  }.observes("data.@each","xScale","yScale","xAxis","yAxis"),

});
