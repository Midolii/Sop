<template>
  <div class="full">
    <div class="contain">
      <div class="large">
        <div class="largecontain">
          <!-- <div class="temptitle">你好: {{username}}</div> -->
          <div class="tempform">
            <div class="tempcontent">标题:</div>
            <input class="title" type="titleid" placeholder="" v-model="title"/>
            <div class="tempcontent">内容:</div>
            <textarea class="text" v-model="text"/>
          </div>
          <button class="tempbutton" @click="submit">提交审核</button>
        </div>
      </div>
      <div class="small">
        <div class="smallcontain">
          <span><p class="username">登录用户: {{username}}</p></span>
          <div class="tempStitle">提交审核页面!</div>
          <p class="tempScontent">请在右侧表格具体填写你所需要提交的内容</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Apply",
  data(){
    return {
      username: this.$route.params.username,
      title: "",
      text: "",
    }
    
  },
  methods: {
      submit() {
        if(this.title != "" && this.text !=""){
          this
            .$axios({
              method: "post",
              url: "http://127.0.0.1:10492/api/user/submititle",
              data: {
                title: this.title,
                text: this.text,
                username: this.username
              }
            })
            .then((res) => {
              switch(res.data){
                case 0:
                  alert("提交成功, 等待审核通过");
                  break;
                case 1:
                  alert("提交失败, 存在同名审核标题");
                  break;
                case -1:
                  alert("请重新登录后提交");
                  this.$router.replace({ path: "/" });
                  break;
              }
            })
            .catch((err) => {
              console.log(err);
            })
        } else {
          alert("填写不能为空!");
        }
      }
  }
}
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
  width: 70%;
  height: 100%;
  position: absolute;
  top: -10%;
  left: 25%;
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
.tempcontent {
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(57, 167, 176);
  margin-left: -70%;
}
.tempform {
  width: 100%;
  height: 60%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.tempform .title {
  width: 70%;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 2em;
  padding-right: 2em;
  background-color: #f0f0f0;
  font-size: 16px;
}
.text{
  width: 70%;
  height:200px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 1em;
  background-color: #f0f0f0;
  resize: none;
  font-size: 32px;
  font-weight: bold;
  overflow: auto;
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
.username{
  color: #110d0dab;
  font-size: 2em;
  font-weight: bold;
}
</style>
