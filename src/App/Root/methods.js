import firebase from "firebase";
/*import axios from "axios";
const api_url = 'http://localhost:4000';

export const postTodo = async (id,data) => {
    await axios.post(api_url+`/users`,{ data })
}

export const getTodos = async (token) => {
    await axios.get(api_url+'/todos.json',{headers:{token}})
}*/

export const postTodoToUser = async  (uid,data) => {
    await firebase.database().ref('users').child(uid).push(data)
}
export const updateTodoToUser = async  (uid,data) => {
   await firebase.database().ref('users').child(uid).set(data)
}


