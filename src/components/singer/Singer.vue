<template>
  <div class="singer">
  	<list-view :data="singers" @select="selectSinger"></list-view>
  	<router-view></router-view>
  </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
import {mapMutations} from 'vuex'
const HOT_NAME = "热门"
const HOT_SINGER_LEN = 10
export default {
	components: {
		ListView
	},
	data() {
		return {
			singers: []
		}
	},
	methods: {
		selectSinger(item) {
			this.$router.push({
				path: `/singer/${item.id}`
			})
			this.setSinger(item)
		},
		_getSingerList() {
			getSingerList().then((res) => {
				if (res.code === ERR_OK) {
					this.singers = this._normalizeSinger(res.data.list)
				}
			})
		},
		_normalizeSinger(list) {
			let map = {
				hot: {
					title: HOT_NAME,
					items: []
				}
			}
			list.forEach((item, index) => {
				if (index <= HOT_SINGER_LEN) {
					map.hot.items.push(new Singer({
						id: item.Fsinger_mid,
						name: item.Fsinger_name
					}))
				}
				const key = item.Findex
				if (!map[key]) {
					map[key] = {
						title: key,
						items: []
					}
				}
				map[key].items.push(new Singer({
					id: item.Fsinger_mid,
					name: item.Fsinger_name
				}))
			})
			//处理map
			let hot = []
			let rest = []
			for (let key in map) {
				let val = map[key]
				if (val.title.match(/[a-zA-Z]/)) {
					rest.push(val)
				}else if (val.title === HOT_NAME) {
					hot.push(val)
				}
			}
			rest.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
			return hot.concat(rest)
		},
		...mapMutations({
			setSinger: 'SET_SINGER'
		})
	},
	created() {
		this._getSingerList()
	},
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer
	position: fixed
	top: 88px
	bottom: 0
	width: 100%
</style>
