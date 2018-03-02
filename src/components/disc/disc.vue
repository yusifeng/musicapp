<template>
  <transition name="slider">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
  export default {
  	data() {
  		return {
  			songs: []
  		}
  	},
  	components: {
  	 	MusicList,
  	},
  	computed: {
  		...mapGetters([
  			'disc'
  		]),
  		title() {
  			return this.disc.dissname
  		},
  		bgImage() {
  			return this.disc.imgurl
  		}
  	},
  	mounted() {
  		// console.log('>>', this.disc)
  	},
  	created() {
  		this._getSongList()
  	},
  	methods: {
  		_getSongList() {
  			if (!this.disc.dissid) {
  				this.$router.push('/recommend')
  				return
  			}
  			console.log('>>>')
  			getSongList(this.disc.dissid).then((res) => {
  				if (res.code === ERR_OK) {
  					this.songs = this._normlizeSong(res.cdlist[0].songlist)
  				}
  			})
  		},
  		_normlizeSong(list) {
  			let ret = []
  			list.forEach((musicData) => {
  				if (musicData.songid && musicData.albumid) {
  					ret.push(createSong(musicData))
  				}
  			})
  			return ret
  		}
  	}

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.slider-enter-active, .slider-leave.active
		transition: all .3s
	
	.slder-enter, .slider-leave-to
		transform: translate3d(100%, 0, 0)
</style>