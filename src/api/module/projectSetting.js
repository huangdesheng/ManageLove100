import ax from '../axios';

//bannerList列表
export function bannerList(params) {
  return ax.post('/banner/banner', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

//展示或者取消banner
export function exhibition(params) {
  return ax.post('/banner/exhibition', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 新增banner
export function addBanner(params) {
  return ax.post('/banner/addBanner', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 查详情
export function BannerDetails(params) {
  return ax.get(`/banner/BannerQuery?bannerId=${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 删除banner
export function deleteBanner(params) {
  return ax.post(`/banner/deleteBanner`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}


// 修改banner
export function updateBanner(params) {
  return ax.post(`/banner/updateBanner`, params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

export function authorityMenus() {
  return ax.get(`/sys/menus`)
    .then(res => res.data)
    .catch(e => console.log(e));
}
