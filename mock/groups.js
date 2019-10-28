import Mock from 'mockjs'
const data = Mock.mock({
    'groups|20':[{
        id:'@id',
        'groupName|2-6':'asd',
        'businessCode|2-6':'rbg',
        'isReceiveMail|1':true,
        'isReceiveSms|1':false
    }]

});
export default [
    {
        url:'/groups',
        type:'get',
        response(config){
            const items = data.groups;
          return {
            code:400920,
            data:[
                ...items
            ]
          }
        }
    },
    {
        url:'/groups',
        type:'put',
        response(config){
            return {
                code:400932,
                data:'update success'
            }
        }
    },
    {
        url:'/groups',
        type:'delete',
        response(config){
            return {
                code:400931,
                data:'delete success'
            }
        }
    },
    {
        url:'/groups/inhibitions',
        type:'get',
        response(){
            return {
                code:400920,
                data:""
            }
        }
    }
]