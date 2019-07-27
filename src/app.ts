
import * as http from 'http';
import * as debug from 'debug';
import Express from './config/express';

const port = process.env.PORT || 9000;
Express.set('port', port);

const server = http.createServer(Express);
server.listen(port);