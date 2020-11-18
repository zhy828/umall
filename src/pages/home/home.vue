<template>
  <div>
    <div class="box" id="main"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import echarts from "echarts";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          //画图
          var myChart = echarts.init(document.getElementById("main"));

          var option = {
            title: {
              text: "子分类数量",
            },
            tooltip: {},
            legend: {
              data: ["数量"],
            },
            xAxis: {
              data: this.list.map(item=>item.catename),
            },
            yAxis: {},
            series: [
              {
                name: "子分类数量",
                type: "bar",
                data: this.list.map(item=>item.children?item.children.length:0),
              },
            ],
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
      },
    },
  },
  mounted() {
    this.reqList();
  },
};
</script>

<style scoped>
.box {
  width: 80%;
  height: 500px;
  margin: 20px auto;
}
</style>