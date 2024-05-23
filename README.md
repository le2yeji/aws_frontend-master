# Custom UI Project

현재 가칭으로 정식 명칭 확정 시 수정 예정

## Technologies

본 프로젝트에서 사용된 기술 목록은 아래와 같다.

- [Vue 3](https://vuejs.org)
- [Vite](https://vitejs.dev)
- [Quasar](https://quasar.dev)
- [Vue Router](https://router.vuejs.org)
- [Pinia](https://pinia.vuejs.org)
- [Typescript](https://www.typescriptlang.org)
- [Axios](https://axios-http.com)
- [VueUse](https://vueuse.org/)
- [Keycloak](https://keycloak.org/)
- [Cognito]
  
## Folder Structure

features based folder structure로 대부분의 업무 로직은 features 폴더의 각 기능 별 폴더에 위치하게 된다.

- components: 전체 애플리케이션에서 사용되는 모든 공유 컴포넌트
- composables: 모든 공유 가능한 컴포저블
- config: 애플리케이션 구성 파일
- features: 애플리케이션 기능들을 포괄하는 폴더로 대부분의 애플리케이션 코드가 여기에 속하게 된다.
- layouts: 페이지의 다양한 레이아웃
- lib: 애플리케이션에서 사용되는 다양한 서드파티 라이브러리의 구성
- pages: 전체 애플리케이션에서 사용되는 모든 공유 페이지
- services: 공유 애플리케이션 서비스 및 제공자
- stores: 전역 상태 스토어
- utils: 공유 유틸리티 함수
