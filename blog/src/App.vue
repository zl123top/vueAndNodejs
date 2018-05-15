<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-header"
          mode="horizontal"
          @select="handleSelect"
          onselectstart="return false"
          >
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4">订单管理</el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width='250px'>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            style="height:100%;"
            onselectstart="return false"
            >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
import conIndexOne from './components/indexOne2.vue'
import store from "@/vuex/store";
export default {
  name: 'App',
  components:{
    conIndexOne
  },
  store,
  data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
  computed:{
  },
  methods:{
    handleSelect(key, keyPath) {
      
    },
    handleOpen(key, keyPath) {
      
    },
    handleClose(key, keyPath) {
      
    },
    web(){//WebSocket测试代码
      //window.ws = new WebSocket("ws://127.0.0.1:8001");
      // ws.onopen = function () {  
      //   //setInterval(function(){
      //     ws.send('发送数据1')
      //   //},1000)
      //     console.log("ws open");  
      // }   
      // ws.addEventListener('message',(res)=>{
      //   console.log(res);  
      // })  
      // ws.onclose = (e)=>{
        
      // } 
      // ws.onerror = (e)=>{
      //   console.log(e)
      // }   
    window.ws = new WebSocket("ws://127.0.0.1:8001");
      sendFn('发送并返回这条信息',(res)=>{console.log(res.data)})
      function sendFn(msg,calback){//传入发送的信息和回调函数
        if(ws.readyState==1){//是连接的时候
          ws.send(msg)
        }else{//其他的时候，重连
          ws = new WebSocket("ws://127.0.0.1:8001");
          console.log('发起了重连')
          ws.onopen=()=>{
            ws.send(msg)
          }
        }
        ws.onmessage=(res)=>{calback(res);}
        ws.onerror =()=>{
          setTimeout(()=>{//等5秒后再重连，防止内存爆
            sendFn(msg,calback);
          },5000);
        } 
      }
      
    }
  },
  created:function(){
    
    
    
   //this.web();
   //console.log(axios)
  }
}
</script>

<style scoped>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
body{margin:0}
.el-menu-header{position:fixed;top:0;left:0;z-index:9999;width:100%;}
.el-aside{position:fixed;left:0;top:60px;bottom:0;}
.el-main{margin-left:250px;}
</style>
