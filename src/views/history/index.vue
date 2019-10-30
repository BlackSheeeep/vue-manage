<template>
    <div class="histories">
        <el-table :data="list">
            <el-table-column label="ID">
                <template slot-scope="scope">
                    {{scope.$index}}
                </template>
            </el-table-column>
            <el-table-column label="TO">
                <template slot-scope="scope">
                    {{scope.row.to}}
                </template>
            </el-table-column>
            <el-table-column label="MODE">
                <template slot-scope="scope">
                    {{scope.row.mode}}
                </template>
            </el-table-column>
            <el-table-column label="组名">
                <template slot-scope="scope">
                    {{scope.row.groupName}}
                </template>
            </el-table-column>
            <el-table-column label="业务代码">
                <template slot-scope="scope">
                    {{scope.row.businessCode}}
                </template>
            </el-table-column>
            <el-table-column label="内容">
                <template slot-scope="scope">
                    {{scope.row.content}}
                </template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    {{scope.row.status}}
                </template>
            </el-table-column><el-table-column label="发送时间">
                <template slot-scope="scope">
                    {{new Date(scope.row.sendTime)}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {getHistory} from '@/api/groups'
export default {
    data(){
        return {
            list:[]
        }
    },
    mounted(){
        getHistory(this.$route.params.id).then(res=>{
            this.list = res.data;
            console.log(res.data);
        },
        err=>{
            console.log(err);
        });
    }
}
</script>

<style lang="scss">

</style>