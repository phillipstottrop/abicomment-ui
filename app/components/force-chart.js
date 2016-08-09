import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({
  data:[],
  width:2000,
  height:2000,
  svg:null,
  tooltip:null,
  force:null,
  toggle:0,
  linkedByIndex:{},
  charge:-120,
  linkDistance:100,
  didInsertElement(){
    var data=this.get("data");
    var svg = d3.select(this.$().get(0)).append('svg');

    var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom",zoomed);


    svg = svg.attr('viewBox', '0 0 '+this.get("width")+" "+this.get("height"))
    //.attr('width', this.get("outerWidth"))
    .attr('class', 'responsive-svg')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .append("g").call(zoom)
    .on("dblclick.zoom", null);
    var rect = svg.append("rect")
    .attr("width", this.get("width"))
    .attr("height", this.get("height"))
    .style("fill", "none")
    .style("pointer-events", "all");

    var container = svg.append('g');
    var tooltip=d3.select(this.$().get(0)).append('div')
        .attr('class', 'tooltip')
        .style("opacity",0);
    var force = d3.layout.force()
        .charge(this.get("charge"))
        .linkDistance(this.get("linkDistance"))
        .size([this.get("width"),this.get("height")]);


      console.log(data);



    this.set("svg",container);
    this.set("tooltip",tooltip);
    this.set("force",force);
    this.update();
    function zoomed() {
  container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }
  },
  update(){
    var data=this.get("data");
    var force = this.get("force");
    var svg=this.get("svg");
    var tooltip=this.get("tooltip");
    var nodes = this.get("data.nodes");
    var links= this.get("data.links");
    var that=this;

    //prepare Node drag for pinning
    // var node_drag = d3.behavior.drag()
    //         .on("dragstart", dragstart)
    //         .on("drag", dragmove)
    //         .on("dragend", dragend);
    //     function dragstart(d, i) {
    //         force.stop() // stops the force auto positioning before you start dragging
    //     }
    //     function dragmove(d, i) {
    //         d.px += d3.event.dx;
    //         d.py += d3.event.dy;
    //         d.x += d3.event.dx;
    //         d.y += d3.event.dy;
    //     }
    //     function dragend(d, i) {
    //         d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
    //         force.resume();
    //     }
    //     function releasenode(d) {
    //         d.fixed = false; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
    //         force.resume();
    //     }

    this.set("toggle",0);
    console.log(data);
     force.nodes(nodes)
          .links(links)
          .start();
          var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);

    var linkedByIndex={};


          var linksUpdate = svg.selectAll(".link")
            .data(links)
             .style("stroke-width",  function(d){return Math.sqrt(d.comments.length) || 1});
            //.style("stroke-width",  1);

            linksUpdate.enter().insert('line',":first-child")
            .attr('class', 'link')
            .style("stroke-width",  function(d){return d.comments.length || 2});
            linksUpdate.exit().remove();
          var nodesUpdate = svg.selectAll(".node")
            .data(nodes)
            .attr('class', function(d){return "node "+d.status;});
            nodesUpdate.enter().append("circle")
            .attr('class', function(d){return "node "+d.status;})
            .attr('r', function(d){return Math.sqrt(d.connections)*3+10})
            // .style("fill","steelblue")
            .call(drag)
            .on("mouseover",tooltipShow)
            .on("mouseout",tooltipHide)
            .on('dblclick',highlightNeighborNodes)
            // .on('dblclick',function(d){that.sendAction("dblclick",d)});
            nodesUpdate.exit().remove();
            force.on("tick",function(){

              linksUpdate.attr('x1', function(d){ return d.source.x;})
                  .attr('y1',  function(d){return d.source.y})
                  .attr('x2',  function(d){return d.target.x})
                  .attr('y2',  function(d){return d.target.y});
                  nodesUpdate.attr('cx',  function(d){return d.x})
                      .attr('cy', function(d){return d.y});
            });

            //prepare Highlighting
            for (var i = 0; i < nodes.length; i++) {
                linkedByIndex[i + "," + i] = 1;
            };
            links.forEach(function (d) {
                linkedByIndex[d.source.index + "," + d.target.index] = 1;
            });

            this.set("linkedByIndex",linkedByIndex);

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
            function highlightNeighborNodes(d) {
                that.sendAction("dblclick",d);
                if (that.get("toggle") == 0) {
                    //Reduce the opacity of all but the neighbouring nodes
                  var  d = d3.select(this).node().__data__;
                    nodesUpdate.style("opacity", function (o) {
                        return that.neighboring(d, o) | that.neighboring(o, d) ? 1 : 0.1;
                    });
                    linksUpdate.style("opacity", function (o) {
                        return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
                    });
                    //Reduce the op
                    that.set("toggle",1);
                } else {
                    //Put them back to opacity=1
                    nodesUpdate.style("opacity", 1);
                    linksUpdate.style("opacity", 1);
                    that.set("toggle",0);
                }
            }
            function dragstarted(d) {
                d3.event.sourceEvent.stopPropagation();
                d3.select(this).classed("dragging", true);
                force.stop();
              }

              function dragged(d) {
                d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
                //force.resume();
                d.px += d3.event.dx;
                d.py += d3.event.dy;
                d.x += d3.event.dx;
                d.y += d3.event.dy;
              }

              function dragended(d) {
                d3.select(this).classed("dragging", false);
                force.resume();
              }
  },
  updateHelper:function(){
    this.update();
  }.observes("data.links.@each.comments","data.nodes.@each"),
   neighboring:function(a, b) {
      return this.get("linkedByIndex")[a.index + "," + b.index];
  },
  updateChargeAndLinkDistance:function(){
    var force=this.get("force");
    force.charge(this.get("charge"))
          .linkDistance(this.get("linkDistance"));
    force.start();
  }.observes("charge","linkDistance"),
  updateWidthAndHeight:function(){
    var svg=this.get("svg");
    var force=this.get("force");
    svg.attr('viewBox', '0 0 '+this.get("width")+" "+this.get("height"));
    force.size([this.get("width"),this.get("height")])
          .start();
  }.observes("width","height"),
});
