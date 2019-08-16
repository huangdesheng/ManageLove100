import ax from '../axios';

//团体帮扶列表
export function groups(params) {
  return ax.post('/help/groups', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 团体帮扶详情
export function groupsDetails(params) {
  params.recipientsId = params.recipientsId || 0
  return ax.get(`/help/group/${params.projectId}/${params.recipientsId}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 提交审核
export function auditSubmit(params) {
  return ax.post('/help/audit', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 个人帮扶列表
export function personsList(params) {
  return ax.post('/help/persons', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 个人帮扶详情
export function checkdetails(params) {
  return ax.get(`/help/person/${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 审核节点
export function checkedNode(params) {
  return ax.get(`/help/audits?projectId=${params.projectId}&projectType=${params.projectType}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 推荐
export function recommendProject(params) {
  return ax.post(`/help/recommend`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 认领列表
export function plansList(params) {
  return ax.post(`/help/plans`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 缴费账单
export function payBill(params) {
  return ax.get(`/help/bill?planId=${params.planId}&recipientsId=${params.recipientsId}&projectType=${params.projectType}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}
