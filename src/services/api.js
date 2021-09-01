import {
  getMultipleDocumentsBuilder,
  getSingleDocumentBuilder,
  getDocumentByIdBuilder,
} from '../utils/apiBuilders';

export const getEventById = getDocumentByIdBuilder('/events');
export const getWorkroomById = getDocumentByIdBuilder('/workrooms');
export const getNotificationById = getDocumentByIdBuilder('/notifications');
export const getWorkerById = getDocumentByIdBuilder('/workers');
export const getDepartmentById = getDocumentByIdBuilder('/departments');

export const getNotifications = getMultipleDocumentsBuilder('/notifications');
export const getEvents = getMultipleDocumentsBuilder('/events');
export const getDepartments = getMultipleDocumentsBuilder('/departments');
export const getWorkrooms = getMultipleDocumentsBuilder('/workrooms');
export const getTimetables = getMultipleDocumentsBuilder('/timetables');
export const getAnniversaryPosts = getMultipleDocumentsBuilder(
  '/anniversary-posts'
);

export const getFacultyStuff = getSingleDocumentBuilder('/faculty-stuff');
export const getFacultyContact = getSingleDocumentBuilder('/faculty-contact');
