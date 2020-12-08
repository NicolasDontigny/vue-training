const apiKey = process.env.VUE_APP_FIREBASE_API_KEY;
let timer;

const setLocalStorage = (data, expirationDate) => {
  localStorage.setItem("token", data.idToken);
  localStorage.setItem("userId", data.localId);
  localStorage.setItem("expirationDate", expirationDate);
};

const authModule = {
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
    },
    logout(state) {
      state.token = null;
      state.userId = null;
      state.tokenExpiration = null;
    },
  },
  actions: {
    auth(context, payload) {
      console.log("api key: ", apiKey);
      const modeUrl =
        payload.mode === "login" ? "signInWithPassword" : "signUp";
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:${modeUrl}?key=${apiKey}`;

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            console.log("response: ", response);
            throw new Error(response.message || "Failed to authenticate");
          }
          return response.json();
        })
        .then((data) => {
          console.log("data: ", data);
          // Plus sign makes sure it is converted to a number
          const expiresIn = +data.expiresIn * 1000;
          const expirationDate = new Date().getTime() + expiresIn;
          setLocalStorage(data, expirationDate);

          timer = setTimeout(() => context.dispatch("logout"), expiresIn);

          context.commit("setUser", {
            token: data.idToken,
            userId: data.localId,
          });
        });
    },
    logout(context) {
      context.commit("logout");

      clearTimeout(timer);

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("expirationDate");
    },
    checkIfAuthenticated(context) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const expirationDate = localStorage.getItem("userId");

      if (token && userId) {
        const data = {
          token,
          userId,
        };
        const expiresIn = +expirationDate - new Date().getTime();
        if (expiresIn < 10000) {
          return;
        }
        setLocalStorage(data, expirationDate);

        timer = setTimeout(() => context.dispatch("logout"), expiresIn);
        context.commit("setUser", data);
      }
    },
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return state.userId !== null;
    },
  },
};

export default authModule;
