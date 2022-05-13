import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allLenders: []
  },
  mutations: {
    setAllLenders(state, payload) {
      state.allLenders = payload
    }
  },
  actions: {
    addLender({state, commit}, newLender) {
      const allLenders = [...state.allLenders]
      allLenders.push(newLender)
      localStorage.setItem('allLenders', JSON.stringify(allLenders));
      commit("setAllLenders", allLenders);
    },
    updateLender({state, commit}, updatedLender) {
      let allLenders = [...state.allLenders]
      const indexOfUpdatedLender = allLenders.findIndex(item => item.id === updatedLender.id)
      allLenders[indexOfUpdatedLender] = updatedLender
      localStorage.setItem('allLenders', JSON.stringify(allLenders));
      commit("setAllLenders", allLenders);
    },
    initLenders(state) {
      const allLenders = JSON.parse(localStorage.getItem('allLenders')) || []
      state.commit("setAllLenders", allLenders)
    }
  },
  modules: {},
  getters: {
    getAllLenders: state => state.allLenders,
    getLender: (state) => (id) => {
      return state.allLenders.find( item => item.id === id)
    }
  }
});
