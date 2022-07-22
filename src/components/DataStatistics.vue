
<template>
  <div class="EchartPractice">
    <el-row>
      <el-col :span="8">
        <el-card class="box-card">
          <div id="main"></div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card">
          <div id="main1"></div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card">
          <div id="main2"></div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card">
          <div id="main3"></div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card">
          <div id="main4"></div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card class="box-card">
          <div id="main5"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import statisticsApi from "@/api/statistics";

export default {
  name: "my-echart",

  data() {
    return {
      list: [],
    };
  },

  methods: {
    drawChart() {
      statisticsApi
        .ageDistribution()
        .then((response) => {
          this.list = response.MSG_BODY;
          console.log(this.list);

          let pie = this.$echarts.init(document.getElementById("main"));
          pie.setOption({
            title: {
              show: true,
              text: "年龄分布",
              left: "center",
            },

            tooltip: {
              trigger: "item",
            },

            legend: {
              orient: "vertical",
              left: "left",
            },

            series: [
              {
                name: "年龄分布",
                type: "pie",
                radius: "50%",
                data: this.list,
              },
            ],
          });
        })
        .catch((error) => {});
    },
    drawChart1() {
      let myEchart = this.$echarts.init(document.getElementById("main1"));
      let option = {
        title: {
          text: "XX分布",
          left: "center",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [
              120,
              {
                value: 200,
                itemStyle: {
                  color: "#a90000",
                },
              },
              180,
              150,
              {
                value: 150,
                itemStyle: {
                  color: "#a99989",
                },
              },
              80,
              70,
              110,
              130,
            ],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
      myEchart.setOption(option, true);
    },
    drawChart2() {
      let myEchart = this.$echarts.init(document.getElementById("main2"));
      let option = {
        title: {
          text: "XX分布",
          left: "center",
        },

        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },

        series: [
          {
            name: "问卷分布",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "20~30" },
              { value: 735, name: "30~40" },
              { value: 580, name: "40~50" },
              { value: 484, name: "50~60" },
              { value: 300, name: "60~70" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myEchart.setOption(option, true);
    },
    drawChart3() {
      let myEchart = this.$echarts.init(document.getElementById("main3"));
      let option = {
        title: {
          text: "XX分布",
          left: "center",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {},
          },
        ],
      };
      myEchart.setOption(option, true);
    },
    drawChart4() {
      let myEchart = this.$echarts.init(document.getElementById("main5"));
      let option = {
         title: {
          text: "XX分布",
          left: "center",
        },
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [30, 100],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: "rose 1" },
              { value: 38, name: "rose 2" },
              { value: 32, name: "rose 3" },
              { value: 30, name: "rose 4" },
              { value: 28, name: "rose 5" },
              { value: 26, name: "rose 6" },
              { value: 22, name: "rose 7" },
              { value: 18, name: "rose 8" },
            ],
          },
        ],
      };

      myEchart.setOption(option, true);
    },
    drawChart5() {
      let myEchart = this.$echarts.init(document.getElementById("main4"));
      let option = {
         title: {
          text: "XX分布",
          left: "center",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
          },
        ],
      };
      myEchart.setOption(option, true);
    },
  },
  mounted() {
    this.drawChart();
    this.drawChart1();
    this.drawChart2();
    this.drawChart3();
    this.drawChart4();
    this.drawChart5();
  },
};
</script>

<style scoped>
#main {
  width: 380px;
  height: 260px;
  margin: auto;
  margin-top: 0px;
}
#main1 {
  width: 330px;
  height: 260px;
  margin: auto;
  margin-top: 0px;
  margin-left: 2px;
}
#main2 {
  width: 330px;
  height: 260px;
  margin: auto;
  margin-top: 0px;
  margin-left: 2px;
}
#main3 {
  width: 330px;
  height: 260px;
  margin: auto;
  margin-top: 0px;
  margin-left: 2px;
}
#main4 {
  width: 330px;
  height: 260px;
  margin: auto;
  margin-top: 0px;
  margin-left: 2px;
}
#main5 {
  width: 330px;
  height: 260px;
  margin: auto;
  margin-top: 0px;
  margin-left: 2px;
}
.box-card {
  width: 100%;
}
</style>

