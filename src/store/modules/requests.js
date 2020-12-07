const requestsModule = {
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.unshift(payload.value);
    },
  },
  actions: {
    addRequest(context, payload) {
      context.commit("addRequest", payload);
    },
  },
  getters: {
    myRequests(state) {
      return state.requests;
    },
  },
};

export default requestsModule;
