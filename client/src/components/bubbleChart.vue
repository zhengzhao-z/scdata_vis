<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->
<template>
  <div class="bubbleChart"></div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      road: ["G5", "G42", "G76", "G85", "G93", "G0512", "G4215"],
      legendName: [
        "speed0_60",
        "speed61_80",
        "speed81_100",
        "speed101_120",
        "speed121",
      ],
    };
  },
  mounted() {
    this.getData(this.initChart);
  },
  methods: {
    getData(callback) {
      this.$axios.get("../static/speedPercent.json").then((res) => {
        this.data = res.data.data;
        callback();
      });
    },
    initChart() {
      // Add Container
      var width = 200; //画布的宽度
      var height = 7 * 142; //画布的高度

      const svg = d3
        .select(".bubbleChart") //选择文档中的body元素
        .append("svg") //添加一个svg元素
        .attr("width", "100%") //设定宽度
        .attr("height", height); //设定高度

      const format = d3.format(",d");

      const color = d3.scaleOrdinal(d3.schemeCategory10);
      let pack = d3.pack().size([width, 130]).padding(1.5);
      let index = 0;
      for (let item in this.data) {
        let classes = this.data[item];
        classes["columns"] = ["id", "value"];
        let g = svg
          .append("g")
          .attr("transform", "translate(-20," + index * 142 + ")");
        var root = d3
          .hierarchy({ children: classes })
          .sum(function (d) {
            return d.value;
          })
          .each(function (d) {
            if ((id = d.data.id)) {
              var id,
                i = id.lastIndexOf(".");
              d.id = id;
              d.package = id.slice(0, i);
              d.class = id.slice(i + 1);
            }
          });
        var node = g
          .selectAll(".node")
          .data(pack(root).leaves())
          .enter()
          .append("g")
          .attr("class", "node")
          .attr("transform", function (d) {
            return "translate(" + (d.x + 10) + "," + (d.y + 20) + ")";
          });

        node
          .append("circle")
          .attr("id", function (d) {
            return d.id;
          })
          .attr("r", function (d) {
            return d.r * 0.8;
          })
          .style("fill", function (d) {
            return color(d.id);
          });
        index++;
      }
    },
  },
};
</script>

<style scoped>
.bubbleChart {
  width: 100%;
  height: 994px;
}
</style>
