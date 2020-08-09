<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
-->

<template>
  <div id="overview" class="bg">
    <div id="control">
      <div style="height:40px;font-size:20px;font-weight:200">
        道路阻断事件面积图/速度比例图
      </div>

      <el-switch v-model="all" active-text="全部" @change="trigger"></el-switch>
      <el-switch
        v-model="vehicleAccident"
        active-text="车辆交通事故"
        @change="trigger"
        :active-color="color[0]"
      ></el-switch>
      <el-switch
        v-model="traffic"
        active-text="车流量大"
        @change="trigger"
        :active-color="color[1]"
      ></el-switch>
      <el-switch
        v-model="rainfall"
        active-text="降雨（积水）"
        @change="trigger"
        :active-color="color[2]"
      ></el-switch>
      <el-switch
        v-model="snowfall"
        active-text="降雪（积雪）"
        @change="trigger"
        :active-color="color[3]"
      ></el-switch>
      <el-switch
        v-model="smog"
        active-text="雾霾"
        @change="trigger"
        :active-color="color[4]"
      ></el-switch>
    </div>
    <div id="scrollbar">
      <div id="roadAccident">
        <eventArea></eventArea>
      </div>
      <div id="roadSpeed">
        <bubbleChart></bubbleChart>
      </div>
    </div>
    <div id="legend" ref="legend"></div>
  </div>
</template>

<script>
import eventArea from "./eventArea";
import bubbleChart from "./bubbleChart";
export default {
  components: {
    eventArea,
    bubbleChart
  },
  data() {
    return {
      color: ["#123597", "#49C628", "#F8D800", "#9F44D3", "#F6416C", "#00EAFF"],
      all: true,
      eventArr: [],
      vehicleAccident: false,
      traffic: false,
      rainfall: false,
      snowfall: false,
      smog: false,
      legendName: ["00-60", "61-80", "81-100", "101-120", "120+"],
      eventObj: {
        vehicleAccident: {
          eventName: "vehicleAccident",
          color: ["#97ABFF", "#123597"],
          flag: false
        },

        traffic: {
          eventName: "traffic",
          color: ["#70F570", "#49C628"],
          flag: false
        },
        rainfall: {
          eventName: "rainfall",
          color: ["#FDEB71", "#F8D800"],
          flag: false
        },

        snowfall: {
          eventName: "snowfall",
          color: ["#E2B0FF", "#9F44D3"],
          flag: false
        },
        smog: {
          eventName: "smog",
          color: ["#FFF6B7", "#F6416C"],
          flag: false
        },
        all: {
          eventName: "all",
          color: ["#ABDCFF", "#0396FF"],
          flag: false
        }
      }
    };
  },
  watch: {
    eventObj: {
      handler(newobj, oldArr) {
        this.change(newobj);
      },
      deep: true
    }
  },
  mounted() {
    this.legenChartInit();
  },
  methods: {
    change(event) {
      this.$store.dispatch("changeCalendarData", event);
    },
    trigger() {
      this.eventObj.all.flag = this.all;
      this.eventObj.vehicleAccident.flag = this.vehicleAccident;
      this.eventObj.traffic.flag = this.traffic;
      this.eventObj.rainfall.flag = this.rainfall;
      this.eventObj.snowfall.flag = this.snowfall;
      this.eventObj.smog.flag = this.smog;
      if (
        this.vehicleAccident === false &&
        this.traffic === false &&
        this.rainfall === false &&
        this.snowfall === false &&
        this.smog === false
      ) {
        this.eventObj.all.flag = true;
        this.all = true;
      }
      if (
        this.vehicleAccident ||
        this.traffic ||
        this.rainfall ||
        this.snowfall ||
        this.smog
      ) {
        this.eventObj.all.flag = false;
        this.all = false;
      }
    },
    legenChartInit() {
      //legend
      let svg = d3
        .select(this.$refs.legend)
        .append("svg")
        .attr("height", 200)
        .attr("width", 80);
      svg
        .append("g")
        .selectAll("rect")
        .data(this.legendName)
        .enter()
        .append("rect")
        .attr("width", 55)
        .attr("height", 20)
        .attr("ry", 10)
        .attr("x", 0)
        .attr("y", (d, i) => {
          return i * 30;
        })
        .attr("fill", (d, i) => {
          return this.color[i];
        });
      svg
        .append("g")
        .selectAll("text")
        .data(this.legendName)
        .enter()
        .append("text")
        .attr("x", 0)
        .attr("dx", (d, i) => {
          if (i == 0 || i == 1) {
            return 10;
          } else if (i == 2) {
            return 5;
          } else if (i == 3) {
            return 1;
          } else if (i == 4) {
            return 10;
          }
        })
        .attr("y", (d, i) => {
          return i * 30 + 15;
        })
        .attr("font-size", "13px")
        .text(d => d)
        .attr("fill", "white");
    }
  }
};
</script>

<style scoped>
#overview {
  height: 100%;
  width: 100%;
  position: absolute;
  transition: all 500ms;
}
#control {
  height: 100px;
  width: 100%;
}
.el-switch {
  /* display: block; */
  margin-top: 5px;
  width: 150px;
}
#roadAccident {
  flex: 1;
}
#roadSpeed {
  flex: 1;
}
#scrollbar {
  height: calc(100% - 100px);
  overflow: scroll;
  overflow-x: hidden;
  position: absolute;
  display: flex;
}
#scrollbar::-webkit-scrollbar {
  width: 3px;
  height: 1px;
}
#scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #c5c5c5;
}
#scrollbar::-webkit-scrollbar-track {
  border-radius: 10px;
}
#legend {
  position: absolute;
  width: 80px;
  height: 200px;
  right: 0;
  top: 60px;
}
</style>
