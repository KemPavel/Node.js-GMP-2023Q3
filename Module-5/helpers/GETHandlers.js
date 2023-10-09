import { getUser, getUsers, handleMalformedRequest } from './helpers.js';

export const sendHobbies = (req, res, { id }) => {
  const user = getUser(id);
  if (user) {
    res.setHeader('max-age', 120);
    res.statusCode = 200;
    res.end(JSON.stringify(user.hobbies))
  } else {
    handleMalformedRequest(res, { code: 404, message: 'User not found' });
  }
};

export const sendUserInfo = (req, res, { id }) => {
  const user = getUser(id);
  if (user) {
    const { hobbies, ...response } = user;
    res.statusCode = 200;
    res.end(JSON.stringify(response))
  } else {
    handleMalformedRequest(res, { code: 404, message: 'User not found' });
  }
};

export const sendUsersList = (req, res) => {
  const response = getUsers();
  res.statusCode = 200;
  res.end(JSON.stringify(response));
};
