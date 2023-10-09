import { deleteUser, handleMalformedRequest } from './helpers.js';

export const handleDeleteUser = (req, res, { id }) => {
  const result = deleteUser(id);
  if (result) {
    res.statusCode = 204;
    res.end();
  } else {
    handleMalformedRequest(res, { code: 404, message: 'User not found' });
  }
};
