<template>
  <div id="sankey" ref="sankey" class="bg"></div>
</template>

<script>
export default {
  data() {
    return {
      order: [
        "车辆交通事故",
        "车流量大",
        "降雨（积水）",
        "降雪（积雪）",
        "雾霾",
      ],
      color: {
        "车辆交通事故": d3.schemeCategory10[0],
        "车流量大": d3.schemeCategory10[1],
        "降雨（积水）": d3.schemeCategory10[2],
        "降雪（积雪）": d3.schemeCategory10[3],
        "雾霾": d3.schemeCategory10[4],
      },
    };
  },
  mounted() {
    let sankey = d3
      .sankey()
      .nodeId((d) => d.name)
      .nodeWidth(12)
      .nodePadding(20)
      .size([450, 250]);
    this.sankey = sankey;
    this.sankeySvg = d3
      .select(this.$refs.sankey)
      .append("svg")
      .attr("width", 600)
      .attr("height", 270);
    let g = this.sankeySvg.append("g");
    g.append("text")
      .attr("x",15)
      .attr("y",18)
      .attr("font-size",16)
      .attr("fill","#409EFF")
      .attr("font-weight",600)
      .text("事件类型/处理措施");
    this.$axios
      .post("http://localhost:3000/detail", {
        road: "G5",
      })
      .then((res) => {
        this.drawSankey(res.data);
      });
  },
  methods: {
    //数据处理 todo 由后台完成
    process(data) {
      let edges = {};
      for (let i = 0; i < data.length; i++) {
        let reason = data[i].BLOCK_REASON,
          measure = data[i].MEASURES_NAME;
        if (this.order.includes(reason)) {
          let key = reason + "-" + measure;
          if (edges[key]) {
            edges[key] += 1;
          } else {
            edges[key] = 1;
          }
        }
      }
      let edge = [],
          nodes = [];
      for (let item in edges) {
        let nod = item.split("-");
        nodes.push(nod[0]);
        nodes.push(nod[1]);
        edge.push({ source: nod[0], target: nod[1], value: edges[item] });
      }
      let node = Array.from(new Set(nodes)).map((d) => {
        return { name: d };
      });
      this.drawSankey({ nodes: node, links: edge });
    },
    drawSankey(data) {
      let sankey = this.sankey;
      let svg = this.sankeySvg;
      let { nodes, links } = sankey(data);
      svg.select("#sankey").remove();
      let g = svg.append("g").attr("id","sankey").attr("transform", "translate(20,25)");
      const node = g.append("g").selectAll("rect").data(nodes);
      node
        .join("rect")
        .attr("x", (d) => d.x0)
        .attr("y", (d) => d.y0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("fill", (d) => {
          if (this.color[d.name]) {
            return this.color[d.name];
          } else {
            return "#409EFF";
          }
        })
        .style("stroke", "black")
        .on("mouseover", (d) => {
          let thisName = d.name;
          svg.selectAll("rect").style("opacity", (d) => {
            return this.highlightNodes(d, thisName);
          });
          svg.selectAll(".sankey-link").style("opacity", function (l) {
            return l.source.name == thisName || l.target.name == thisName
              ? 1
              : 0.3;
          });
          svg.selectAll("text").style("opacity", (d) => {
            return this.highlightNodes(d, thisName);
          });
        })
        .on("mouseout", (d) => {
          svg.selectAll("rect").style("opacity", 1);
          svg.selectAll(".sankey-link").style("opacity", 0.7);
          svg.selectAll("text").style("opacity", 1);
        });
      node
        .join("text")
        .attr("x", (d) => d.x1+10)
        .attr("y", (d) => (d.y0+d.y1)/2+7)
        // .attr("text-anchor", "middle")
        .text((d) => d.name)
        .attr("font-size", "14px");
      const link = g
        .append("g")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.5)
        .selectAll("g")
        .data(links)
        .join("g")
        .style("mix-blend-mode", "multiply");
      link
        .append("path")
        .style("opacity", "0.7")
        .attr("class", "sankey-link")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke", (d) => this.color[d.source.name])
        .attr("stroke-width", (d) => Math.max(1, d.width));
    },
    highlightNodes(node, name) {
      let opacity = 0.3;
      if(!node){
        return 1
      }
      if (node.name == name) {
        opacity = 1;
      }
      node.sourceLinks.forEach(function (link) {
        if (link.target.name == name) {
          opacity = 1;
        }
      });
      node.targetLinks.forEach(function (link) {
        if (link.source.name == name) {
          opacity = 1;
        }
      });
      return opacity;
    },
  },
  computed:{
    road() {
      return this.$store.state.roadName;
    },
  },
  watch:{
    road(n,o){
      if(n!="all"){
        this.$axios.post("http://localhost:3000/detail",{
          road:n
        }).then(res=>{
          this.drawSankey(res.data);
        })
      }
    }
  }
};
</script>

<style scoped>
#sankey {
  width: 620px;
  height: 280px;
  position: absolute;
  bottom: 0px;
  left: 1300px;
}
</style>