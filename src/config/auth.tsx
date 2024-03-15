// getUser.js
export default function getUser() {
  return fetch("https://stem-backend.vercel.app/auth/login/success", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error("authentication has been failed!");
    }).then((data) => {
      // Return the success status and the user data
      return {
        isAuthenticated: data.success,
        user: data.user,
        userId: data.userId
      };
    })
    .catch((err) => {
      console.log(err);
      return { isAuthenticated: false, user: null, userId: null };
    });
};

// export default getUser;
