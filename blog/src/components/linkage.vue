<template>
  <div>
      <!-- 下拉框联动 -->
    <el-select v-model="value1" filterable placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="value2" filterable placeholder="请选择">
      <el-option
        v-for="item in option2"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="value3" filterable placeholder="请选择">
      <el-option 
        v-for="item in option3"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
        options: [{
            value: '1',
            label: '山西省',
            children:[{
            value: '1-1',
            label: '运城市',
            children:[{
                value: '1',
                label: '3-1'
            }, {
                value: '2',
                label: '3-2'
            }]
            }, {
            value: '1-2',
            label: '吕梁市',
            children:[{
                value: '1',
                label: '3-1'
            }, {
                value: '2',
                label: '3-2'
            }]
            }]
        }, {
            value: '2',
            label: '上海市',
            children:[{
            value: '2-1',
            label: '黄浦区',
            children:[{
                value: '1',
                label: '3-1'
            }, {
                value: '2',
                label: '3-2'
            }]
            }, {
            value: '2-2',
            label: '金山区',
            children:[{
                value: '1',
                label: '3-1'
            }, {
                value: '2',
                label: '3-2'
            }]
            }]
        }, {
            value: '3',
            label: '北京市',
            children:[{
            value: '3-1',
            label: '朝阳区'
            }, {
            value: '3-2',
            label: '五环啊五环'
            }]
        }],
        value1: '',
        value2: '',
        value3: '',
        activeIndex: '1',
        activeIndex2: '1'
        }
    },
    computed:{
    option2(){
      this.value2='';
      let aa = this.options.filter((val,i)=>{
        return val.value===this.value1;
      });
      if(aa.length!=0){
        return aa[0].children?aa[0].children:[]; 
      }else{
        return [];
      }
    },
    option3(){
      this.value3='';
      let aa = this.option2.filter((val,i)=>{
        return val.value===this.value2;
      });
      if(aa.length!=0){
        return aa[0].children?aa[0].children:[]; 
      }else{
        return [];
      }
    }
  }
}
</script>

<style scoped>

</style>
