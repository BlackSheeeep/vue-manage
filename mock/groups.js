import Mock from 'mockjs'
const data = Mock.mock({
    'groups|20':[{
        id:'@id',
        'groupName|2-6':'asd',
        'businessCode|2-6':'rbg',
        'receiveMail|1':true,
        'receiveSms|1':false,
        'members|20-35':[{
            id:'@id',
            'username|1-10':"wqs",
            'phone':'123412412',
            'email':'123@qq.com'
        }],
        'inhibitions|10-30':[
            "asfdasdf"
        ],
        'history|5-20':[{
            id:"@id",
            to:"mr.bigglesworth",
            mode:"email",
            content:"hello ms.li",
            groupName:"test",
            businessCode:"test",
            status:"success",
            sendTime:Date.now()

        }]
    }],
   
    
});
export default [
    {
        url:'/groups/inhibitions/?',
        type:'get',
        response(req){
            const strs = req.url.split("/");
            const groupId = strs.pop();
            for(let i in data.groups){
                if(data.groups[i].id===groupId){
                    console.log(data.groups[i].inhibitions);
                    return data.groups[i].inhibitions;
                }
            }
        }
    },
    {
        url:'/history/?',
        type:'get',
        response(req){
            const strs = req.url.split("/");
            const groupId = strs.pop();
            for(let a of data.groups){
                if(a.id.toString() === groupId){
                    return a.history
                    
                }
            }
        }
    },
    {
        url:'/groups/inhibitions/?',
        type:'post',
        response(req){
            return 'add inhibition success'
        }
    },
    {
        url:'/groups',
        type:'post',
        response(req){
            return 'add group success'
            
        }
    },
    {
        url:'/groups',
        type:'get',
        response(req){
            const items = data.groups;
          return [
                ...items
            ]
          
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
        response(req){
            let id = req.query.id;
            for(let index in data.groups){
                if(data.groups[index].id===id){
                    data.groups.splice(index,1);
                    break;
                }
            }
            return {
                code:400931,
                data:'delete success'
            }
        }
    },
  
    {
        url:'/members/?',
        type:'get',
        response(req){
            let strs = req.url.split("/");
            let id = strs.pop();
            // id = parseInt(id);
                for(let a of data.groups){
                if(a.id.toString()===id.toString()){
                    return a.members
                    
                }
            }
            return {
                code:400940,
                msg:'未找到'
            }
        }
    },
    {
        url:'/members/?/?',
        type:'delete',
        response(req){
            let strs = req.url.split('/');
            let userId = strs.pop();
            let groupId = strs.pop();

            for(let i1 in data.groups){
                if(data.groups[i1].id.toString()===groupId.toString()){
                    for(let i2 in data.groups[i1].members){
                        if(data.groups[i1].members[i2].id === userId.toString()){
                            data.groups[i1].members.splice(i2,1);
                            return {
                                code:400920,
                                data:"delete success"
                            }
                        }
                    }
                }
            }

            return {
                code:400953,
                data:'delete failed'
            }
        }
    },
    {
        url:'/members/?',
        type:'post',
        response(req){
            return {
                code:400934,
                data:'add member success'
            }
        }
    }
    
]