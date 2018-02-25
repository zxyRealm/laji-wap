// import env from '@/config/env'
function params(options) {
    let paramString = ''
    for (var i in options) {
        paramString += i + '=' + options[i] + '&'
    }
    return paramString.slice(0, -1);
}
export function Post_formData(_this, option, url, cb) {
    let formData = new FormData()
    for (let item in option) {
        formData.append(item, option[item])
    }
    formData.append('token', _this.$store.state.token)
    _this.$http.post(url, formData).then(response => {
        cb(response.data)
    }, response => {
        cb({status: 404})
    })
}
export function Post_formData2(_this, option, url, cb) {
    _this.$http.post(url, params(option)).then(response => {
        cb(response.data)
    }, response => {
        cb({status: 404})
    })
}
export function noParam_Get(_this, url, cb) {
    _this.$http.get(url).then(response => {
        cb(response.data)
    }, response => {
        cb({status: 404})
    })
}

export function Param_Get(_this, options, url, cb) {
    _this.$http.get(encodeURI(url) + '?' + params(options)).then(response => {
        cb(response.data)
    }, response => {
        cb({status: 404})
    })
}
