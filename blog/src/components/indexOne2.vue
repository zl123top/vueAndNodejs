<template>
<div class="join">
         <p>会员VVP</p>
     <div class="header"> <img src="@/assets/images/manOne.png" alt=""></div>
     <div class="verify seeOne" v-if="seeOne" name="mobile">请输入您的手机号</div>
     <input type="tel" placeholder="手机号" class="number" v-model="phon" @focus="focusOne" maxlength="11">
     <input type="tel" placeholder="输入验证码" class="auth" v-model="pass" @change="oneSelf(pass)" @focus="focusOne" maxlength="4" @blur="thisBlur(pass)">
     <div class="send" v-show="!active" @click="sendOne();popupVisible2">发送</div>
       <mt-popup v-model="popupVisible2" popup-transition="popup-fade" class="mint-popup-2" :modal="false" v-if="sendTne">
                   <p id="panduan" v-text="msg"></p>
        </mt-popup>
         <!-- <mt-popup v-model="popupVisible2" popup-transition="popup-fade" class="mint-popup-2" :modal="false" v-if="!sendTne">
                   <p id="panduan">请输入正确的验证码</p>
        </mt-popup> -->
          <!-- <mt-popup v-model="popupVisible2" popup-transition="popup-fade" class="mint-popup-2" :modal="false" v-if="!sendTne">
                   <p id="panduan">操作频繁,请稍后再试</p>
        </mt-popup> -->
     <div class="news" v-show="active">
       <span class="agineOne">重发 {{countOne}}s</span>
       <!-- <span class="thity">5</span><span v-show="secndes">s</span> -->
     </div>
     <button class="register" @click="toForm">登 录</button>
      <div class="user">新用户首次登录默认注册</div>
    </div>
