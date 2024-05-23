import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

// yyazi
// import { useAuthStore } from '@features/keycloak/store/useAuthStore';
// import { serviceFactory } from '@features/keycloak/services/factory';
import store from '@features/cognito/store/index'; // Cognito 스토어 임포트

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  routes: routes,
});

/**
 * @param {Route} to - The route being navigated to.
 * @param {Route} from - The route being navigated from.
 * @param {Function} next - A function to invoke when the navigation is complete.
 */

// router.beforeEach(async (to, from, next) => {
//   // 해당 경로에 대한 인증이 필요한지 여부
//   const requiredAuth = to.meta.requiresAuth;

//   const authStore = useAuthStore();
//   const isAuthenticated = authStore.authenticated;
//   const keycloakService = serviceFactory(
//     import.meta.env.VITE_KEYCLOAK_ENABLED,
//     authStore,
//   );

//   console.log('Initial:', {
//     requiredAuth,
//     isAuthenticated,
//     token: authStore.user?.token,
//   });

//   // 토큰이 메모리에 있고 사용자가 인증되어 있는 경우
//   if (requiredAuth && !isAuthenticated) {
//     await keycloakService.login();
//     return next();
//   }
  
//   // 기존 if로 시작되는 분기문을 else if 로 변경
//   // 토큰이 메모리에 있고 사용자가 인증되어 있는 경우
//   else if (requiredAuth && authStore.user?.token) {
//     console.log('토큰이 있고 인증이 필요함', {
//       JWT: authStore.user?.token,
//     });
//     await keycloakService.login();
//     return next();
//   }

//   // 토큰이 없고 사용자가 인증되어 있는 경우 (사이트가 새로 고쳐짐)
//   else if (requiredAuth && isAuthenticated && !authStore.user?.token) {
//     console.log(
//       '사이트 다시로드 -> 토큰이 없지만 사용자가 인증됨 :: onRefreshToken ⚡',
//       { requiredAuth, isAuthenticated, token: authStore.user?.token },
//     );
//     await keycloakService.login();

//     if (!authStore.user?.token && isAuthenticated && requiredAuth) {
//       // 사용자가 Store에 제대로 배치됨
//       console.log('사용자 및 유효한 refresh를 얻음', {
//         refreshJWT: authStore.user?.token,
//       });
//       return next();
//     }
//     // 오류가 발생하고 사용자를 Store에 넣을 수 없음
//     console.error('유효한 refresh 및 사용자를 얻을 수 없습니다');
//     // keycloakService.logout(); // 사용자를 로그아웃함
//     return next();
//   }
//   // 사용자가 인증되어 있고 로그인으로 이동하려는 경우
//   else if (!requiredAuth && isAuthenticated) {
//     console.log('인증이 필요하지 않지만 이미 인증되어 있음');
//     // return next({ name: 'overview' });
//     return next();
//   }
//   // 보호된 경로에 들어가려고하면서 사용자가 인증되어 있지 않은 경우
//   else if (requiredAuth && !isAuthenticated) {
//     // keycloakService.logout(); // 사용자를 로그아웃함
//     // return next({ name: 'overview' });
//     return next();
//   } else {
//     console.log('유효성 검사를 위한 데이터가 없습니다');
//     // 뷰를 계속 진행
//     return next();
//   }
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated; // Cognito 인증 상태 접근

  // 인증이 필요하지 않은 페이지 목록
  const publicPages = ['SignIn', 'SignUp', 'ForgotPassword', 'Confirm'];

  // 현재 페이지가 인증이 필요하지 않은 페이지인지 확인
  const isPublicPage = publicPages.includes(to.name?.toString() || '');

  if (!isAuthenticated && !isPublicPage) {
    // 사용자가 로그인하지 않은 상태이고, 접근하려는 페이지가 공개 페이지가 아니면 로그인 페이지로 리다이렉트
    next({ name: 'SignIn' });
  } else if (isAuthenticated && to.name === 'SignIn') {
    // 사용자가 이미 로그인한 상태에서 로그인 페이지로 접근하려고 할 때 메인 페이지로 리다이렉트
    next({ name: 'PrimaryLayout' });
  } else {
    // 그 외의 경우 정상적으로 라우트 진행
    next();
  }
});

export default router;
