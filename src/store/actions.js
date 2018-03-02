import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

import {saveSearch, delectSearch, clearSarch, savePlay, saveFavorite, deleteFavorite} from 'common/js/cache'

function findIndex(list, song) {
	return list.findIndex((item) => item.id === song.id)
}

export const selectPlay = function({commit, state}, {list, index}) {
	commit(types.SET_SEQUENCE_LIST, list)
	if (state.mode === playMode.random) {
		let randomList = shuffle(list)
		commit(types.SET_PLAY_LIST, randomList)
		index = findIndex(randomList, list[index])
	} else {
		commit(types.SET_PLAY_LIST, list)
	}
	commit(types.SET_CURRENT_INDEX, index)
	commit(types.SET_FULL_SCREEN, true)
	commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function({commit}, {list}) {
	commit(types.SET_PLAY_MODE, playMode.random)
	commit(types.SET_SEQUENCE_LIST, list)
	let randomList = shuffle(list)
	commit(types.SET_PLAY_LIST, randomList)
	commit(types.SET_CURRENT_INDEX, 0)
	commit(types.SET_FULL_SCREEN, true)
	commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function({commit, state}, song) {
	let playList = state.playList.slice()
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex
	// 记录当前歌曲
	  let currentSong = playList[currentIndex]
	// 查找当前列表中是否有待插入的歌曲并返回索引
	let fpIndex = findIndex(playList, song)
	currentIndex++
	playList.splice(currentIndex, 0, song)
	// 如果已经包含了这首歌 -> 删除
	if (fpIndex > -1) {
		if (currentIndex > fpIndex) {
			playList.splice(fpIndex, 1)
			currentIndex--
		} else {
			playList.splice(fpIndex + 1, 1)
		}
	}

	let currentSIndex = findIndex(sequenceList, currentSong) + 1
	let fsIndex = findIndex(sequenceList, 0, song)
	sequenceList.splice(currentSIndex, 0, song)
	if (fsIndex > -1) {
		if (currentSIndex > fsIndex) {
			sequenceList.splice(fsIndex, 1)

		} else {
			playList.splice(fpIndex + 1, 1)
		}
	}

	commit(types.SET_PLAY_LIST, playList)
	commit(types.SET_SEQUENCE_LIST, sequenceList)
	commit(types.SET_CURRENT_INDEX, currentIndex)
	commit(types.SET_FULL_SCREEN, true)
	commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function({commit}, query) {
	commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}


export const delectSearchHistory = function({commit}, query) {
	commit(types.SET_SEARCH_HISTORY, delectSearch(query))
}

export const clearSearchHistory = function({commit}, query) {
	commit(types.SET_SEARCH_HISTORY, clearSarch(query))
}

export const deleteSong = function({commit, state}, song) {
	let playList = state.playList.slice()
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex
	let pIndex = findIndex(playList, song)
	playList.splice(pIndex, 1)
	let sIndex = findIndex(sequenceList, song)
	sequenceList.splice(sIndex, 1)

	if (currentIndex > pIndex || currentIndex === playList.length) {
		currentIndex--
	}

	commit(types.SET_PLAY_LIST, playList)
	commit(types.SET_SEQUENCE_LIST, sequenceList)
	commit(types.SET_CURRENT_INDEX, currentIndex)

	const playingState = playList.length > 0

	commit(types.SET_PLAYING_STATE, playingState)
}

export const deleteSongList = function({commit}) {
	commit(types.SET_PLAY_LIST, [])
	commit(types.SET_SEQUENCE_LIST, [])
	commit(types.SET_CURRENT_INDEX, -1)
	commit(types.SET_PLAYING_STATE, false)
}

export const savePlayHistory = function({commit}, song) {
	commit(types.SET_PLAY_HISTORY, savePlay(song))
}

export const saveFavoriteList = function({commit}, song) {
	commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const deleteFavoriteList = function({commit}, song) {
	commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}