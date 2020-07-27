<!--
 * @Description: 交通流量、车速、车距
 * @version: 0.1
 * @Author: zhengzhao
 * @LastEditor: zhengzhao
--> 
<template>
  <div id="traffic">

  </div>
</template>

<script>
export default {
    name:"traffic",
    data(){
        return {

        }
    },
    mounted(){
        this.$axios.post("http://localhost:3000/traffic",{
            "id":"51000020160416172821205SpZ3O8tEy",
            "date":"2019-06-01 00:00:00"
        }).then(res=>{
            console.log(res)
        })
    }
}
</script>

<style>

</style>
