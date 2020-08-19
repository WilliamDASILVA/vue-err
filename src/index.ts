type HasGetter = (error: string) => boolean;

/**
 * @class VueErr
 */
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

  /**
   * Add the error in the currently visible errors stack.
   * @method show
   * @param {string} error - The error name to be shown
   * @returns {void}
   */
  public show(error: string): void {
    this.store.commit("err/SHOW", error);
  }

  /**
   * Remove the error in the currently visible errors stack.
   * @method hide
   * @param {string} error - The error name to be hidden
   * @returns {void}
   */
  public hide(error: string): void {
    this.store.commit("err/HIDE", error);
  }

  /**
   * Returns true if the error is present in the errors stack
   * @method has
   * @param {string} error
   * @returns {boolean} hasError
   */
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

    /**
     * Adds a global Vue mixin that will be called for every element
     * util the Vuex store is available.
     */
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
