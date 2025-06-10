<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top:20px">
      <el-card style="max-width: 500px" shadow="hover">
        <div class="user">
          <img :src="getImageUrl('user')" alt="图片加载错误！" class="user" />
          <div class="user-info">
            <p class="user-info-admin">Admin</p>
            <p class="user-info-p">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2025-6-4</span></p>
          <p>上次登录地点：<span>北京</span></p>
        </div>
      </el-card>
      <el-card style="max-width: 500px" shadow="hover" class="user-table">
        <el-table :data="tableData">
          <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val" />
        </el-table>
      </el-card>
      <el-card style="max-width: 500px;height: 110px;margin-top: 20px;" shadow="hover">
        <img :src="getImageUrl('role1')" alt="图片加载错误！" class="bottom" />
        <img :src="getImageUrl('role2')" alt="图片加载错误！" class="bottom" />
        <img :src="getImageUrl('role3')" alt="图片加载错误！" class="bottom" />
        <img :src="getImageUrl('role4')" alt="图片加载错误！" class="bottom" />
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top:20px">
      <div class="num">
        <el-card :body-style="{ display: 'flex', padding: 0 }" v-for="item in countData" :key="item.name"
          shadow="hover">
          <component :is="item.icon" class="icons" :style="{ background: item.color }"></component>
          <div class="detail">
            <p class="num">{{ item.value }}次</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card class="top-echart" shadow="hover">
        <div ref="echart" style="height: 280px;"></div>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <div ref="userEchart" style="height: 240px;"></div>
        </el-card>
        <el-card shadow="hover">
          <div ref="videoEchart" style="height: 240px;"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from 'vue'
import * as echarts from 'echarts';


const { proxy } = getCurrentInstance()
const getImageUrl = (user) => {
  return new URL(`../assets/images/${user}.png`, import.meta.url).href
}

const tableData = ref([])
const countData = ref([])
// const chartData = ref([])
const observer = ref(null)

const tableLabel = ref({
  name: "品牌",
  todayBuy: "今日购买",
  monthBuy: "本月购买",
  totalBuy: "总购买",
})

//这个是折线图和柱状图两个图表共用的公共配置
const x0ptions = reactive({
  textStyle: {
    color: "#333",
  },
  legend: {},
  grid: {
    left: "20%",
  },
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
});
const pieOptions = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {},
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a3",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: []
});

//拿到数据
const getTableData = async () => {
  const data = await proxy.$api.getTableData()
  tableData.value = data.tableData
}
const getCountData = async () => {
  const data = await proxy.$api.getCountData()
  countData.value = data.countData
}
const getChartData = async () => {
  const {orderData,userData,videoData} = await proxy.$api.getChartData();
  //对第一个图标进行x轴和series赋值
  x0ptions.xAxis.data = orderData.date
  x0ptions.series = Object.keys(orderData.data[0]).map(val => ({
    name: val,
    data: orderData.data.map(item => item[val]),
    type: 'line'
  })
  )
  const oneEchart = echarts.init(proxy.$refs['echart'])
  oneEchart.setOption(x0ptions)

  //对第二个表格进行渲染
  x0ptions.xAxis.data =userData.map(item => item.date)
  x0ptions.series = [
    {
      name:'新增用户',
      data:userData.map(item =>item.new),
      type:'bar'
    },
    {
      name:'活跃用户',
      data:userData.map(item => item.active),
      type:'bar'
    },
  ]
  const twoEchart = echarts.init(proxy.$refs['userEchart'])
  twoEchart.setOption(x0ptions)

  //对饼状图进行渲染
  pieOptions.series = [
    {
      data:videoData,
      type:'pie'
    }
  ]
  const threeEchart = echarts.init(proxy.$refs['videoEchart'])
  threeEchart.setOption(pieOptions)
}

onMounted(() => {
  getTableData();
  getCountData();
  getChartData();
})
</script>

<style scoped lang="less">
.home {
  height: 100%;
  overflow: auto;

  .user {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }

    .user-info {
      p {
        line-height: 40px;
      }

      .user-info-p {
        color: #999;
      }

      .user-info-admin {
        font-size: 35px;
      }
    }
  }

  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;

      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }

  .user-table {
    margin-top: 20px;
  }

  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .el-card {
      width: 32%;
      margin-bottom: 20px;
      transition: box-shadow 0.3s, border-color 0.3s;
      /* 默认阴影 */
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      border: 1px solid #f0f0f0;
    }
    .el-card:hover {
      box-shadow: 0 4px 20px 0 rgba(64,158,255,0.25);
      border-color: #a0cfff;
    }

    .icons {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }

    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .num {
        font-size: 25px;
        margin-bottom: 10px;
      }

      .txt {
        font-size: 15px;
        text-align: center;
        color: #999;
      }
    }
  }
  .graph{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card{
      width: 48%;
      height:260px;
      transition: box-shadow 0.3s, border-color 0.3s;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      border: 1px solid #f0f0f0;
    }
    .el-card:hover {
      box-shadow: 0 4px 20px 0 rgba(64,158,255,0.25);
      border-color: #a0cfff;
    }
  }
  .bottom{
    width: 75px;
    height: 75px;
    border-radius: 50%;
    margin-left: 10px;
  }
}
</style>
