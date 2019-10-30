<template>
  <div class="app-container">
    <div style="height:60px;text-align:center">
      <el-button type="primary" @click="addGroup">添加分组</el-button>
      <AddForm v-if="show" @close='show =false' :addType="add"></AddForm>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="组名" align="center">
        <template slot-scope="scope">{{ scope.row.groupName }}</template>
      </el-table-column>
      <el-table-column label="业务代码" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.businessCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接收邮件" align="center">
        <template slot-scope="scope">
          <i :class="scope.row.isReceiveMail?'el-icon-check':'el-icon-close'" />
        </template>
      </el-table-column>
      <el-table-column label="接收短信" align="center">
        <template slot-scope="scope">
          <i :class="scope.row.isReceiveSms?'el-icon-check':'el-icon-close'" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新">
        <template slot-scope="scope">
          <el-button type="success" @click="update(scope.row)">更新</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="组员详情">
        <template slot-scope="scope">
        <router-link :to="'/members?groupId='+scope.row.id">...</router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="抑制规则">
        <template slot-scope="scope">
          <el-button type="info" @click="goTo('/inhibitions',scope.row.id)">抑制详情</el-button>
        </template>
      </el-table-column>
      <el-table-column align = "center" label="历史记录">
        <template slot-scope="scope">
          <el-button type="info" @click="goTo('/history',scope.row.id)">查看历史记录</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="删除">
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteCurrRow(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="update" v-if="showUpdate">
      <h3>ID:</h3>
      {{currGroup.id}}
      <h3>组名:</h3>
      <el-input v-model="currGroup.groupName"></el-input>
      <h3>业务代码:</h3>
      {{currGroup.businessCode}}
      <h3>接收邮件:</h3>
      <el-radio-group v-model="currGroup.isReceiveMail">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
      <h3>接收短信:</h3>
      <el-radio-group v-model="currGroup.isReceiveSms">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
      <div class="bottom-buttons">
        <el-button class='submit' type="success" @click="updateSubmit">确定提交</el-button>
        <el-button class="cancel" type="danger" @click="updateCancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import { getGroups, updateGroup,deleteGroup } from "@/api/groups";
import AddForm from '@/components/AddForm'
export default {
  data() {
    return {
      add:'',
      list: [],
      show:false,
      listLoading: false,
      showUpdate: false,
      currGroup:null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // this.listLoading = true
      getGroups().then(response => {
        this.listLoading = false;
        this.list = response.data;
      });
    },
    update(group) {
      this.currGroup = group;
      this.showUpdate = true;
    },
    updateSubmit(){
      updateGroup(this.currGroup).then(res=>{
        this.currGroup = null;
        console.log(res.data);
      });
      this.showUpdate = false;
    },
    updateCancel(){
      this.currGroup = null;
      this.showUpdate = false;
    },
    deleteCurrRow(index,group){
      deleteGroup(group.id).then(res=>{
        this.$delete(this.list,index);
        console.log(res.data);
      });
    },
    goTo(url,...arr){
      if(arr.length>0){
        arr.forEach(a=>{
          url+='/'+a;
        });
      }
      this.$router.push(url);
    },
    addGroup(){
      this.add="group";
      this.show = true;
    }
  },
  components:{
    AddForm
  }
};
</script>

<style lang="scss">
.app-container {
  min-width: 1200px;
  .update {
    position: fixed;
    z-index: 999;
    background-color: white;
    box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.3);
    width: 450px;
    height: 600px;
    padding: 30px;
    top: 20%;
    left: 40%;
    .bottom-buttons{
      height:130px;
      padding:70px 0 0 0;
      display:flex;
      align-items: center;
      justify-content: space-between;

      .submit{
        float:left;
      }
      
      .cancel{
        float:right;

      }
    }
  }
}
</style>