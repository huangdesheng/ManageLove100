import ax from '../axios';

//bannerList列表
export function messageList(params) {
  return ax.post('/message/message', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

//展示或者取消banner
export function release(params) {
  return ax.post('/message/release', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 新增banner
export function addMessage(params) {
  return ax.post('/message/messageAdd', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 查详情
export function messageDetails(params) {
  return ax.get(`/message/messageQuery?messageId=${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 删除banner
export function deleteMessage(params) {
  return ax.post(`/message/messageDel`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 修改banner
export function updateMessage(params) {
  return ax.post(`/message/messageUpdate`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
