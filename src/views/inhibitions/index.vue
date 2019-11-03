<template>
    <div class="inhibitions">
        <div class="add-inhibitions">
            <el-button type="success" @click="addInhibition">添加抑制信息</el-button>
            <AddForm v-if="show" @close="show=false" :addType="'inhibition'" ></AddForm>
        </div>
        <el-table :data="list">
            <el-table-column align="center" label="ID">
                <template slot-scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="抑制内容">
                <template slot-scope="scope">
                    {{scope.row}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button type='danger' @click="deleteOne(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {getInhibitions} from "@/api/groups.js"
import AddForm from '@/components/AddForm'
export default {
    data(){

        return {
            list:[],
            show:false
        }
    },
    mounted(){
        getInhibitions(this.$route.params.id).then(res=>{
            this.list = res.data;
        });
    },
    methods:{
        deleteOne(index){

        },
        addInhibition(){
            this.show=true;
        }
    },
    components:{
        AddForm
    }
}
</script>

<style lang="scss">
.inhibitions{
    min-width:1200px;
    .add-inhibitions{
        text-align:center;
        height:80px;
        padding:20px 0;

    }
}
</style>