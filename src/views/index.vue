<template>
  <div class="full">
    <div class="contain">
    <!-- 右侧控制 -->
      <div class="large" :class="{ active: isLogin == 1 }">
        <div class="largecontain" v-if="isLogin == 1">
          <div class="temptitle">企业账户登录</div>
          <div class="tempform">
            <input type="email" placeholder="账户" v-model="form1.username" />
            <span class="error" v-if="usernameError">* 账户或密码填写错误 *</span>
            <input type="password" placeholder="密码" v-model="form1.userpwd" />
          </div>
          <button class="tempbutton" @click="loginCompany">登录</button>
        </div>
        <div class="largecontain" v-else-if="isLogin == 0">
          <div class="temptitle">创建账户</div>
          <div class="tempform">
            <input type="text" placeholder="用户名" v-model="form1.username" />
            <span class="error" v-if="existed">* 用户名已经存在！ *</span>
            <input type="password" placeholder="密码" v-model="form1.userpwd" />
          </div>
          <button class="tempbutton" @click="register">注册</button>
        </div>
        <div class="largecontain" v-else-if="isLogin == 2">
          <div class="temptitle">审核人员登录</div>
          <div class="tempform">
            <input type="userid" placeholder="账户" v-model="form2.userid" />
            <span class="error" v-if="errorId">* 账户或密码填写错误 *</span>
            <input type="password" placeholder="密码" v-model="form2.password" />
          </div>
          <button class="tempbutton" @click="loginReview">登录</button>
        </div>
        <div class="largecontain" v-else-if="isLogin == 3">
          <div class="temptitle">管理员登录</div>
          <div class="tempform">
            <input type="userid" placeholder="管理员账户" v-model="form3.userid" />
            <span class="error" v-if="errorId">* 管理员账户或密码填写错误 *</span>
            <input type="password" placeholder="密码" v-model="form3.password" />
          </div>
          <button class="tempbutton" @click="loginAdmin">登录</button>
        </div>
      </div>
      <!-- 左侧控制 -->
      <div class="small" :class="{ active: isLogin == 1}">
        <div class="smallcontain" v-if="isLogin == 1">
          <div class="tempStitle">没有账户?</div>
          <p class="tempScontent">点击下面按钮进行注册</p>
          <button class="tempSbutton" @click="changeTypeto0">注册</button>
          <button class="tempSbutton" @click="changeTypetoreview">审核人员登录</button>
          <button class="tempSbutton" @click="changeTypetoadmin">管理员账户登录</button>
        </div>
        <div class="smallcontain" v-else-if="isLogin == 0">
          <div class="tempStitle">已经注册过的用户</div>
          <p class="tempScontent">请点击此处进行登录</p>
          <button class="tempSbutton" @click="changeTypeto1">企业账户登录</button>
        </div>
        <div class="smallcontain" v-else-if="isLogin == 2">
          <div class="tempStitle">审核人员登陆页面!</div>
          <p class="tempScontent">非审核人员请退出此页面</p>
          <button class="tempSbutton" @click="changeTypeto1">企业账户登录</button>
        </div>
        <div class="smallcontain" v-else-if="isLogin == 3">
          <div class="tempStitle">管理员登陆页面!</div>
          <p class="tempScontent">非管理员请退出此页面</p>
          <button class="tempSbutton" @click="changeTypeto1">企业账户登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApplyVue from './Apply.vue';
export default {
  name: "index",
  data() {
    return {
      errorId: false,
      isLogin: 1,
      usernameError: false,
      existed: false,
      form1: {
        username: "",
        userpwd: "",
      },
      form2: {
          userid: "",
          password: "",
      },
      form3: {
          userid: "",
          password: "",
      }
    };
  },
  methods: {
    changeTypeto0() {//企业登录
      this.isLogin = 0;
      this.form1.username = "";
      this.form1.userpwd = "";
    },
    changeTypeto1() {//企业注册
      this.isLogin = 1;
      this.form1.username = "";
      this.form1.userpwd = "";
    },
    changeTypetoreview() {//审核登录
      this.isLogin = 2;
      this.form2.userid = "";
      this.form2.password = "";
    },
    changeTypetoadmin() {//管理员登录
      this.isLogin = 3;
      this.form3.userid = "";
      this.form3.password = "";
    },
    loginCompany() {//企业员工登录
      this.emailError = false;
      if (this.form1.username != "" && this.form1.userpwd != "") {
        this
          .$axios({
            method: "post",
            url: "http://127.0.0.1:10492/api/user/logincompany",
            data: {
              username: this.form1.username,
              password: this.form1.userpwd,
            },
          })
          .then((res) => {
            switch (res.data) {
              case 0:
                //alert("登陆成功！");
                this.$router.push({ name: 'Apply', params: {username: this.form1.username} });
                this.$router.replace({ path: "/Apply" });
                break;
              case -1:
                this.usernameError = true;
                break;
              case 1:
                this.usernameError = true;
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("填写不能为空！");
      }
    },
    register() {//企业注册
      if (
        this.form1.username != "" &&
        this.form1.userpwd != ""
      ) {
        this
          .$axios({
            method: "post",
            url: "http://127.0.0.1:10492/api/user/add",
            data: {
              username: this.form1.username,
              password: this.form1.userpwd,
            },
          })
          .then((res) => {
            switch (res.data) {
              case 0:
                alert("注册成功！");
                this.login();
                break;
              case -1:
                this.existed = true;
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("填写不能为空！");
      }
    },
    loginReview() {//审核人员登录
      this.errorId = false;
      if (this.form2.userid != "" && this.form2.password != "") {
        this.$axios({
          method: "post",
          url: "http://127.0.0.1:10492/api/user/loginreview",
          data: {
            userid: this.form2.userid,
            password: this.form2.password,
          },
        })
          .then((res) => {
            switch (res.data) {
              case 0:
                //alert("登陆成功！");
                this.$router.push({ name: 'Approval', params: {userid: this.form2.userid} });
                this.$router.replace({ path: "/Approval" });
                break;
              case -1:
                this.errorId = true;
                break;
              case 1:
                this.errorId = true;
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("填写不能为空!");
      }
    },
    loginAdmin() {//管理员登陆
      this.errorId = false;
      if (this.form3.userid != "" && this.form3.password != "") {
        this.$axios({
          method: "post",
          url: "http://127.0.0.1:10492/api/user/loginadmin",
          data: {
            userid: this.form3.userid,
            password: this.form3.password,
          },
        })
          .then((res) => {
            switch (res.data) {
              case 0:
                //alert("登陆成功！");
                this.$router.replace({ path: "/Dashboard" });
                break;
              case -1:
                this.errorId = true;
                break;
              case 1:
                this.errorId = true;
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("填写不能为空!");
      }
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
  width: 60%;
  height: 100%;
  position: absolute;
  top: 0;
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
.tempform {
  width: 100%;
  height: 40%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.tempform .error {
  display: block;
  width: 50%;
  color: red;
  font-size: 0.9em;
}
.tempform input {
  width: 55%;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 2em;
  background-color: #f0f0f0;
}
.tempbutton {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(57, 167, 176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
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
.tempSbutton {
  width: 60%;
  height: 50px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
  margin-bottom: 20px;
}
</style>
