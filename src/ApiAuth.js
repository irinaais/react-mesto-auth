export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  })
    .then((res) => {
      return res.json();
    })
    .then((res) =>{
      return res;
    })
    .catch((err) => console.log(err));
};

export const authorise = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.token){
        localStorage.setItem('token', data.token);
        return data;
      }
    })
    .catch((err) => console.log(err));
};

//принимает на вход JWT. Он б. отправлен на сервер и, если токен действителен, вернет ответ с инф-й о пользов-ле
export const tokenCheck = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json', "Authorization" : `Bearer ${token}`}
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};