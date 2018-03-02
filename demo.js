let axios = require('axios')
let express = require('express')
let route = require('express-route')
let server = express()


// let api = express.Router()
// server.use('/api', api)


// const commonParams = {
//   g_tk: 1928093487,
//   inCharset: 'utf-8',
//   outCharset: 'utf-8',
//   notice: 0,
//   format: 'jsonp'
// }
const data = Object.assign({}, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: 1790523664,
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
var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
// // let url1 = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid=1790523664&format=jsonp&g_tk=1649871947&jsonpCallback=playlistinfoCallback&loginUin=1115372296&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0' 

// api.get('/list', (req, res) => {
  // axios.get(url, {
  //   headers: {
  //     referer: 'https://c.y.qq.com/',
  //     host: 'c.y.qq.com'
  //   },
  //   params: data
  // }).then((response) => {
  //   console.log(response.data)
  // }).catch((e) => {
  //   console.log(e)
  // })


// })


// var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
//         const data = Object.assign({}, {
//           type: 1,
//           json: 1,
//           utf8: 1,
//           onlysong: 0,
//           disstid: 1790523664,
//           format: 'jsonp',
//           g_tk: 1649871947,
//           jsonpCallback: 'playlistinfoCallback',
//           loginUin: 1115372296,
//           hostUin: 0,
//           format: 'jsonp',
//           inCharset: 'utf8',
//           outCharset: 'utf-8',
//           notice: 0,
//           platform: 'yqq',
//           needNewCode: 0,
//         })
        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com',
          },
          params: data
        }).then((response) => {
          let str = response.data
          // console.log(str)
          // console.log(str)
          let reg = /{.+}/g

          var matches = str.match(reg)

          console.log(typeof matches[0])
          ret = JSON.parse(matches[0])
          console.log(typeof ret)
        }).catch((e) => {
          console.log(e)
        })



// server.listen(3000)


// before(apiRoutes){
    //   apiRoutes.get('/api/getDiscList',(req,res)=>{
    //     const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
    //     axios.get(url, {
    //       headers: {
    //         referer: 'https://c.y.qq.com/',
    //         host: 'c.y.qq.com'
    //       },
    //       params: req.query
    //     }).then((response) => {
    //       res.json(response.data)
    //     }).catch((e) => {
    //       console.log(e);
    //     })
    //   });
    //   app.use('/api', apiRoutes);
    //  }
    // },
    // 
    // 
    // https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?
    // type=1&
    // json=1&
    // utf8=1&
    // onlysong=0&
    // disstid=1790523664&
    // format=jsonp&
    // g_tk=1649871947&
    // jsonpCallback=playlistinfoCallback&
    // loginUin=1115372296&hostUin=0&
    // format=jsonp&inCharset=utf8&
    // outCharset=utf-8&
    // notice=0&
    // platform=yqq&
    // needNewCode=0
    


    // let str = '{123123123123{}'
    // let reg = /{.*}/g

    // var matches = str.match(reg)

    // console.log(matches)


http://dl.stream.qqmusic.qq.com/C400000i45fK3z7D7o.m4a?guid=4624492840&vkey=C9D38C38B1C34B58AF3B75ACD27932EFB5620DA63ECCEFC367B62CD9D89EDD528955F67316ECF7A30AEE7B3E9CA5C1B2E3D208DDFF3AE1EC&uin=&fromtag=999

http://dl.stream.qqmusic.qq.com/C400002sshd417a9Ho.m4a?guid=4624492840&vkey=58C9BCD09D8A0DF9D6602CB47FA3DBB2CE1AEA091E9CA709C5B81FA286EB19E0F68BEA5135E174354A9D3B2E18015A25CF3CF066C9A0078C&uin=&fromtag=999