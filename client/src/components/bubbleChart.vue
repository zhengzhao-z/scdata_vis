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
        "speed121"
      ]
    };
  },
  mounted() {
    this.getData(this.initChart);
  },
  methods: {
    getData(callback) {
      this.$axios.get("../static/speedPercent.json").then(res => {
        this.data = res.data.data;
        callback();
      });
    },
    initChart() {
      // Add Container
      var width = 200; //画布的宽度
      var height = 1850; //画布的高度

      const svg = d3
        .select(".bubbleChart") //选择文档中的body元素
        .append("svg") //添加一个svg元素
        .attr("width", "100%") //设定宽度
        .attr("height", height); //设定高度

      const format = d3.format(",d");

      const color = d3.scaleOrdinal(d3.schemeCategory10);
      let pack = d3
        .pack()
        .size([width, 150])
        .padding(1.5);
      let index = 0;
      for (let item in this.data) {
        let classes = this.data[item];
        classes["columns"] = ["id", "value"];
        let g = svg
          .append("g")
          .attr("transform", "translate(0," + (index * 140+20) + ")");
        var root = d3
          .hierarchy({ children: classes })
          .sum(function(d) {
            return d.value;
          })
          .each(function(d) {
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
          .attr("transform", function(d) {
            return "translate(" + (d.x + 10) + "," + (d.y + 20) + ")";
          });

        node
          .append("circle")
          .attr("id", function(d) {
            return d.id;
          })
          .attr("r", function(d) {
            return d.r * 0.8;
          })
          .style("fill", function(d) {
            return color(d.id);
          });
        index++;
      }

      var g = svg.append("g").attr("transform", function(d) {
        return "translate(" + 3 + "," + 10 + ")";
      });
      g.selectAll("rect")
        .data(this.legendName)
        .enter()
        .append("rect")
        .attr("width", 55)
        .attr("height", 20)
        .attr("ry", 10)
        .attr("x", (d, i) => {
          return i * 60;
        })
        .attr("y", (d, i) => {
          return 0;
        })
        .attr("fill", d => {
          return color(d);
        });

      g.selectAll("text")
        .data(this.legendName)
        .enter()
        .append("text")
        .attr("y", (d, i) => {
          return 15;
        })
        .attr("x", (d, i) => {
          return i * 60;
        })
        .attr("dx", (d, i) => {
          switch (d) {
            case "speed0_60":
              return 5;
              break;
            case "speed61_80":
              return 8;
              break;
            case "speed81_100":
              return 5;
              break;
            case "speed101_120":
              return 2;
              break;
            default:
              return 10;
              break;
          }
        })
        .style("text-algin", "center")
        .attr("font-size", "14px")
        .text(function(d) {
          console.log(d);
          switch (d) {
            case "speed0_60":
              return "00-60";
              break;
            case "speed61_80":
              return "61-80";
              break;
            case "speed81_100":
              return "81-100";
              break;
            case "speed101_120":
              return "101-120";
              break;
            default:
              return "120+";
              break;
          }
        });
    }
  }
};
</script>

<style scoped>
.bubbleChart {
  width: 100%;
  height: 1850px;
}
</style>
