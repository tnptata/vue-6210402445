import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: []
  },
  getters:{
    records: (state) => state.data,
  },
  mutations: {
    fetch (state, { res }){
        state.data = res.data
    },
    add(state, {payload}){
      state.data.push(payload)
    }
  },
  actions: {
      fetchRecord({ commit }){
          let res = {
              data:[
                  {
                      list: "แม่ให้",
                      date: "22-7-2021",
                      type:"รายรับ",
                      amount: 100
                  },
                  {
                      list: "ซื้อข้าว",
                      date: "22-7-2021",
                      type:"รายจ่าย",
                      amount: 30
                  },
                  {
                    list: "ซื้อขนม",
                    date: "23-7-2021",
                    type:"รายจ่าย",
                    amount: 20
                  },
                  {
                    list: "พ่อให้",
                    date: "24-7-2021",
                    type:"รายรับ",
                    amount: 50
                  },
              ]
          }
          commit("fetch",{ res })
      },
      addRecord({ commit }, payload){
        commit('add', {payload})
      },
      fetchRecord2({ commit }){
        let res = {
            data:[
                {
                    list: "แม่ให้",
                    date: "7/22/2021",
                    type:"รายรับ",
                    amount: 100
                },
                {
                    list: "ซื้อข้าว",
                    date: "7/22/2021",
                    type:"รายจ่าย",
                    amount: 30
                }
            ]
        }
        commit("fetch",{ res })
    }

  },
  modules: {
  }
})