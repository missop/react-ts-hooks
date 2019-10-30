// 如果useCallback依赖很多值，你的代码可能是这样的：useCallback(fn, [a, b, c, d, e]).
// 其实通过useRef Hook，可以让我们像Class组件一样保存一些‘实例变量’, React会保证useRef返回值的稳定性，我们可以在组件任何地方安全地引用ref。
import { useRef, useState, useCallback } from 'react'

function UseRefState(initialState) {
  const ins = useRef()

  //   初始化ins的值
  const [state, setState] = useState(() => {
    const value = typeof initialState === 'function' ? initialState() : initialState
    ins.current = value
    return value
  })

  //   设置ref值的方法
  const setValue = useCallback(value => {
    if (typeof value === 'function') {
      setState(prev => {
        const finalValue = value(prev)
        ins.current = finalValue
        return finalValue
      })
    } else {
      ins.current = value
      setState(value)
    }
  }, [])

  return [state, setValue, ins]
}
