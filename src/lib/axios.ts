import axios from 'axios';
import { useAuthStore } from '@/features/keycloak/store/useAuthStore';

import {v4 as uuidv4} from 'uuid';

const CommonHeader = {
    appName : 'NBSS_ORD',
    svcName : 'svcName',
    fnName : 'fnName',
    fnCd : '',
//    globalNo : `${uuidv4()}`,
    globalNo : `${getGlobalNo('10142808')}`,
    chnlType : 'UI',
    envrFlag : 'envrFlag',
    trFlag : 'T',
    trDate : 'trDate',
    trTime : 'trTime',
    clntIp : '127.0.0.1',
    responseType : 'S',
    responseCode : '테스트',
    userId : '10142808',
    realUserId : '10142808',
    filler : 'E'
};
let modifiedCommonHeader: any;

// 한글처리
function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded Unicode,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
          return String.fromCharCode('0x' + p1);
  }));
}

function getGlobalNo(user_id) {
  //let sGlobalNo = this.getUserId() + new Date().toISOString().replace(/[-T:\.Z]/g, '');
  let sGlobalNo = user_id + new Date().toISOString().replace(/[-T:\.Z]/g, '');
  // global No 중복 발생하여 랜덤 숫자 추가
  let random = Math.floor(Math.random() * 999999);
  sGlobalNo = `${sGlobalNo}${random.toString().padStart(6, '0')}`;
  // global No 중복 발생하여 랜덤 숫자 추가
  let globalNo = sGlobalNo.padStart(32, '0');
  return globalNo;
}

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // CommonHeader 처리
    if (config.params) {//} && config.params.fnName) {
      modifiedCommonHeader = {
        ...CommonHeader,
        svcName: config.params.svcName,
        fnName: config.params.fnName,
      }

      console.log("modified header",modifiedCommonHeader)
    }

    // Auth 처리
    const authStore = useAuthStore();
    const token = authStore.user?.token;
    if (token) {
      //
      config.headers.Authorization = `Bearer ${token}`;
      //return { Authorization: `Bearer ${user.token}`,
      config.headers['commonHeader'] = b64EncodeUnicode(JSON.stringify(modifiedCommonHeader));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

function authHeader() {
  // return auth header with jwt if user is logged in and request is to the api url
  const { user } = useAuthStore();
  const isLoggedIn = !!user?.token;
  console.log('isLoggedIn', isLoggedIn);
  //const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
  //if (isLoggedIn && isApiUrl) {
  
  if (isLoggedIn) {
    return { Authorization: `Bearer ${user.token}`,
    'commonHeader' : JSON.stringify(CommonHeader)
     };
  } else {
    return {};
  }
}

export { axiosInstance };
