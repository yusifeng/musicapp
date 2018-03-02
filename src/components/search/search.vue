<template>
  <div class="search">
  	<div class="search-box-wrapper">
  		<search-box ref="searchBox" 
  					@query="onQueryChange">
  					</search-box>
  	</div>
  	<div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
  		<scroll class="shortcut" :data="shortcut" ref="shortcut" :refreshDelay="refreshDelay">
        <div>
    			<div class="hot-key">
    				<h1 class="title">热门搜索</h1>
    				<ul>
    					<li v-for="item in hotKey" 
    						@click="addQuery(item.k)"
    						class="item">
    						<span>{{item.k}}</span>
    					</li>
    				</ul>
    			</div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list  :searches="searchHistory" 
                          @select="addQuery" 
                          @delect="delectSearchHistory"></search-list>
          </div>
        </div>
  		</scroll>
  	</div>
  	<div class="search-result" v-show="query" ref="searchResult">
  		<suggest :query="query"
                ref="suggest"
               @select="saveSearch"
               @listScroll="blurInput"></suggest>
  	</div>
    <confirm ref="confirm" 
             text="是否清空所有历史记录" 
             @confirm="clearSearchHistory"
             @cancel=""
             confirmBtnText="清空"></confirm>
    <router-view></router-view>
  </div>
</template>
<script>
import SearchBox from 'base/search-box/search-box'
import {getHotKey} from 'api/search'
import {ERR_OK} from 'api/config'
import Suggest from 'components/suggest/suggest'
import {mapActions} from 'vuex'
import SearchList from 'base/search-list/search-list'
import Confirm from 'base/confirm/confirm'
import Scroll from 'base/scroll/scroll'
import {playListMixin, searchMixin} from 'common/js/mixin'
export default {
  components: {
  	SearchBox,
  	Suggest,
    SearchList,
    Confirm,
    Scroll
  },
  mixins: [playListMixin, searchMixin],
  data() {
  	return {
  		hotKey: [],
  	}
  },
  created() {
  	this._getHotKey()
  },
  computed: {
    shortcut() {
      return this.hotKey.concat(this.searchHistory)
    },
    // ...mapGetters([
    //   'searchHistory'
    // ])
  },
  methods: {
    handlePlayList(playList) {
      const bottom = playList.length > 0 ? '60px' : 0
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()
      this.$refs.suggest.refresh()
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    // clearAll() {
    //   this.clearSearchHistory()
    // },
    // delectOne(item) {
    //   this.delectSearchHistory(item)
    // },
    // saveSearch() {
    //   this.saveSearchHistory(this.query)
    // },
    // blurInput() {
    //   this.$refs.searchBox.blur()
    // },
  	_getHotKey() {
  		getHotKey().then((res) => {
  			if (res.code === ERR_OK) {
  				this.hotKey = res.data.hotkey.slice(0, 10)
  			}
  		})
  	},
  	// addQuery(query) {
  	// 	this.$refs.searchBox.setQuery(query)
  	// },
  	// onQueryChange(newQuery) {
  	// 	this.query = newQuery
  	// },
    ...mapActions([
      'delectSearchHistory',
    ])
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }) 
      }
    }
  }
  

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      z-index: 10
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
