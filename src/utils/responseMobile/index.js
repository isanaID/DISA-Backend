const responseCode = require('./responseCode');

module.exports = {

  successResponse: (data = {}) => ({
    headers: data.headers || { 'Content-Type': 'application/json' },
    statusCode: data.statusCode || responseCode.success,
    data: {
      code : responseCode.success,
      status: 'SUCCESS',
      message: data.message || 'Your request is successfully executed',
      data: data.data|| {},
      error_code: null,
      errors: {}
    },
  }),

  notFoundResponse: (data = {}) => ({
    headers: data.headers || { 'Content-Type': 'application/json' },
    statusCode: data.statusCode || responseCode.notFound,
    data: {
      code : responseCode.notFound,
      status: false,
      message: data.message || 'uppss data not found',
      data: data.data || {},
      error_code: null,
      errors: {}
    },
  }),

  errorValidateResponse: (data = {}) => ({
    headers: data.headers || { 'Content-Type': 'application/json' },
    statusCode: data.statusCode || responseCode.validationError,
    data: {
      code : responseCode.validationError,
      status: false,
      message: data.message || 'uppss validation error',
      data: null || {},
      error_code: null,
      errors: data.data
    },
  }),

  errorServiceResponse: (data = {}) => ({
    headers: data.headers || { 'Content-Type': 'application/json' },
    statusCode: data.statusCode || responseCode.internalServerError,
    data: {
      code : responseCode.internalServerError,
      status: false,
      message: data.message || 'Internal Server Error',
      data: null || {},
      error_code: responseCode.internalServerError,
      errors: data.errors
    },
  }),

  failureResponse: (data = {}) => ({
    headers: data.headers || { 'Content-Type': 'application/json' },
    statusCode: data.statusCode || responseCode.internalServerError,
    data: {
      code : responseCode.internalServerError,
      status: false,
      message: data.message || 'Internal Server Error',
      data: null || {},
      error_code: responseCode.internalServerError,
      errors: data.errors
    },
  }),

  errorAuthNotFound: (data = {}) => ({
    headers: data.headers || { 'Content-Type': 'application/json' },
    statusCode: data.statusCode || responseCode.authNotFound,
    data: {
      code : responseCode.authNotFound,
      status: false,
      message: data.message || 'auth not found or token not found',
      data: null || {},
      error_code: responseCode.authNotFound,
      errors: data.errors
    },
  }),
  
  errorUnauthorized: (data = {}) => ({
    headers: data.headers || { 'Content-Type': 'application/json' },
    statusCode: data.statusCode || responseCode.unAuthorizedRequest,
    data: {
      code : responseCode.unAuthorizedRequest,
      status: false,
      message: data.message || 'not have access or token not falid',
      data: null || {},
      error_code: responseCode.authNotFound,
      errors: data.errors
    },
  }),


};
