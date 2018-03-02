import axios from 'axios'
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
export function getRecommend() {
	const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

	const data = Object.assign({}, commonParams, {
		platform: 'h5',
		uin: 0,
		needNewCode: 1
	})

	return jsonp(url, data, options)
}

export function getDiscList() {
	const url = '/api/getDiscList'

	const data = Object.assign({},commonParams, {
    platform: 'yqq',
    hostUin: 0,
    uin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 1,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

	return axios.get(url,{
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch((e) => {
		console.log(e)
	})
}

export function getSongList(disstid) {
	const url = '/api/disc'
	const data = Object.assign({}, {
	    type: 1,
	    json: 1,
	    utf8: 1,
	    onlysong: 0,
	    disstid: disstid,
	    format: 'jsonp',
	    g_tk: 1649871947,
	    jsonpCallback: 'playlistinfoCallback',
	    loginUin: 1115372296,
	    hostUin: 0,
	    format: 'jsonp',
	    inCharset: 'utf8',
	    outCharset: 'utf-8',
	    notice: 0,
	    platform: 'yqq',
	    needNewCode: 0,
  })
	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch((e) => {
		console.log(e)
	})
}