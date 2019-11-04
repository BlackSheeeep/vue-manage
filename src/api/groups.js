import request from "@/utils/request"
export function getGroups(){
    return request({
      url:'/groups',
      method:'get',
    });
  }

export function updateGroup(data){
    return request({
        url:`/groups/?id=${data.id}`,
        method:'put',
        data
    });
}
export function deleteGroup(id){
    return request({
        url:`/groups/${id}`,
        method:'delete'
    });
}
export function addGroup(data){
    return request({
        url:'/groups',
        method:'post',
        data
    });
}
export function getInhibitions(groupId){
    return request({
        url:`/groups/inhibitions/${groupId}`,
        method:'get'
    });
}
export function addInhibition(groupId,data){
    console.log(data);
    return request({
        url:`/groups/inhibitions/${groupId}`,
        method:'post',
        data
    });
}
export function deleteInhibition(groupId,inhibitionId){
    return request({
        url:`/groups/${groupId}/${inhibitionId}`,
        method:'delete'
    });
}
export function getHistory(businessCode){
    return request({
        url:`/history/${businessCode}`,
        method:'get'
    });
}

export function getMembers(groupId){
    return request({
        url:`/members/${groupId}`,
        method:'get'
    })
}

export function deleteMember(groupId,userId){
    return request({
        url:`/members/${groupId}/${userId}`,
        method:'delete'
    });
}

export function addMember(groupId,data){
    return request({
        url:`/members/${groupId}`,
        method:'post',
        data
    });
}

