import { updateUser, updateUserHobbies, handleMalformedRequest } from './helpers.js';

export const handleUpdateHobbies = (req, res, { id }) => {
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

export const handleUpdateUser = (req, res, { id }) => {
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
