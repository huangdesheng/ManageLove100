import ax from '../axios';


//公益列表
export function welfareList(params) {
  return ax.post('/welfare/welfarekey', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 添加公益项目
export function addWelfare(params) {
  return ax.post('/welfare/addWelfare', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 修改公益项目
export function editWelfare(params) {
  return ax.post('/welfare/update', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 发布公益项目
export function releaseWelfare(params) {
  return ax.post('/welfare/release', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 删除公益项目
export function deleteWelfare(params) {
  return ax.post('/welfare/delete', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 删除公益项目
export function endWelfare(params) {
  return ax.post('/welfare/end', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}



export function welfareDetails(params) {
  return ax.get(`/welfare/details?projectId=${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 多图上传
export function moreUploadTwo(params, config) {
  return ax.post('/fdfs/uploadFiles', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}

export function singleUpload(params, config) {
  return ax.post('/fdfs/upload', params, config)
    .then(res => res.data)
    .catch(e => console.log(e));
}



// 删除图片
export function deletePic(params) {
  return ax.post('/fdfs', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
