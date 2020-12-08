const requestsModule = {
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    addRequest(state, payload) {
      console.log("addRequest payload: ", payload);
      state.requests.unshift(payload);
    },
  },
  actions: {
    addRequest(context, payload) {
      const userId = context.rootGetters.userId;

      const url = `https://vue-http-demo-f1b10.firebaseio.com/requests/${userId}.json`;

      fetch(url, {
        method: "POST",
        body: JSON.stringify(payload.value),
      })
        .then((response) => response.json())
        .then(() => context.commit("addRequest", payload.value));
    },
    loadRequests(context) {
      const token = context.getters.token;
      const url = `https://vue-http-demo-f1b10.firebaseio.com/requests.json?auth=${token}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log("data values: ", Object.values(data));
          context.state.requests = Object.values(data);
        });
    },
  },
  getters: {
    myRequests(state, _getters, _rootState, rootGetters) {
      return state.requests.filter(
        (request) => request.coachId === rootGetters.userId
      );
    },
  },
};

export default requestsModule;
