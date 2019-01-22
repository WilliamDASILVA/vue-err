type HasGetter = (error: string) => boolean;

export class VueErr {
  private store: any;
  private vueHandler: any;

  constructor(store: any, Vue: any) {
    if (this) {
      this.store = store;
      this.vueHandler = new Vue({
        computed: {
          has: (): HasGetter => (error: string): boolean => this.store.getters["err/has"](error),
        },
      });

      this.init();
    }
  }

  public show(error: string): void {
    this.store.commit("err/SHOW", error);
  }

  public hide(error: string): void {
    this.store.commit("err/HIDE", error);
  }

  public has(error: string): boolean {
    return this.vueHandler.has(error);
  }

  private init(): void {
    this.store.registerModule("err", {
      state() {
        return {
          errors: [],
        };
      },
      getters: {
        "err/has": (state: any): HasGetter => (error: string): boolean => state.errors.includes(error),
      },
      mutations: {
        "err/SHOW"(state: any, error: string): void {
          const index: number = state.errors.findIndex((err: string) => err === error);
          if (index === -1) {
            state.errors.push(error);
          }
        },
        "err/HIDE"(state: any, error: string): void {
          const index = state.errors.findIndex((err: string) => err === error);
          if (index !== -1) {
            state.errors.splice(index, 1);
          }
        },
      },
    });
  }
}

export default {
  install(Vue: any) {
    Vue.prototype.$err = null;

    Vue.mixin({
      beforeCreate() {
        const { store, parent }: any = this.$options;
        const storeToUse = store || (parent && parent.$store);

        if (storeToUse && !Vue.prototype.$err) {
          Vue.prototype.$err = new VueErr(storeToUse, Vue);
        }
      },
    });
  },
};
