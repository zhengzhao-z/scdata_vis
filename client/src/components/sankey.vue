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
        "车辆交通事故": "#1D6FA3",
        "车流量大": "#49C628",
        "降雨（积水）": "#FCCF31",
        "降雪（积雪）": "#C346C2",
        "雾霾": "#F6416C",
      },
    };
  },
  mounted() {
    let sankey = d3
      .sankey()
      .nodeId((d) => d.name)
      .nodeWidth(12)
      .nodePadding(20)
      .size([400, 280]);
    this.sankey = sankey;
    this.sankeySvg = d3
      .select(this.$refs.sankey)
      .append("svg")
      .attr("width", 500)
      .attr("height", 300);
    this.$axios
      .post("http://localhost:3000/detail", {
        road: "G5",
      })
      .then((res) => {
        this.process(res.data);
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
      console.log(node,edge)
      this.drawSankey({ nodes: node, links: edge });
    },
    drawSankey(data) {
      let sankey = this.sankey;
      let svg = this.sankeySvg;
      let { nodes, links } = sankey(data);
      let g = svg.append("g").attr("transform", "translate(50,30)");
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
        .attr("x", (d) => (d.x0 + d.x1) / 2)
        .attr("y", (d) => d.y0 - 5)
        .attr("text-anchor", "middle")
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
      console.log(opacity);
    },
  },
};
</script>

<style scoped>
#sankey {
  width: 500px;
  height: 300px;
  position: absolute;
  bottom: 0px;
  left: 1300px;
}
</style>