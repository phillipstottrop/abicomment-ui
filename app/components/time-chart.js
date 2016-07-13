import Ember from 'ember';
import d3 from 'd3';
export default Ember.Component.extend({
  classNames:['time-chart','responsive-container'],
    outerWidth:1000,
    outerHeight:600,
    margins:{
      top:40,
      right:40,
      bottom:40,
      left:40,
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

  xScale:function(){
    var data=this.get("data");
    var width=this.get("width");

    return d3.time.scale()
            .domain([d3.min(data,function(datum){return datum.time;}),new Date()])
            .range([0,width]);
  }.property("data","width"),

  yScale:function(){
    var data=this.get("data");
    var height=this.get("height");
    return d3.scale.linear()
            .domain([0,d3.max(data,function(datum){return datum.value;})])
            .range([height-10,0])
  }.property("data","height"),

  xAxis:function(){
  var xScale=this.get("xScale");
    return d3.svg.axis()
    .scale(xScale)
    // .innerTickSize(2)
    // .outerTickSize(2)
    // .tickSize(4)
    // .tickPadding(8)
    //  .tickFormat(d3.time.format('%b %d %Y'))
    //  .ticks(20)
    .orient("bottom");
  }.property("xScale"),
  yAxis:function(){
    var yScale=this.get("yScale");
      return d3.svg.axis()
      .scale(yScale)
      // .innerTickSize(0)
      // .outerTickSize(0)
      // .tickSize(4)
      // .tickPadding(8)
      //  .tickFormat(d3.time.format('%b %d %Y'))
      //  .ticks(20)
      .orient("left");
  }.property("yScale"),

  didInsertElement(){
    var svg = d3.select(this.$().get(0)).append("svg");
        svg.attr('viewBox', '0 0 '+this.get("outerWidth")+" "+this.get("outerHeight"))
        //.attr('width', this.get("outerWidth"))
        .attr('class', 'responsive-svg')
        .attr('preserveAspectRatio', 'xMinYMin meet');
      var chart = svg.append('g')
        .attr('transform', 'translate('+this.get("margins").left+","+this.get("margins").top+")")
        .attr('width', this.get("width"))
        .attr('height', this.get("height"));
    var tooltip=d3.select(this.$().get(0)).append('div')
        .attr('class', 'tooltip')
        .style("opacity",0);

        chart.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,'+(this.get("height")+1)+')')
        .call(this.get("xAxis"));

        chart.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate('+(-1)+',0)')
        .call(this.get("yAxis"));


    this.set("svg",svg);
    this.set("chart",chart);
    this.set("tooltip",tooltip);
    this.update();
  },
  update(){
    var width=this.get("width");
    var height=this.get("height");
    var data=this.get("data").sort(function(a,b){
      return b.value-a.value;
    });
    var chart=this.get("chart");
    var xScale=this.get("xScale");
    var yScale=this.get("yScale");
    var barWidth=10;
    var tooltip=this.get("tooltip");

    var chartUpdate = chart.selectAll("rect").data(data,function(datum){return datum.id});



    chart.selectAll(".x.axis")
  .call(  this.get("xAxis"));
    chart.selectAll(".y.axis")
  .call(  this.get("yAxis"));


    chartUpdate.enter()
      .append('rect')
      .attr('y', height)
      .attr('x', function(d){return (xScale(d.time)-barWidth/2);})
      .attr('width', barWidth)
      .attr('height', 0)
      .classed('admin',function(d){return d.status==="admin"})
      .classed("moderator",function(d){return d.status==="moderator"})
      .on("mouseover",function(d){
        tooltip.transition().duration(200)
        .style("opacity",0.9);
        tooltip.html(
          d.fullname+", id: "+d.id+", sign ins: "+d.value+", time:"+d3.time.format("%X")(d.time)
        )
        .style("left",d3.event.pageX+10+"px")
        .style("top",d3.event.pageY+"px");
      })
      .on("mouseout",function(){
        tooltip.transition().duration(500)
        .style("opacity",0);
      })
      .transition().duration(500)
      .attr('y', function(d){return yScale(d.value); })
      .attr('height', function(d){return height-yScale(d.value)});
    chartUpdate
      .transition().duration(500)
      .attr('class', function(d){
        return d.status;
      })
      .attr('y', function(d){return yScale(d.value); })
      .attr('x', function(d){return (xScale(d.time)-barWidth/2);})
      .attr('height', function(d){return height-yScale(d.value)});

    chartUpdate.exit()
      .transition().duration(500)
      .attr('height', 0)
      .transition()
      .remove();
  },


  updateHelper:function(){
    this.update();
  }.observes("data","xScale","yScale"),

});
