const coachesModule = {
  state() {
    return {
      coaches: [
        {
          id: new Date().toISOString(),
          firstName: "Nicolas",
          lastName: "Dontigny",
          tags: ["front-end", "back-end", "scrum"],
          description: "An amazing full-stack web developer",
          rate: 30,
        },
        {
          id: new Date().toISOString(),
          firstName: "Max",
          lastName: "Schwarzmüller",
          tags: ["front-end", "scrum"],
          description: "Great teacher!",
          rate: 100,
        },
      ],
    };
  },
  mutations: {
    register(state, payload) {
      const newCoach = payload.value;
      state.coaches.unshift(newCoach);
    },
    loadCoaches() {},
  },
  actions: {
    addCoach(context, payload) {
      const userId = context.rootGetters.userId;
      const newCoach = payload.value;
      newCoach.id = userId;
      context.commit("register", payload, context);
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    isCoach(state, getters, rootState, rootGetter) {},
  },
};

export default coachesModule;
