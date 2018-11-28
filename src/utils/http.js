import axios from 'axios'
import { Message,MessageBox } from 'element-ui';
let instance = axios.create({
    baseURL: process.env.DOMAIN,
})
instance.defaults.transformRequest = [function (data) {
    return JSON.stringify(data)
}]
instance.defaults.validateStatus = function (status) {
    return true
}
instance.interceptors.request.use(config => {
    config.headers.Accept = 'application/json'
    config.headers['Content-Type'] = 'application/json'
    return config
}, err => {
    return Promise.reject(err)
})
// 添加响应拦截器
instance.interceptors.response.use(response => {
    if (response.status === 200) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(response)
    }
})

let requestMethod = ['get', 'post', 'delete', 'put', 'patch', 'update']
let requester = {}
requestMethod.forEach((method) => {
    requester[method] = function (url = '', data = {}, config = {}) {
        return new Promise((resolve, reject) => {
            instance[method](url, data, config).then((response) => {

                if (response.data != null && response.data.errorCode != null && response.data.errorCode != 0 && response.data.showCode == 0) {
                    Message.error(response.data.errorMessageString);
                    return  false
                } else if (response.data != null && response.data.errorCode != null && response.data.errorCode != 0 && response.data.showCode != 0) {
                    MessageBox.alert(response.data.errorMessageString, '提示', {confirmButtonText: '确定'  });
                    return  false
                }else {
                    resolve(response.data)
                }

            }).catch((response) => {
                Message.error('服务器错误'  );
                reject(response)
            })
        })
    }
})

export default requester
