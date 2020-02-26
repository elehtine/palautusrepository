import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('zero sets values to zero', () => {
    const state = {
      good: 5,
      ok: 10,
      bad: 2
    }
    const action = {
      type: 'ZERO'
    }
    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)
  })

  test('multiple actions', () => {
    let state = initialState
    state = counterReducer(state, { type: 'GOOD' })
    state = counterReducer(state, { type: 'OK' })
    state = counterReducer(state, { type: 'GOOD' })
    state = counterReducer(state, { type: 'BAD' })
    state = counterReducer(state, { type: 'BAD' })
    expect(state).toEqual({
      good: 2,
      ok: 1,
      bad: 2
    })
  })

})
