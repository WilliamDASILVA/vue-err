"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VueErr = (function () {
    function VueErr(store, Vue) {
        var _this = this;
        if (this) {
            this.store = store;
            this.vueHandler = new Vue({
                computed: {
                    has: function () { return function (error) { return _this.store.getters["err/has"](error); }; },
                },
            });
            this.init();
        }
    }
    VueErr.prototype.show = function (error) {
        this.store.commit("err/SHOW", error);
    };
    VueErr.prototype.hide = function (error) {
        this.store.commit("err/HIDE", error);
    };
    VueErr.prototype.has = function (error) {
        return this.vueHandler.has(error);
    };
    VueErr.prototype.init = function () {
        this.store.registerModule("err", {
            state: function () {
                return {
                    errors: [],
                };
            },
            getters: {
                "err/has": function (state) { return function (error) { return state.errors.includes(error); }; },
            },
            mutations: {
                "err/SHOW": function (state, error) {
                    var index = state.errors.findIndex(function (err) { return err === error; });
                    if (index === -1) {
                        state.errors.push(error);
                    }
                },
                "err/HIDE": function (state, error) {
                    var index = state.errors.findIndex(function (err) { return err === error; });
                    if (index !== -1) {
                        state.errors.splice(index, 1);
                    }
                },
            },
        });
    };
    return VueErr;
}());
exports.VueErr = VueErr;
exports.default = {
    install: function (Vue) {
        Vue.prototype.$err = null;
        Vue.mixin({
            beforeCreate: function () {
                var _a = this.$options, store = _a.store, parent = _a.parent;
                var storeToUse = store || (parent && parent.$store);
                if (storeToUse && !Vue.prototype.$err) {
                    Vue.prototype.$err = new VueErr(storeToUse, Vue);
                }
            },
        });
    },
};
//# sourceMappingURL=index.js.map