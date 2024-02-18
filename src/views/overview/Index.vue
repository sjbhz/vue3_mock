<template>
  <div class="chart_list">
    <el-row>
      <el-col :span="6" v-for="(item,index) in cardList" :key="index">
        <el-card class="card-fw">
          <div class="card-one">
            <span style=" font-weight:bold">{{item.title}}</span>
            <span class="green-tag">月</span>
          </div>
          <div class="card-mid">
            <div class="card-cont">
              <span>$2000</span>
              <span>
                <img src="./../../../public/vite.svg" />
              </span>
            </div>
            <div class="card-last">
              <span>总访问数</span>
              <span>$120,000</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="height:400px;margin-top:10px">
      <el-col>
        <el-card style="padding:60px">
          <lineChart />
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-card>
          <el-row style="padding:30px 0 0 30px">访问来源</el-row>
          <pieChart style="padding:10px" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import lineChart from "@/views/overview/component/lineChart.vue";
import pieChart from "@/views/overview/component/pieChart.vue";
import { ref } from "vue";
import { cardList as CardList } from "./constant";

// interface CardList {
//   title: string;
//   titleTag: string;
//   count: number;
//   subtitle: string;
//   subcount: number;
// }
const cardList = ref(CardList);
</script>
<style scoped lang="scss">
.chart_list {
  ::v-deep .el-card__body {
    padding: 0;
  }
  .card-fw {
    height: 170px;
    width: 96%;
    background: #fdfdfd;
    margin: 15px 0;
    float: left;
    .card-one {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      font-size: 15px;
      .green-tag {
        color: #389e0d;
        background: #f6ffed;
        border-color: #b7eb8f;
      }
    }
    .card-mid {
      margin: 20px;
      .card-cont {
        display: flex;
        justify-content: space-between;
        padding: 8px;
        height: 70px;
        font-size: 20px;
      }
      .card-last {
        padding-left: 8px;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
      }
    }
  }
}
</style>
