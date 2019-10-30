// 基于以下用法设计
/* const initialState = {name: 'sx', age: 10}
const MyComp: FC = props => {
  const [state, setState] = useState(initialState)
  const handleIncrementAge = useCallback(() => {
    // setState方法支持接收一个函数，通过这个函数可以获取最新的state值
    // 然后使用...操作符实现对象浅拷贝
    setState((prevState) => ({...preState, age: prevState.age + 1}) )
  }, [])
  // ...
} */
import { useCallback, useState } from 'react'

// 先定义参数类型
// 再定义返回值类型，要与useState一致的话那么就需要返回一个数组
export default function useSetState<S extends object = object>(initialState: S | (() => S)): [S, (state: Partial<S> | ((state: S) => Partial<S>)) => void] {
  const [_state, _setState] = useState<S>(initialState)

  const setState = useCallback((state: Partial<S> | ((state: S) => Partial<S>)) => {
    _setState((prev: S) => {
      let nextState = state
      if (typeof state === 'function') {
        nextState = state(prev)
      }

      return { ...prev, ...nextState }
    })
  }, [])
  return [_state, setState]
}
