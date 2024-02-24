import { useState, useEffect } from "react";
// import axios from 'axios'
type User = {
    photos: any,
    displayName: String
  }
  export default function Auth() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const getUser = () => {
          fetch("https://stem-backend.vercel.app/auth/login/success", {
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
            })
           .then((resObject: { user: User }) => {
  setUser(resObject.user);
})
            .catch((err) => {
              console.log(err);
            });
        };
        getUser();
      }, []);
      console.log(user);
      
}