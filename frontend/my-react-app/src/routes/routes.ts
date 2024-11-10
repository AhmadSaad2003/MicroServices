export const API_URL = "http://localhost:5000/api";

export const AUTH_ROUTES = {
  SIGNUP: `${API_URL}/auth/signup`,
  SIGNIN: `${API_URL}/auth/signin`,
};

export const DOC_ROUTES = {
  CREATE: `${API_URL}/documents/create`,
  SELECTALL: `${API_URL}/documents/getDocuments`,
  SELECTVERSIONS: `${API_URL}/versionControl/history/:documentId`,
  GETSINGLEDOCUMENT: `${API_URL}/documents/getDocById/:documentId`,
  REVERTVERSION: `${API_URL}/versionControl/revert`,
  SAVEEDITING: `${API_URL}/colaborativeEditing/edit/:documentId`
};
