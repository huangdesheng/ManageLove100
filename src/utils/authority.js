import Cookies from 'js-cookie';

//token的获取 设置 移除
export function getToken() {
  return Cookies.get('Authorization');
}

export function setToken(token) {
  return Cookies.set('Authorization', token);
}

export function removeToken(token) {
  return Cookies.remove('Authorization');
}

//用户名的获取 设置 移除
export function getUserName() {
  return Cookies.get('userName');
}

export function setUserName(token) {
  return Cookies.set('userName', token);
}

export function removeUserName() {
  return Cookies.remove('userName');
}

//菜单的获取 设置 移除
export function getMenus() {
  return Cookies.get('Menus');
}

export function setMenus(Menus) {
  return Cookies.set('Menus', Menus);
}
export function removeMenus() {
  return Cookies.remove('Menus');
}
