import express from 'express'
import http from 'http'

import { Server } from 'socket.io'
import { sushiGameSocket } from './socket/socket'
import config from './config/config';
import { createAdapter } from '@socket.io/redis-adapter';
import MysqlDataSource from './connection/conn';
import { deleteStatusUser } from './helpers/redis';
var cors = require('cors')

const app = express();
const server = http.createServer(app);
// app.use(express.static('src'))

// app.use('/', cors({ origin: '*' }))

deleteStatusUser()
const io = new Server(server);
MysqlDataSource.initialize()
export const snowboardHero = io.of('/snowboard-hero')
sushiGameSocket(snowboardHero)

server.listen(3000, () => {
  console.log('listening on *:3000');
});

// (async () => {
  // try {

  // } catch (error) {
  //   console.log(error)
  // }
// })()