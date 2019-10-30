import React, { useReducer, useEffect } from 'react'
import useSetState from '../components/useSetState'
import useForceUpdate from '../components/useForceUpdate'

export function UseSetState() {
  const [state, setState] = useSetState<{ name: string; age: number }>({ name: 'sx', age: 1 })

  const incrementAge = () => {
    setState(prev => ({ age: prev.age + 1 }))
  }

  return (
    <div onClick={incrementAge}>
      {state.name}: {state.age}
    </div>
  )
}

// 定义初始状态
const initialState = { count: 0 }
type State = typeof initialState
interface Action {
  type: string
}

// 定义reducer
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'increment': {
      return { count: state.count + 1 }
    }

    case 'decrement': {
      return { count: state.count - 1 }
    }

    default: {
      throw new Error('params error')
    }
  }
}

export function UseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  )
}

export function UseForceUpdate() {
  const forceUpdate = useForceUpdate()
  useEffect(() => {
    ;(forceUpdate => {
      console.log(forceUpdate)
    })(forceUpdate)
  }, [])
}


