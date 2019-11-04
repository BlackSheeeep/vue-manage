<template>
    <div class="members">
        <div class="add-member">
            <el-button type="success" @click="show=true">添加新组员</el-button>
            <AddForm v-if="show" @update-data="updateData" @close="show=false" :addType='"member"'></AddForm>
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
import AddForm from '@/components/AddForm'
export default {
    data(){
        return {
            show:false,
            list:[]
        }
    },
    mounted(){
        getMembers(this.$route.query.groupId).then(res=>{
            this.list = res.data;
        });
    },
    methods:{
        deleteMember(groupId,userId,index){
            deleteMember(groupId,userId).then(res=>{
                this.list.splice(index,1);
            });
        },
        updateData(){
            getMembers(this.$route.query.groupId).thne(res=>{
                this.list = res.data;
            })
        }
    },
    components:{
        AddForm
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