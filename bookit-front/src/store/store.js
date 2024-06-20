import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    trip: {},
    totalPrice: null,
    searchFromDate: null,
    searchToDate: null,
    children: null,
    adults:null
  },
  mutations: {
    SET_TRIP(state, trip) {
      state.trip = trip;
    },
    SET_CHILDREN(state, children) {
      state.children = children;
    },
    SET_ADULTS(state, adults) {
      state.adults = adults;
    },
    SET_TOTALPRICE(state, totalPrice) {
      state.totalPrice = totalPrice;
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
    setChildren({ commit }, children) {
      commit('SET_CHILDREN', children);
    },
    setAdults({ commit }, adults) {
      commit('SET_ADULTS', adults);
    },
    setTotalPrice({ commit }, totalPrice) {
      commit('SET_TOTALPRICE', totalPrice);
    },
    updateTripProperty({ commit }, { property, value }) {
      commit('UPDATE_TRIP_PROPERTY', { property, value });
    }
  },
  getters: {
    getTrip(state) {
      return state.trip;
    },
    getChildren(state) {
      return state.children;
    },
    getAdults(state) {
      return state.adults;
    },
    getTotalPrice(state) {
      return state.totalPrice;
    }
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
    reducer: (state) => ({
      totalPrice:state.totalPrice,
      searchFromDate:state.searchFromDate,
      searchToDate:state.searchToDate,
      children:state.children,
      adults:state.adults
    })
  })]
});
