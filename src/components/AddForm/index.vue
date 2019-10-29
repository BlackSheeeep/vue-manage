<template>
  <div class="add-form">
    <el-form class="add-group" ref="group" :model="group" :rules="addGroupFormRules" v-if="addType==='group'">
      <el-form-item prop='groupName'>
        <h3>组名:</h3>
        <el-input v-model="group.groupName"></el-input>
      </el-form-item>

      <el-form-item prop="businessCode">
        <h3>业务代码:</h3>
        <el-input v-model="group.businessCode"></el-input>
      </el-form-item>
      <el-form-item prop="isReceiveMail">
        <h3>接收邮件:</h3>
        <el-radio-group v-model="group.isReceiveMail">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item prop="isReceiveSms">
        <h3>接收短信:</h3>
        <el-radio-group v-model="group.isReceiveSms">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <div class="bottom-buttons">
        <el-button class="submit" type="success" @click="submitHandler('group')">确定提交</el-button>
        <el-button class="cancel" type="danger" @click="cancel">取消</el-button>
      </div>
    </el-form>
    <el-form class="add-inhibition" ref="inhibition" :model="inhibition"  v-else-if="addType==='inhibition'">
      <el-form-item prop='inhibition'>
        <h3>抑制信息</h3>
        <el-input v-model="inhibition"></el-input>
      </el-form-item>
      <div class="bottom-buttons">
        <el-button class="submit" type="success" @click="submitHandler('inhibition')">确定提交</el-button>
        <el-button class="cancel" type="danger" @click="cancel">取消</el-button>
      </div>
    </el-form>

    <el-form class="add-member" ref="member" :model="member" :rules="addMemberFormRules" v-if="addType==='member'">
      <el-form-item prop='username'>
        <h3>用户名</h3>
        <el-input v-model="member.username"></el-input>
      </el-form-item>

      <el-form-item prop="phone">
        <h3>手机号</h3>
        <el-input v-model="member.phone"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <h3>电子邮件</h3>
        <el-input v-model="member.email"></el-input>
      </el-form-item>
      <div class="bottom-buttons">
        <el-button class="submit" type="success" @click="submitHandler('member')">确定提交</el-button>
        <el-button class="cancel" type="danger" @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import {addGroup,addInhibition,addMember} from '@/api/groups.js'
const switchs = {
    'group':function(self){
        return addGroup(self.group);
    },
    'inhibition':function(self){
        console.log("asda");
        return addInhibition(self.$route.params.groupId,self.inhibition);
    },
    'member':function(self){
        return addMember(self.$route.params.groupId,self.member);
    }
}
export default {
    props:{
        addType:{
            type:String,
            default:"",
            required:true
        }
    },
  data() {
    return {
      group: {
          groupName:"",
          businessCode:"",
          isReceiveMail:false,
          isReceiveSms:false,
      },
      addGroupFormRules:{
          groupName:[
              {required:true,message:'不能为空',trigger:'blur'},
              {pattern:/[^\s]+/i,message:'名字中不能带有空格符',trigger:'blur'}
              ],
          businessCode:[
              {required:true,message:'不能为空',trigger:'blur'},
              {pattern:/[a-zA-Z1-9]{6,}/i,message:'业务代码至少六位且为英文以及数字',trigger:'blur'}
          ],

      },
      
      inhibition:'',
      
      member:{
          username:"",
          phone:'',
          email:''
      },
      addMemberFormRules:{
          username:[
              {required:true,message:'不能为空',trigger:'blur'},
              {pattern:/[a-zA-Z0-9]{6,}/i,message:'用户名为至少6位的英文字母或数字',trigger:'blur'}
          ],
          phone:[
              {required:true,message:'不能为空',trigger:'blur'},
              {pattern:/^[0-9]{6,}$/i,message:"只能为数字",trigger:'blur'}
          ],
          email:[
              {required:true,message:'不能为空',trigger:'blur'},
              {type:'email',message:"邮箱格式错误",trigger:'blur'}
          ]
      }
    };
  },
  methods:{
      submitHandler(type){
          this.$refs[type].validate(valid=>{
              if(valid){
                  switchs[type](this).then(res=>{
                      this.$emit('close');
                      console.log(res.data);
                  });
              }
          });
      },
      cancel(){
          this.$emit('close');

      }
  }
};
</script>
<style lang="scss">
.add-form{
    position:fixed;
    top:30%;
    left:40%;
    height:600px;
    width:450px;
    background-color:white;
    box-shadow: 0 0 3px 5px rgba(0,0,0,.5);
    z-index:999;
    padding:10px 20px;
}
</style>