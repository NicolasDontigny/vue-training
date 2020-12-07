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
    myRequests(state, _getters, _rootState, rootGetters) {
      console.log("====================");
      console.log("state.requests: ", state.requests);
      console.log("rootGetters: ", rootGetters);
      console.log(
        state.requests.filter(
          (request) => request.coachId === rootGetters.userId
        )
      );
      return state.requests.filter(
        (request) => request.coachId === rootGetters.userId
      );
    },
  },
};

export default requestsModule;
