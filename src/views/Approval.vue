<template>
  <div class="full">
    <div class="contain">
      <div class="large">
        <el-container>
          <el-header style="text-align: right; font-size: 12px">
            <span class="hi">HI: {{ userid }}</span>
          </el-header>

          <el-main>
            <el-table :data="data">
              <el-table-column prop="username" label="申请人" width="120">
              </el-table-column>
              <el-table-column prop="title" label="申请标题" width="120">
              </el-table-column>
              <el-table-column prop="text" label="申请内容"> </el-table-column>
              <el-table-column fixed="right" label="操作" width="130">
                <template slot-scope="scope">
                  <el-button @click="allow(scope.row)" type="text" size="small"
                    >通过</el-button
                  >
                  <el-button
                    @click="refuse(scope.row)"
                    type="text"
                    size="small"
                  >
                    驳回</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </div>
      <div class="small">
        <div class="smallcontain">
          <span
            ><p class="userid">审核人员为: {{ userid }}</p></span
          >
          <div class="tempStitle">审核页面!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Approval",
  data() {
    return {
      userid: this.$route.params.userid,
      data: [],
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:10492/api/user/getapply",
        data: {},
      })
        .then((res) => {
          console.log(res.data);
          this.data = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    allow(row) {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:10492/api/user/allow",
        data: {
          title: row.title,
          username: row.username,
          text: row.text,
          reviewer: this.userid,
        },
      })
        .then((res) => {
          switch (res.data) {
            case 0:
              alert("该审核通过.");
              this.getdata();
              break;
            case -1:
              alert("审核已经存在, 不需要重复通过.");
              this.getdata();
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
        this.getdata();
    },

    refuse(row) {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:10492/api/user/refuse",
        data: {
          title: row.title,
          username: row.username,
          text: row.text,
        },
      })
        .then((res) => {
          switch (res.data) {
            case 0:
              alert("该审核已驳回.");
              this.getdata();
              break;
            case -1:
              alert("操作失败.");
              this.getdata();
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
        this.getdata();
    },
  },
};
</script>

<style scoped="scoped">
.full {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.contain {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}
.large {
  width: 63%;
  height: 100%;
  position: absolute;
  top: 0%;
  left: 35%;
}
.largecontain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.temptitle {
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(57, 167, 176);
}
.tempbutton {
  width: 10%;
  height: 40px;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: rgb(57, 167, 176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
  margin-right: 16px;
}
.small {
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg, rgb(51, 133, 141), rgb(16, 28, 63));
  position: absolute;
  top: 0;
  left: 0;
}
.smallcontain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tempStitle {
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}
.tempScontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}
.userid {
  color: #110d0dab;
  font-size: 2em;
  font-weight: bold;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.hi {
  font-size: 16px;
  font-weight: bold;
}
</style>
