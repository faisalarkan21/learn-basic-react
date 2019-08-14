import Axios from "axios";

export const FETCH_USERS = "ADD_COUNTING";

export function fetchUsers(data) {
  return {
    type: FETCH_USERS,
    data
  };
}

export function getUsersSearch(query) {
  return dispatch => {
    return Axios.get("https://5d371ebf86300e0014b64ae7.mockapi.io/api/v1/users").then(
      ({ data }) => {
        console.log('data users', data)

        let reWriteOnlyName = [];

        data.map((v) => {
          reWriteOnlyName.push(v.name)
        })

        dispatch(fetchUsers(reWriteOnlyName));
      }
    );
  };
}
