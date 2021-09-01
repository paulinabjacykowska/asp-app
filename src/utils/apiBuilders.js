import { axios } from '../services/axios';

export const getSingleDocumentBuilder = route => ({ locale }) =>
  axios
    .get(route, {
      params: { _locale: locale },
    })
    .then(response => response.data);

export const getDocumentByIdBuilder = route => (docId, { locale }) =>
  axios
    .get(`${route}/${docId}`, {
      params: { _locale: locale },
    })
    .then(response => response.data);

export const getMultipleDocumentsBuilder = route => ({
  start,
  limit,
  locale,
}) =>
  axios
    .get(route, {
      params: {
        _start: start,
        _limit: limit,
        _sort: 'published_at:DESC',
        _locale: locale,
      },
    })
    .then(response => response.data);
