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
  threshold:0,
  highlighted:[],
  didInsertElement(){
    var data=this.get("data");
    var svg = d3.select(this.$().get(0)).append('svg');

    var zoom = d3.behavior.zoom()
    .scaleExtent([1, 10])
    .on("zoom",zoomed);

    svg.append("defs").selectAll("marker")
        .data(["suit", "licensing", "resolved"])
      .enter().append("marker")
        .attr("id", function(d) { return d; })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 25)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
      .append("path")
        .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
        .style("stroke", "black")
        .style("opacity", "1");
    svg = svg.attr('viewBox', '0 0 '+this.get("width")+" "+this.get("height"))
    //.attr('width', this.get("outerWidth"))
    .attr('class', 'responsive-svg')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .append("g").call(zoom)
    .on("dblclick.zoom", null);

    //rect for zoom registration
    var rect = svg.append("rect")
    .attr("width", this.get("width"))
    .attr("height", this.get("height"))
    .style("fill", "none")
    .style("pointer-events", "all");
        var container = svg.append('g');

        var gridsize=20;

    container.selectAll(".vertical-axis").data(d3.range(0,this.get("width"),gridsize))
      .enter().append('line')
      .attr('class', "vertical-axis")
      .attr('x1', function(d){return d;})
      .attr('y1', 0)
      .attr('x2', function(d){return d})
      .attr('y2', this.get("height"))
      .style("stroke","black");

      container.selectAll(".horizontal-axis").data(d3.range(0,this.get("height"),gridsize))
        .enter().append('line')
        .attr('class', "horizontal-axis")
        .attr('x1', 0)
        .attr('y1', function(d){return d})
        .attr('x2', this.get("width"))
        .attr('y2', function(d){return d})
        .style("stroke","black");


    var tooltip=d3.select(this.$().get(0)).append('div')
        .attr('class', 'tooltip')
        .style("opacity",0);
    var force = d3.layout.force()
        .charge(this.get("charge"))
        .linkDistance(this.get("linkDistance"))
        .gravity(this.get("gravity")/100)
        .size([this.get("width"),this.get("height")])
        .nodes(this.get("data.nodes"))
        .links(this.get("data.links"))
        .start();






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
    var threshold=this.get("threshold")
    var that=this;

    var filteredLinks=links.filter(function(link){
      return link.comments.length >= threshold;
    });

    //prepare Highlighting
    var linkedByIndex={};
    for (var i = 0; i < nodes.length; i++) {
        linkedByIndex[i + "," + i] = 1;
    };
    filteredLinks.forEach(function (d) {
        linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });

    this.set("linkedByIndex",linkedByIndex);


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
  
     force
          .nodes(nodes)
          .links(filteredLinks)
          .start();
          var drag = force.drag()
    // .origin(function(d) { return d; })
    .on("dragstart", dragstarted);
    // .on("drag", dragged)
    // .on("dragend", dragended);




          var linksUpdate = svg.selectAll(".link")
            .data(filteredLinks)
            .style("marker-end",  "url(."+window.location.pathname+"#suit)")
          //  .style("stroke-width",  function(d){return Math.sqrt(d.comments.length) || 2});

            linksUpdate.enter().insert('line',":first-child")
            .attr('class', 'link')
          //  .style("stroke-width",  function(d){return Math.sqrt(d.comments.length) || 2})
            .style("stroke-width",1)
            .style("marker-end",  "url(."+window.location.pathname+"#suit)")
            .style("opacity",0.7);
            linksUpdate.exit().remove();
          var nodesUpdate = svg.selectAll(".node")
            .data(nodes,function(d){return d.id})
            //.classed("highlighted",function(d){return d.highlighted;})
            .attr('class', function(d){return "node "+d.status;})
            .style('fill',function(d){

              if(that.isHighlighted(d.id)){
                return "red";
              }
              if(d.status==="admin"){
                return "yellow";
              }
              if(d.status==="moderator"){
                return "green";
              }
              return "steelblue";
            });

            nodesUpdate.enter().append("circle")
            .attr('class', function(d){return "node "+d.status;})
            // .attr('r', function(d){return Math.sqrt(d.connections)*3+10})
            .attr('r', 10)
            .style('fill',function(d){

              if(that.isHighlighted(d.id)){
                return "orange";
              }
              if(d.status==="admin"){
                return "yellow";
              }
              if(d.status==="moderator"){
                return "red";
              }
              return "steelblue";
            })
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
                    svg.selectAll(".link").style("opacity", function (o) {
                        return d.index==o.source.index | d.index==o.target.index ? 1 : 0.1;
                    });
                    //Reduce the op
                    that.set("toggle",1);
                } else {
                    //Put them back to opacity=1
                    nodesUpdate.style("opacity", 1);
                    svg.selectAll(".link").style("opacity", 0.7);
                    that.set("toggle",0);
                }
            }
            function dragstarted(d) {
                d3.event.sourceEvent.stopPropagation();
                // d3.select(this).classed("dragging", true);
                // force.stop();
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
  }.observes("data.links.@each.comments","data.nodes.@each","threshold","highlighted"),
   neighboring:function(a, b) {
      return this.get("linkedByIndex")[a.index + "," + b.index];
  },
  updateChargeAndLinkDistance:function(){
    var force=this.get("force");
    force.charge(this.get("charge"))
          .linkDistance(this.get("linkDistance"))
          .gravity(this.get("gravity")/100);
    force.start();
  }.observes("charge","linkDistance","gravity"),

  updateWidthAndHeight:function(){
    var svg=this.get("svg");
    var force=this.get("force");
    svg.attr('viewBox', '0 0 '+this.get("width")+" "+this.get("height"));
    force.size([this.get("width"),this.get("height")])
          .start();
  }.observes("width","height"),

  isHighlighted(id){
    var highlights = this.get("highlighted");
    var temp = false;
    highlights.forEach(function(h){
      if(h.get("id")==id){
        temp=true;
      }
    });
    return temp;
  },
});
