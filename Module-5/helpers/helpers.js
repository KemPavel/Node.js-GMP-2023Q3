import { users } from '../data.js';

export const findUserIndex = (id) => users.findIndex((user) => user.id.toString() === id.toString());

export const getUser = (id) => users.find((user) => user.id.toString() === id.toString());
export const getUsers = () => users.map(({ hobbies, ...rest }) => rest);
export const createUser = (user) => users.push({ ...user, id: users.length + 1 });

export const deleteUser = (id) => {
  const index = findUserIndex(id);
  if (index >= 0) {
    users.splice(index, 1);
    return true;
  }
  return false;
};

export const updateUser = (id, body) => {
  const index = findUserIndex(id);
  if (index >= 0) {
    const user = users[index];
    users[index] = {
      ...user,
      ...body
    };
    return getUser(id);
  }
  return false;
};

export const updateUserHobbies = (id, body) => {
  const index = findUserIndex(id);
  if (index >= 0) {
    users[index].hobbies = body.hobbies;
    return getUser(id).hobbies;
  }
  return false;
};

export const handleMalformedRequest = (res, { code, message }) => {
  res.statusCode = code;
  res.end(message);
};
