import ax from '../axios';

//用户登录
export function login(params) {
  return ax.post('/user/login', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 修改登录密码
export function updatePassword(params) {
  return ax.put('/user/update-password', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 获取用户列表
export function userList() {
  return ax.get('/sys/users')
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 新增用户
export function addUser(params) {
  return ax.post('/sys/register', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 角色列表
export function rolelist(params) {
  return ax.post('/sys/roles', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 修改用户信息
export function userRoleInfo(params) {
  return ax.put('/sys/update-user', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 修改用户密码
export function updateRoleInfo(params) {
  return ax.put('/sys/update-user-password', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}
