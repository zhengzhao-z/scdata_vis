<!--
 * @Description: 
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
--> 
<template>
  <div>
      <input
      type="checkbox"
      id="公路施工养护"
      value="公路施工养护"
      v-model="selectedLiebie"
    />
    <label for="公路施工养护">公路施工养护</label>
    <input
      type="checkbox"
      id="车辆交通事故"
      value="车辆交通事故"
      v-model="selectedLiebie"
    />
    <label for="车辆交通事故">车辆交通事故</label>
    <input type="checkbox" id="其他" value="其他" v-model="selectedLiebie" />
    <label for="其他">其他</label>
    <br />
    <span>Checked names: {{ selectedLiebie }}</span>
    <div><button @click="sendMessage">提交</button></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLiebie: []
    };
  },
  methods: {
    sendMessage() {
      this.$store.commit("changeEventLieBie", this.selectedLiebie);
    }
  },
}
</script>

<style>

</style>
