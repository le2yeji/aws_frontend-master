import { defineStore } from 'pinia';

export type UseAuthStoreReturnType = ReturnType<typeof useAuthStore>;

interface EduUserProfile {
  username: string;
  family_name: string;
  refToken: string;
  token: string;
  roles: string[];
}

export type UserStore = {
  user: EduUserProfile | null;
  errorMsg: string;
};

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: (): UserStore => ({
    user: null,
    errorMsg: '',
  }),
  getters: {
    authenticated(): boolean {
      return !!this.user?.token;
    },
  },
  actions: {
    // addRole(role: string): void {
    //   this.user?.roles?.push(role);
    // },
  },
});
