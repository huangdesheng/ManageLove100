import ax from '../axios';

//团体帮扶列表
export function rolesList(params) {
  return ax.post('/sys/roles', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 获取权限列表
export function nodesList(params) {
  return ax.get('/sys/nodes', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 新增角色保存
export function saveRoles(params) {
  return ax.post('/sys/role', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 编辑详情
export function editRoles(params) {
  return ax.get(`/sys/role/${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 角色编辑保存
export function editSubmitRoles(params) {
  return ax.put(`/sys/role`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 删除角色
export function deleteRoles(params) {
  return ax.delete(`/sys/role/${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}
