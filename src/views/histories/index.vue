<template>
    <div class="histories">
        <el-table :data="list">
            <el-column label="ID">
                <template slot-scope="scope">
                    {{scope.$index}}
                </template>
            </el-column>
            <el-column label="TO">
                <template slot-scope="scope">
                    {{scope.row.to}}
                </template>
            </el-column>
            <el-column label="MODE">
                <template slot-scope="scope">
                    {{scope.row.mode}}
                </template>
            </el-column>
            <el-column label="组名">
                <template slot-scope="scope">
                    {{scope.row.groupName}}
                </template>
            </el-column>
            <el-column label="业务代码">
                <template slot-scope="scope">
                    {{scope.row.businessCode}}
                </template>
            </el-column>
            <el-column label="内容">
                <template slot-scope="scope">
                    {{scope.row.content}}
                </template>
            </el-column>
            <el-column label="状态">
                <template slot-scope="scope">
                    {{scope.row.status}}
                </template>
            </el-column><el-column label="发送时间">
                <template slot-scope="scope">
                    {{scope.row.sendTime}}
                </template>
            </el-column>
        </el-table>
    </div>
</template>

<script>
import {getHistories} from '@/api/groups'
export default {
    data(){
        return {
            list:[]
        }
    },
    mounted(){
        getHistories(this.$route.params.groupId).then(res=>{
            console.log(res.data);
        });
    }
}
</script>

<style lang="scss">

</style>