<template>
  <div class="header-mine">
    <el-row class="header-top">
      <el-col :span="16">
        <div>
          <span class="header-image"></span>
          <span class="header-info">
            <el-row class="info-l">早上好admin，开始工作的一天吧</el-row>
            <el-row class="info-temp">天气晴 20-28℃</el-row>
          </span>
        </div>
      </el-col>
      <el-col :span="8" class="header-r">
        <el-row>
          <el-col :span="8">
            <el-row class="header-r-title">代办</el-row>
            <el-row class="header-r-num">4/8</el-row>
          </el-col>
          <el-col :span="8">
            <el-row class="header-r-title">项目</el-row>
            <el-row class="header-r-num">8</el-row>
          </el-col>
          <el-col :span="8">
            <el-row class="header-r-title">团队</el-row>
            <el-row class="header-r-num">2000</el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="mine-content">
      <div class="content-l">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="card-title">项目</span>
              <el-button class="button" text type="primary">更多</el-button>
            </div>
          </template>

          <div class="card-row" v-for="m in 2" :key="m">
            <div class="card-col" v-for="o in 3" :key="o">
              <div class="main_title">
                <img src width="50px" height="50px" />
                <span class="project_title">Vue</span>
              </div>
              <div class="sub_title" style="color:#aaa">副标题内容区。</div>
              <div class="bottom_title">
                <span style="margin-right:10px">开源组</span>
                <span>2024-01-23</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="content-r">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header">
              <span class="card-title">快捷导航</span>
              <el-button class="button" text type="primary">更多</el-button>
            </div>
          </template>
          <div class="card-row_fast" v-for="ii in 3" :key="ii">
            <div class="card-col" v-for="o in 3" :key="o">
              <div class="main_title">
                <el-icon>
                  <Tools />
                </el-icon>
                <div>插件</div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </el-row>
    <el-row class="dynamic_row">
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>更多动态</span>
          </div>
        </template>
        <div v-for="j in 6" :key="j">
          <div class="dy_content">
            <el-icon>
              <User />
            </el-icon>
            <span class="item">soulpinkman</span>在
            <span>开源组</span>创建了项目
            <span>vue</span>
          </div>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const fill = ref(true);
</script>



<style scoped lang="scss">
.header-mine {
  height: 100%;
  .header-top {
    align-items: center;
    height: 100px;
    border: 1px solid pink;

    .header-image {
      display: inline-block;
      width: 60px;
      height: 60px;
      margin: 16px;
      text-align: center;
      vertical-align: middle;
      border-radius: 50%;
      background-image: url("./../../../public/header-mine.jpg");
      background-position: center center;
      background-size: cover;
    }

    .header-info {
      display: inline-block;
      text-align: center; //text-align文本水平对齐  align-item垂直对齐  justify-content （弹性盒）水平居中
      vertical-align: middle; //vertical-align行内元素（inline）/表格单元格（table-cell）元素垂直对齐
      margin-left: 55px;
      .info-l {
        font-weight: bold;
        font-size: 19px;
      }
      .info-temp {
        color: #aaa;
        margin-top: 8px;
      }
    }
    .header-r {
      .header-r-title {
        color: #aaa;
      }
      .header-r-num {
        font-size: 20px;
        margin-top: 8px;
      }
    }
  }

  .mine-content {
    margin: 15px;
    margin-left: 0px;
    .content-l {
      width: 75%;
      .box-card {
        width: 100%;
        ::v-deep .el-card__header {
          padding: 14px 16px;
        }
        ::v-deep .el-card__body {
          padding: 0;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .card-title {
            font-weight: bold;
          }
        }
        .text {
          font-size: 14px;
          margin-bottom: 18px;
        }

        .card-row {
          display: flex;
          width: 100%;

          height: 140px;
          border: 1px solid #eee;
          border-bottom: 0;

          .card-col {
            padding: 10px;
            width: 33.33%;
            height: 100%;
            border: 1px solid #eee;
            border-top: 0;
            border-bottom: 0;
            .main_title {
              .project_title {
                margin-left: 8px;
                font-weight: bold;
                text-align: center;
                vertical-align: middle;
              }
            }

            .sub_title {
              padding-top: 10px;
            }
            .bottom_title {
              color: #aaa;
              padding-top: 10px;
            }
          }
        }
        .card-row :hover {
          padding: 4px;
          border: 0;
          border-radius: 0;
          box-shadow: #f0f0f0;
          transition: all 0.2s;
        }
      }
    }
    .content-r {
      width: 25%;
      padding-left: 15px;

      .box-card {
        width: 100%;
        ::v-deep .el-card__header {
          padding: 14px 16px;
        }
        ::v-deep .el-card__body {
          padding: 0;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .card-title {
            font-weight: bold;
          }
        }
        .text {
          font-size: 14px;
          margin-bottom: 18px;
        }
        .card-row_fast {
          display: flex;
          width: 100%;

          height: 80px;
          border: 1px solid #eee;
          border-bottom: 0;

          .card-col {
            padding: 10px;
            width: 33.33%;
            height: 100%;
            border: 1px solid #eee;
            border-top: 0;
            border-bottom: 0;
            .main_title {
              margin-left: 8px;
              text-align: center;
              vertical-align: middle;
            }
          }
        }
        .card-row_fast :hover {
          padding: 4px;
          border: 0;
          border-radius: 0;
          box-shadow: #f0f0f0;
          transition: all 0.2s;
        }
      }
    }
  }

  .dynamic_row {
    .box-card {
      width: 100%;
      .card-header {
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .dy_content {
        margin: 8px 0;
        border-bottom: 1px solid #eee;
        height: 40px;
        .item {
          margin: 0 9px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
