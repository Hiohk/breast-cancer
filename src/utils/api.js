import axios from 'axios'
import { Message } from 'element-ui';
import M from 'minimatch';

//响应式拦截器
axios.interceptors.response.use(success=>{
  if(success.status &&success.status == 200) {
    if(success.data.code == 500 || success.data.code == 401 ||success.data.code == 403) {
      Message.error({message:success.data.message});
      return;
    }
    if(success.data.message) {
      Message.success({message:success.data.message});
    }
    return success.data;
  }
},error=>{
  if(error.response.code == 504 || error.response.code == 404) {

  }
})
