import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
const pinia = createPinia();
pinia.use(piniaPluginPersistedState); // Use persisted state plugin with Pinia so our store data will persist across refreshes

import App from './App.vue';
const app = createApp(App);

import router from './router';

import { Quasar, AppFullscreen, Notify } from 'quasar';

import quasarLang from 'quasar/lang/ko-KR';

// import icon libraries
import '@quasar/extras/material-icons/material-icons.css';

// import quasar css
import '@quasar/extras/roboto-font/roboto-font.css';
import 'quasar/src/css/index.sass';

// yyazi 예지 코드 start
import store from '@features/cognito/store/index';
import BaseCard from '@features/cognito/components/BaseCard.vue';
import BaseSpinner from '@features/cognito/components/BaseSpinner.vue';
import BaseMessage from '@features/cognito/components/BaseMessage.vue';

app.use(store);
app.component('base-card', BaseCard);
app.component('base-spinner', BaseSpinner);
app.component('base-message', BaseMessage);

// yyazi 예지 코드 end

app.use(pinia);
app.use(router);
app.use(Quasar, {
  plugins: {
    AppFullscreen,
    Notify,
  }, // import Quasar plugins and add here
  lang: quasarLang,

  config: {
    dark: true,
    // brand: {
    // primary: '#5e64ff',
    // secondary: '#26A69A',
    // accent: '#9C27B0',
    // positive: '#21BA45',
    // negative: '#C10015',
    // info: '#31CCEC',
    // warning: '#F2C037',
    // dark: '#3A4049',
    // blue: '#42b0ff',
    // ... or all other brand colors
    // },
    //notify: {...}, // default set of options for Notify Quasar plugin
    //loading: {...}, // default set of options for Loading Quasar plugin
    //loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  },
});

// import datepicker
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

app.use(pinia);
app.use(router);
app.use(Quasar, {
  plugins: {
    AppFullscreen,
    Notify,
  }, // import Quasar plugins and add here
  lang: quasarLang,

  config: {
    dark: true,
    // brand: {
    // primary: '#5e64ff',
    // secondary: '#26A69A',
    // accent: '#9C27B0',
    // positive: '#21BA45',
    // negative: '#C10015',
    // info: '#31CCEC',
    // warning: '#F2C037',
    // dark: '#3A4049',
    // blue: '#42b0ff',
    // ... or all other brand colors
    // },
    //notify: {...}, // default set of options for Notify Quasar plugin
    //loading: {...}, // default set of options for Loading Quasar plugin
    //loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  },
});
app.component('VueDatePicker', VueDatePicker);

app.mount('#app');
