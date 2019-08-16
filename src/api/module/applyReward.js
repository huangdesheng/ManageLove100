import ax from '../axios';

//申请奖励金列表
export function rewardList(params) {
  return ax.post('/award/award', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 审核节点
export function checkNode(params) {
  return ax.post('/award/examine', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

//审核资料获取
export function checkQuery(params) {
  return ax.post('/award/examineQuery', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 互助人详情
export function mutualDetails(params) {
  return ax.get(`/award/mutual?recipientsId=${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 团体详情
export function groupADetails(params) {
  return ax.get(`/award/groupDetails?recipientsId=${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 个人详情
export function personADetails(params) {
  return ax.get(`/award/personalDetails?recipientsId=${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}

//提交审核
export function checkSubmit(params) {
  return ax.post('/award/toExamine', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 申请奖励金帮扶账单
export function groupAbill(params) {
  return ax.get(`/award/billDetails?recipientsId=${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}
