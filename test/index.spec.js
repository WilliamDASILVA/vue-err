const Vuex = require('vuex')
const { shallowMount, createLocalVue } = require('@vue/test-utils')
const { VueErr } = require('./../dist')

describe('VueErr', () => {
  let err
  let localVue

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)

    store = new Vuex.Store({})
    err = new VueErr(store, localVue)
  })

  describe('show method', () => {
    it('should be defined', () => {
      expect(typeof err.show).toEqual("function")
    })

    it('should set a new error when called', () => {
      const res = err.show('some error')
      expect(res).toBeUndefined()
      expect(err.has('some error')).toBeTruthy()
    })
  })

  describe('hide method', () => {
    it('should be defined', () => {
      expect(typeof err.hide).toEqual("function")
    })

    it('should remove an error when called', () => {
      err.show('some hide error')
      const res = err.hide('some hide error')
      expect(res).toBeUndefined()
      expect(err.has('some hide error')).toBeFalsy()
    })
  })

  describe('has method', () => {
    it('should be defined', () => {
      expect(typeof err.has).toEqual("function")
    })

    it('should return true if there is an error', () => {
      err.show('my error')
      expect(err.has('my error')).toBeTruthy()
    })

    it('should return false if there is error associated with the name', () => {
      expect(err.has('another error')).toBeFalsy()
    })
  })
})
