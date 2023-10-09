import url from 'url';
import http from 'http';
import { handleMalformedRequest } from './helpers/helpers.js';
import { sendHobbies, sendUserInfo, sendUsersList } from './helpers/GETHandlers.js';
import { handleCreateUser } from './helpers/POSTHandlers.js';
import { handleUpdateHobbies, handleUpdateUser } from './helpers/PATCHHandlers.js';
import { handleDeleteUser } from './helpers/DELETEHandlers.js';


const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const regex = /(users)(?:\/(\d+))?(\/hobbies)?/;
  const parsedUrl = url.parse(req.url);
  const path = regex.exec(parsedUrl.pathname);

  if (path === null) {
    handleMalformedRequest(res, { code: 500, message: 'Invalid request' });
  }

  const [ , root, userId, hobbies ] = path;

  switch (req.method) {
    case 'GET': {
      if (root === 'users' && userId && hobbies) {
        sendHobbies(req, res, { id: userId });
        return;
      }

      if (root === 'users' && userId) {
        sendUserInfo(req, res, { id: userId });
        return;
      }

      if (root === 'users') {
        sendUsersList(req, res);
        return;
      }
      break;
    }
    case 'POST': {
      if (root === 'users') {
        handleCreateUser(req, res);
        return;
      }
      break;
    }
    case 'PATCH': {
      if (root === 'users' && userId && hobbies) {
        handleUpdateHobbies(req, res, { id: userId });
        return;
      }

      if (root === 'users' && userId) {
        handleUpdateUser(req, res, { id: userId });
        return;
      }
      break;
    }
    case 'DELETE': {
      if (root === 'users' && userId) {
        handleDeleteUser(req, res, { id: userId });
        return;
      }
      break;
    }
    default: {
      handleMalformedRequest(res, { code: 500, message: 'Invalid request' });
    }
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
