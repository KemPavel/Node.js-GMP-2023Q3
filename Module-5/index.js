import url from 'url';
import http from 'http';
import { handleMalformedRequest } from './services/common-service.js';
import handleUsersRequest from './controllers/user-controller.js';


const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const regex = /(users)(?:\/(\d+))?(\/hobbies)?/;
  const parsedUrl = url.parse(req.url);
  const path = regex.exec(parsedUrl.pathname);

  if (path === null) {
    handleMalformedRequest(res, { code: 500, message: 'Invalid request' });
  }

  const [ , root, userId, hobbies ] = path;

  switch (root) {
    case 'users': {
      handleUsersRequest(req, res, userId, hobbies);
      break;
    }
    // case 'products': {
    //   handleProductsRequest(req, res, userId, hobbies);
    //   break;
    // }
    // case 'cart': {
    //   handleCartRequest(req, res, userId, hobbies);
    //   break;
    // }
    // case 'order': {
    //   handleOrderRequest(req, res, userId, hobbies);
    //   break;
    // }
    default: {
      handleMalformedRequest(res, { code: 500, message: 'Invalid request' });
    }
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
