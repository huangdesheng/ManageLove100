import ax from '../axios';

//互助删除
export function deleteBill(params) {
  return ax.delete(`/mutual/${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}

// 
export function groupDelete(params) {
  return ax.delete(`/help/group/${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}

export function personalDelete(params) {
  return ax.delete(`/help/person/${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}
