<template>
  <div class="search-list" v-show="searches.length">
    <transition-group tag="ul" name="list">
      <li class="search-item" 
          :key="item"
          @click="selectItem(item)"
          v-for="item in searches">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="delectOne(item)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
  export default {
    props: {
      searches: {
        type: Array,
        default: []
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      },
      delectOne(item) {
        this.$emit('delect', item)
      }
    },
    watch:{
      searches(newSearch) {
        console.log(1)
        this.search = newSearch
      }
    }
    
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-list
    .search-item
      display: flex
      align-items: center
      height: 40px
      overflow: hidden
      &.list-enter-active, &.list-leave-active
        transition: all 0.1s
      &.list-enter, &.list-leave-to
        height: 0
      .text
        flex: 1
        color: $color-text-l
      .icon
        extend-click()
        .icon-delete
          font-size: $font-size-small
          color: $color-text-d
</style>