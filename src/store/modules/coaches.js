const updateData = async (coach, userId, token, func) => {
  const url = `https://vue-http-demo-f1b10.firebaseio.com/coaches/${userId}.json?auth=${token}`;

  const response = await fetch(url, {
    method: "PUT",
    // ContentType: "application/json",
    body: JSON.stringify({
      coach: coach,
    }),
  });

  const coachData = await response.json();

  if (!response.ok) {
    console.log("response (error): ", response);
  }

  func(coachData);
};

const loadData = async (func) => {
  const url = `https://vue-http-demo-f1b10.firebaseio.com/coaches.json`;

  fetch(url)
    .then((response) => response.json())
    .then((coachesData) => func(coachesData));
};

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
      const newCoach = payload.coach;
      state.coaches.unshift(newCoach);
    },
    loadCoaches(state, payload) {
      state.coaches = payload;
    },
  },
  actions: {
    addCoach(context, payload) {
      const userId = context.getters.userId;
      const newCoach = payload.value;
      newCoach.id = userId;

      updateData(
        newCoach,
        context.getters.userId,
        context.getters.token,
        (data) => context.commit("register", data)
      );
    },
    loadCoaches(context) {
      loadData((data) =>
        context.commit(
          "loadCoaches",
          Object.values(data).map((coachData) => coachData.coach)
        )
      );
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    isCoach(_state, getters, _rootState, rootGetters) {
      return getters.coaches.some((coach) => coach.id === rootGetters.userId);
    },
  },
};

export default coachesModule;
