export const handleMalformedRequest = (res, { code, message }) => {
  res.statusCode = code;
  res.end(message);
};
