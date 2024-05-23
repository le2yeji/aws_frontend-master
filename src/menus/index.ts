import {
  symRoundedAltRoute,
  symRoundedApps,
  symRoundedDashboard,
  symRoundedDatabase,
  symRoundedGridView,
  symRoundedHub,
} from '@quasar/extras/material-symbols-rounded';

const primaryMenus = [
  {
    title: '360 View',
    icon: symRoundedDashboard,
    to: '/customer',
    isSeperator: true,
  },
  {
    title: '기본정보',
    icon: symRoundedDashboard,
    to: '/baseinfo',
  },
  {
    title: '유선전화',
    icon: symRoundedHub,
    to: '/ppon',
    isSeperator: false,
  },
  {
    title: '지능망',
    icon: symRoundedAltRoute,
    to: '/gateway',
    isSeperator: false,
  },
  {
    title: '유선공통',
    icon: symRoundedApps,
    to: '/wireline',
    isSeperator: false,
  },/*
  {
    title: 'Databases',
    icon: symRoundedDatabase,
    to: '/databases',
    isSeperator: true,
  },*/
];

export { primaryMenus };
