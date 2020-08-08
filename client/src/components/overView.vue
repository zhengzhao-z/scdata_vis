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
      <el-switch v-model="value" active-text="全部"></el-switch>
      <el-switch
        v-model="value1"
        active-text="车辆交通事故"
        @change="triggerVehicleAccident"
        :active-color="color[0]"
      ></el-switch>
      <el-switch
        v-model="value2"
        active-text="车流量大"
        @change="triggerTraffic"
        :active-color="color[1]"
      ></el-switch>
      <el-switch
        v-model="value3"
        active-text="降雨（积水）"
        @change="triggerRainfall"
        :active-color="color[2]"
      ></el-switch>
      <el-switch
        v-model="value4"
        active-text="降雪（积雪）"
        @change="triggerSnowfall"
        :active-color="color[3]"
      ></el-switch>
      <el-switch
        v-model="value5"
        active-text="雾霾"
        @change="triggerSmog"
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
      color: ["#1D6FA3", "#49C628", "#F8D800", "#C346C2", "#F6416C", "#00EAFF"],
      value: false,
      value1: false,
      value2: false,
      value3: false,
      value4: false,
      value5: false,
      legendName: ["00-60", "61-80", "81-100", "101-120", "120+"]
    };
  },
  mounted() {
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
  },
  methods: {
    change(e, event) {
      if (e) {
        this.$store.dispatch("changeCalendarData", event);
      } else {
        this.$store.dispatch("changeCalendarData", {
          eventName: "all",
          color: ["#ABDCFF", "#0396FF"]
        });
      }
    },
    triggerVehicleAccident(e) {
      this.change(e, {
        eventName: "vehicleAccident",
        color: ["#ABDCFF", "#0396FF"]
      });
    },
    triggerTraffic(e) {
      this.change(e, {
        eventName: "traffic",
        color: ["#ABDCFF", "#0396FF"]
      });
    },
    triggerRainfall(e) {
      this.change(e, {
        eventName: "rainfall",
        color: ["#ABDCFF", "#0396FF"]
      });
    },
    triggerSnowfall(e) {
      this.change(e, {
        eventName: "snowfall",
        color: ["#ABDCFF", "#0396FF"]
      });
    },
    triggerSmog(e) {
      this.change(e, {
        eventName: "smog",
        color: ["#ABDCFF", "#0396FF"]
      });
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
