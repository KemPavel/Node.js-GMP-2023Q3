import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserHobbies,
  deleteUser
} from '../services/user-service.js';
import { handleMalformedRequest } from '../services/common-service.js';

const sendHobbies = (req, res, { id }) => {
  const user = getUser(id);
  if (user) {
    res.setHeader('max-age', 120);
    res.statusCode = 200;
    res.end(JSON.stringify(user.hobbies))
  } else {
    handleMalformedRequest(res, { code: 404, message: 'User not found' });
  }
};

const sendUserInfo = (req, res, { id }) => {
  const user = getUser(id);
  if (user) {
    const { hobbies, ...response } = user;
    res.statusCode = 200;
    res.end(JSON.stringify(response))
  } else {
    handleMalformedRequest(res, { code: 404, message: 'User not found' });
  }
};

const sendUsersList = (req, res) => {
  const response = getUsers();
  res.statusCode = 200;
  res.end(JSON.stringify(response));
};

const handleCreateUser = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    createUser(JSON.parse(body));
    res.statusCode = 201;
    res.end('created');
  });
};

const handleUpdateHobbies = (req, res, { id }) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    const result = updateUserHobbies(id, JSON.parse(body));
    if (result) {
      res.statusCode = 200;
      res.end(JSON.stringify(result));
    } else {
      handleMalformedRequest(res, { code: 404, message: 'User not found' });
    }
  });
};

const handleUpdateUser = (req, res, { id }) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    const result = updateUser(id, JSON.parse(body));
    if (result) {
      res.statusCode = 200;
      res.end(JSON.stringify(result));
    } else {
      handleMalformedRequest(res, { code: 404, message: 'User not found' });
    }
  });
};

const handleDeleteUser = (req, res, { id }) => {
  const result = deleteUser(id);
  if (result) {
    res.statusCode = 204;
    res.end();
  } else {
    handleMalformedRequest(res, { code: 404, message: 'User not found' });
  }
};

const handleUsersRequest = (req, res, userId, hobbies) => {
  switch (req.method) {
    case 'GET': {
      if (userId && hobbies) {
        sendHobbies(req, res, { id: userId });
        return;
      }

      if (userId) {
        sendUserInfo(req, res, { id: userId });
        return;
      }

      sendUsersList(req, res);
      break;
    }
    case 'POST': {
      handleCreateUser(req, res);
      break;
    }
    case 'PATCH': {
      if (userId && hobbies) {
        handleUpdateHobbies(req, res, { id: userId });
        return;
      }

      if (userId) {
        handleUpdateUser(req, res, { id: userId });
        return;
      }
      break;
    }
    case 'DELETE': {
      if (userId) {
        handleDeleteUser(req, res, { id: userId });
        return;
      }
      break;
    }
  }
};

export default handleUsersRequest;
