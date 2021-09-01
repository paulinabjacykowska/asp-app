import { BACKEND_URL } from '../constants/backend';
import defaultAxios from 'axios';

export const axios = defaultAxios.create({ baseURL: BACKEND_URL });
