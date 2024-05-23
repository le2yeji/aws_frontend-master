import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { VITE_CLUSTER_LIST } from '@/config/environment';
const defaultCluster = VITE_CLUSTER_LIST.split(',')?.at(0) || 'cz-dev';
console.log('defaultCluster: ', defaultCluster);

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    menuMini: useLocalStorage(
      'menu-mini',
      (localStorage.getItem('menu-mini') || 'false') === 'false',
    ),
    menuAutoExpand: useLocalStorage(
      'menu-auto-expand',
      (localStorage.getItem('menu-auto-expand') || 'false') === 'false',
    ),
    darkMode: useLocalStorage(
      'dark-mode',
      (localStorage.getItem('dark-mode') || 'true') === 'true',
    ),
    clusterAlias: useLocalStorage(
      'cluster-alias',
      localStorage.getItem('cluster-alias') || defaultCluster,
    ),
  }),
  getters: {
    // isAutoMode: (state) => state.darkMode === 'auto',
  },
  actions: {
    setClusterAlias(alias: string) {
      this.clusterAlias = alias;
    },
  },
});
