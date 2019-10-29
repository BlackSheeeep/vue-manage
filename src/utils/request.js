import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// const stateCodes = {
//   400920:'请求成功',
//   400930:'添加业务组成功',
//   400931:'删除业务成功',
//   400932:'修改业务成功',
//   400933:'移除业务组成员成功',
//   400934:'添加业务组成员成功',
//   400950:'添加业务失败',
//   400951:'删除业务失败',
//   400952:'修改业务失败',
//   400953:'移除业务组成员失败',
//   400954:'添加业务组成员失败',
//   400940:'错误请求'


// }

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code >= 400940) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      });

      switch(res.code){
        case 400950:Message();
      }
      
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
