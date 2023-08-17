export const REST_API_KEY = '1f22c8e4922a6c0d5b1fe2dac4455cb4';
export const SECRET_KEY = 'VQbNzZGpalkNOc23xwiPLcq3N5ENu1tO';
export const REDIRECT_URI = 'http://localhost:3000/oauth2/kakao';
export const LOGOUT_REDIRECT_URI = 'http://localhost:3000/social/logout';
export const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
export const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`