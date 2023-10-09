import { createUser } from './helpers.js';

export const handleCreateUser = (req, res) => {
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
