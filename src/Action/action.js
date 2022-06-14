import * as types from './actionType'
import axios from 'axios'

const userAdded = () => ({
    type: types.ADD_USER,
  });

export const addUser = (user) => {
    return function (dispatch) {
      axios
        .post("http://localhost:3001/users", user)
        .then((resp) => {
          console.log("resp", resp);
          dispatch(userAdded());
        })
        .catch((error) => console.log(error.resp));
    };
  };