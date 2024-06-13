import { createStore } from 'vuex';

export default createStore({
  state: {
    trip: {},
    searchFromDate: null,
    searchToDate: null,
  },
  mutations: {
    SET_TRIP(state, trip) {
      state.trip = trip;
    },
    UPDATE_TRIP_PROPERTY(state, { property, value }) {
      state.trip[property] = value;
    },
    SET_SEARCH_FROM_DATE(state, date) {
      state.searchFromDate = date;
    },
    SET_SEARCH_TO_DATE(state, date) {
      state.searchToDate = date;
    },
    CLEAR_SEARCH_DATES(state) {
      state.searchFromDate = null;
      state.searchToDate = null;
    }
  },
  actions: {
    setTrip({ commit }, trip) {
      commit('SET_TRIP', trip);
    },
    updateTripProperty({ commit }, { property, value }) {
      commit('UPDATE_TRIP_PROPERTY', { property, value });
    }
  },
  getters: {
    getTrip(state) {
      return state.trip;
    }
  }
});
