<template>
    <div class="members">
        <div class="add-member">
            <el-button type="success">添加新组员</el-button>
        </div>
        <el-table :data="list">
            <el-table-column label="ID">
                <template slot-scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column label="用户名" >
                <template slot-scope="scope">
                    {{scope.row.username}}
                </template>
            </el-table-column>
            <el-table-column label="手机号">
                <template slot-scope="scope">
                    {{scope.row.phone}}
                </template>
            </el-table-column>
            <el-table-column label='邮箱'>
                <template slot-scope="scope">
                    {{scope.row.email}}
                </template>
            </el-table-column>
            <el-table-column label='操作'>
                <template slot-scope="scope">
                    <el-button type="danger"
                    @click="deleteMember($route.query.groupId,scope.row.id,scope.$index)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
import {getMembers,deleteMember} from "@/api/groups.js"
export default {
    data(){
        return {
            list:[]
        }
    },
    mounted(){
        console.log(this.$route.query);
        getMembers(this.$route.query.groupId).then(res=>{
            this.list = res.data;
        });
    },
    methods:{
        deleteMember(groupId,userId,index){
            deleteMember(groupId,userId).then(res=>{
                this.list.splice(index,1);
                console.log(res.data);
            });
        }
    }
}
</script>

<style lang="scss">
.members{
    min-width:1200px;
    .add-member{
        height:80px;
        padding:20px 0;
        text-align: center;
    }
}
</style>