export default {
  namespaced: true,
  state: {
    userInfo: 0,
    colorValue: '#83B4D5'
  },
  mutations: {
    changeInfo (state: any) {
      state.userInfo++
    },
    changeColor (state: any, data: string) {
      state.colorValue = data
    }
  },
  actions: {
    changeInfo ({commit}) {
      commit('changeInfo')
    },
    changeColor ({commit}, data: string) {
      commit('changeColor', data)
    }
  }
}