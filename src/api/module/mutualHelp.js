import ax from '../axios';

export function mutualList(params) {
  return ax.post('/mutual/mutuals', params)
    .then(res => res.data)
    .catch(e => console.log(e));
}

export function bill(params) {
  return ax.get(`/mutual/dill?recipientsId=${params}`)
    .then(res => res.data)
    .catch(e => console.log(e));
}
