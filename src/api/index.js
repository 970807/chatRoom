import request from '@/utils/request'

export function getAvatarList() {
  return request({
    url: '/getAvatarList',
    method: 'get'
  })
}