import { BACKEND_URL } from '../constants/backend';
import { io } from 'socket.io-client';

const socket = io(BACKEND_URL);

export default socket;
