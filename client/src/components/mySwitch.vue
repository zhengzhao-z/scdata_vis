<template>
  <div id="mySwitch" class="bg">
    <el-switch v-model="all" active-text="全部" @change="trigger1"></el-switch>
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
</template>

<script>
export default {
  name: "mySwitch",
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
          eventNameCN: "车辆交通事故",
          color: ["#97ABFF", "#123597"],
          flag: false
        },
        traffic: {
          eventName: "traffic",
          eventNameCN: "车流量大",
          color: ["#70F570", "#49C628"],
          flag: false
        },
        rainfall: {
          eventName: "rainfall",
          eventNameCN: "降雨（积水）",
          color: ["#FDEB71", "#F8D800"],
          flag: false
        },

        snowfall: {
          eventName: "snowfall",
          eventNameCN: "降雪（积雪）",
          color: ["#E2B0FF", "#9F44D3"],
          flag: false
        },
        smog: {
          eventName: "smog",
          eventNameCN: "雾霾",
          color: ["#FFF6B7", "#F6416C"],
          flag: false
        },
        all: {
          eventName: "all",
          eventNameCN: "全部",
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
  methods: {
    change(event) {
      this.$store.commit("changeCalendarData", event);
      this.$store.commit("changeEventArea", event);
      this.$store.commit("changeEventLieBie", event);

    },
    trigger1() {
      this.vehicleAccident = this.eventObj.vehicleAccident.flag = false;
      this.traffic = this.eventObj.traffic.flag = false;
      this.rainfall = this.eventObj.rainfall.flag = false;
      this.snowfall = this.eventObj.snowfall.flag = false;
      this.smog = this.eventObj.smog.flag = false;
      this.all = this.eventObj.all.flag = true;
    },
    trigger() {
      // return
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
    }
  }
};
</script>

<style scoped>
  #mySwitch{
    width: 500px;
  }
  .el-switch{
    width: 150px;
    margin-left: 10px;
  }
</style>