</template>
<script>
import validation from "@/assets/js/validation";
// import {Toast} from "mint-ui"
import { DatetimePicker, Popup, Toast, Indicator, Radio } from "mint-ui";
import axios from "axios";
import store from "@/vuex/store";
import { mapState } from "vuex";
axios.defaults.baseURL = "/api";
export default {
  name: "indexOne",
  data() {
    return {
      sendTne: true,
      popupVisible2: false,
      active: false,
      phon: "",
      pass: "",
      seeOne: false,
      countOne: 60,
      timer: null,
      numS: "",
      msg: "",
     wsOne:""
    };
  },
  computed: {
    phoneNum() {
      return this.$store.state.phoneNum;
    },
    // wsWbsocket(){
    //        return this.$store.state.wsWbsocket
    //     }
  },
  watch: {
    popupVisible2(val) {
      if (val) {
        setTimeout(() => {
          this.popupVisible2 = false;
        }, 800);
      }
    }
  },
 
  methods: {
    // 两秒获取
    timeTest(){
      setTimeout(()=>{
          this.reconnect()
      },2000)
    },
    // // 实例化创建一个websocket
    // connectWebsocket(){
    //    var ws = new WebSocket("ws://192.168.2.5:8081");             
    //   //  var wsOne=this.$store.commit("getWebsocket",ws) 
    // },
    // // 断开重新连接
    reconnect(){
         var ws= new WebSocket("ws://192.168.2.5:8081");   
        // console.log(this.connectWebsocket())
        ws.onopen=()=>{
          console.log("你已重新连接")
          this.$store.commit("getWebsocket",ws)
          this.actionLoginWithSessionId();
        }
       ws.onerror=()=>{
           this.timeTest()
        }
        ws.onclose=()=>{

        }
    },
    // },
    // // 断开后使用sessionId进行登陆
    actionLoginWithSessionId(){
          // var ws = new WebSocket("ws://192.168.2.5:8081");   
          // alert("连接成功")
          var ws=this.$store.state.ws;
          var sessionOne=localStorage.getItem("sessionId")
          var userIdOne=localStorage.getItem("uid")
         if(sessionOne==null){
            ws.send('{"action":"LoginWithMobileVerifyCode",'+phonOne+','+passOne+'}');
            ws.onmessage =this.firstLogin
          }else{
            ws.send('{"action":"LoginWithSessionId","uid":'+userIdOne+',"sessionId":'+sessionOne+'}');
            ws.onmessage=(resTwo)=>{
              console.log(resTwo)
            }
          }
          ws.send('{"action":"LoginWithSessionId","uid":"'+userIdOne+'","sessionId":"'+sessionOne+'"}');
          ws.onmessage=(resTwo)=>{
             console.log(resTwo)          // null
           }
        // ws.onclose=()=>{
        //   this.timeTest()
        // }
    },
    focusOne() {
      //  $("p").css("display","none")
      //   $("img").css("margin","0.5"+'rem')
      //    $(".number").css("marginTop","0"+'rem')
      //     $(".send").css("top","3.85"+'rem')
    },
    //发送验证码按钮
    sendOne() {
      var regu1 = /^1\d{10}$/;
      const one = 60;
      if (regu1.test(this.phon)) {
        // this.seeOne=false;
        this.active = true;
        this.verify = false;
        this.countOne = one;
        (this.timer = setInterval(() => {
          if (this.countOne > 1 && this.countOne <= one) {
            this.countOne--;
          } else {
            this.active = false;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000)),
          // console.log(this.phon)
          // 获取验证码
          axios.get("/GetMobileLoginVerifyCode&mobile="+this.phon,{

          }).then(res =>{
              console.log(res)
              this.numS = res.data.s;
              switch (res.data.s) {
                case 0:
                  console.log(res);
                  break;
                case 1026:
                  this.msg = "操作频繁,请稍后再试";
                  this.popupVisible2 = true;
                  break;
                case 1001:
                   this.msg = "网络超时";
                   this.popupVisible2 = true;
                    break;
                case 1022:
                   this.msg = "请输入正确的验证码";
                   this.popupVisible2 = true;
                    break;
              }
              //   if(this.numS==0){
              //          console.log(res)
              // }
            });
      } else {
        this.popupVisible2 = true;
        this.msg = "请输入正确的手机号";
      }
    },
    // reconnect(){
         
    // },
    //  验证码登录
    toForm() {
      if (this.phon&&this.pass) {
        // 手机验证码登录 获取用户信息
              var phonOne='"'+'mobile'+'":'+'"'+this.phon+'"'
              var passOne='"'+'verify'+'":'+'"'+this.pass+'"'
              console.log(phonOne)
              console.log(passOne)
              var ws = new WebSocket("ws://localhost:8001");             
              var wsOne=this.$store.commit("getWebsocket",ws)
              // console.log(this.wsWbsocket)
              ws.onopen = () => {
                // alert(1)
              ws.send('{"action":"LoginWithMobileVerifyCode",'+phonOne+','+passOne+'}');
              };
              ws.onmessage = (res) => {
                
                console.log(res)
                var okOne = JSON.parse(res.data);
                console.log(okOne,"11111");
                // var obj = JSON.parse(res.data);
                // console.log(11111111, obj);
                if (okOne.s == 0) {            
                      this.numSon = okOne.s;
                      var uid = okOne.uid;
                      var sessionId = okOne.sessionId;
                      // 保存用户的uid
                     localStorage.setItem("uid", uid);
                    //  保存用户的seesionId
                      localStorage.setItem("sessionId", okOne.sessionId);
                      // 实例化创建websocket 并保存到本地
                      console.log(localStorage.getItem("uid"))
                      console.log(localStorage.getItem("sessionId"))
                      this.$store.commit("phone", this.phon);
                       this.$router.push({ name: "memberOne" });
                      } else {
                      this.msg = "请输入正确的验证码";
                      this.popupVisible2 = true;
                    }
                //3秒检测，如果断了，重连
                (()=>{
                  setInterval(()=>{
                    var ws=this.$store.state.ws;
                    if(ws.readyState==2||ws.readyState==3){
                      ws=new WebSocket("ws://localhost:8001"); 
                      this.$store.commit("getWebsocket",ws);
                      ws.onopen=()=>{
                        var sessionOne=localStorage.getItem("sessionId")
                        var userIdOne=localStorage.getItem("uid")
                        ws.send('{"action":"LoginWithSessionId","uid":'+userIdOne+',"sessionId":'+sessionOne+'}');
                        ws.onmessage=(resTwo)=>{
                          console.log(resTwo)
                        }
                      }
                    }
                  },3000)
                })()
              }
              ws.onerror=()=>{
               this.timeTest();
              }
        
         } 
         else {
            this.msg="请输入正确手机号"
            this.popupVisible2 = true;
          }
          },
          reconnect(){
            var  rews=new WebSocket("ws://192.168.2.5:8081")
            var wsOne=this.$store.commit("getWebsocket",rews)
               rews.onmessage=()=>{
                  this.actionLoginWithSessionId();
              }
              rews.onclose=()=>{

              }
          },
       disConnect(){
            setTimeout(()=>{
                this.reconnect();
            },5000);
         },
         thisBlur(pass){
            var regu2 = /^\d{4}$/;
              if (regu2.test(pass)) {
                      //手机号验证通过需执行的代码
                    } else {
                      this.popupVisible2 = true;
                      this.sendTne = true;
                      this.msg="请输入有效的验证码"
                    }
         },
        //  当验证码输入框数据发生改变的时候触发 
    oneSelf(pass) {
      //  console.log(pass)
      var regu2 = /^\d{4}$/;
      if (regu2.test(pass)) {
        //手机号验证通过需执行的代码
      } else {
        this.popupVisible2 = true;
        this.sendTne = false;
      }
    }
  }
};
</script>
<style scoped>
#panduan {
  font-size: 0.3rem;
  height: 1rem;
  line-height: 1rem;
  color: white;
  font-size: 0.3rem;
  margin-top: 0;
}
.mint-popup-2 {
  width: 3rem;
  height: 1rem;
  border-radius: 0.15rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.62);
  backface-visibility: hidden;
  color: white;
  position: absolute;
  top: 5.8rem;
}
.crop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000000;
  color: #fff;
  font-size: 0.5rem;
}
p {
  font-size: 0.4rem;
  color: #000000;
  text-align: center;
  font-weight: 530;
  margin-top: 0.36rem;
}
div {
  font-size: 0.25rem;
  color: #b2b2b2;
  display: inline-block;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  text-align: center;
  margin-top: 1.5rem;
}
input {
  width: 7rem;
  height: 0.8rem;
  font-size: 0.25rem;
  border-radius: 20px;
  outline: none;
  margin-left: 0.2rem;
  text-indent: 0.35rem;
  border: none;
  border: 1px solid #d6d6d6;
  margin-top: 0.2rem;
  display: inline-block;
}
.number {
  margin-top: 1rem;
}
.auth {
  margin-top: 0.3rem;
}
.register {
  width: 7rem;
  height: 0.8rem;
  background-image: linear-gradient(to right, #2ea4b0, #06789d);
  font-size: 0.3rem;
  color: white;
  margin-left: 0.2rem;
  border-radius: 20px;
  outline: none;
  border: none;
  margin-top: 0.5rem;
}
.user {
  display: block;
  font-size: 0.3rem;
  color: #b2b2b2;
  text-align: center;
  margin-top: 1rem;
  color: #b2b2b2;
}

.send {
  position: absolute;
  top: 6.25rem;
  left: 6rem;
}
.news {
  position: absolute;
  top: 6.24rem;
  left: 6rem;
}
.verify {
  color: red;
  position: absolute;
  top: 4.2rem;
  left: 2.72rem;
  font-size: 0.25rem;
}
.seeOne {
  left: 2.8rem;
}
</style>
