import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({
  data:[],
  width:1000,
  height:400,
  svg:null,
  tooltip:null,
  force:null,
  didInsertElement(){
    var data=this.get("data");
    var svg = d3.select(this.$().get(0)).append('svg');
    svg.attr('viewBox', '0 0 '+this.get("width")+" "+this.get("height"))
    //.attr('width', this.get("outerWidth"))
    .attr('class', 'responsive-svg')
    .attr('preserveAspectRatio', 'xMinYMin meet');
    var tooltip=d3.select(this.$().get(0)).append('div')
        .attr('class', 'tooltip')
        .style("opacity",0);
    var force = d3.layout.force()
        .charge(-120)
        //.linkDistance(90)
        .size([this.get("width"),this.get("height")]);


      console.log(data);



    this.set("svg",svg);
    this.set("tooltip",tooltip);
    this.set("force",force);
    this.update();

  },
  update(){
    var data=this.get("data");
    var force = this.get("force");
    var svg=this.get("svg");
    var tooltip=this.get("tooltip");
    var nodes = this.get("data.nodes");
    var links= this.get("data.links");
    console.log(data);
     force.nodes(nodes)
          .links(links)
          .start();
          var links = svg.selectAll(".link")
            .data(links)
            links.enter().insert('line',":first-child")
            .attr('class', 'link')
            .style("stroke-width",  function(d){return d.comments.length || 2});
            links.exit().remove();
          var nodes = svg.selectAll(".node")
            .data(nodes);
            nodes.enter().append("circle")
            .attr('class', 'node')
            .attr('r', function(d){return Math.sqrt(d.connections)*3+10})
            .style("fill","steelblue")
            .call(force.drag)
            .on("mouseover",tooltipShow)
            .on("mouseout",tooltipHide);
            nodes.exit().remove();
            force.on("tick",function(){
              nodes.attr('cx',  function(d){return d.x})
                  .attr('cy', function(d){return d.y});
              links.attr('x1', function(d){ return d.source.x;})
                  .attr('y1',  function(d){return d.source.y})
                  .attr('x2',  function(d){return d.target.x})
                  .attr('y2',  function(d){return d.target.y});

            });



            function tooltipShow(d){
              tooltip.transition().duration(200)
                .style("opacity",0.9);
              tooltip.html(d.name+"<br> id: " + d.id )
              .style("left",d3.event.layerX+20+"px")
              .style("top",d3.event.layerY+"px");
            }
            function tooltipHide(d){
              tooltip.transition().duration(200)
              .style("opacity",0);
            }
  },
  updateHelper:function(){
    this.update();
  }.observes("data.links.@each.comments","data.nodes.@each"),
});
