// lib/cors.js

import Cors from 'cors';
import initMiddleware from './init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests from the specified origin
    origin: 'http://localhost:3000',
    credentials: true, // Access-Control-Allow-Credentials
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

export default cors;
