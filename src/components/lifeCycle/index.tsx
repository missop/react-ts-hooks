import { useEffect, useRef } from 'react'

// 模拟componentDidMount
export function useOnMount(fn: Function) {
  useEffect(() => {
    fn()
  }, [])
}

// 如果需要在挂载/状态更新时请求一些资源、并且需要在卸载时释放这些资源，还是推荐使用useEffect，因为这些逻辑最好放在一起, 方便维护和理解:
// 但是useEffect传入的函数不支持async/await(返回Promise)
function Comp(props) {
  useEffect(() => {
    // 请求资源
    const subscription = props.source.subscribe()

    // 释放资源
    return () => {
      subscription.unsubscribe()
    }
  }, [])
}

// 模拟componentWillUnmount
export function useOnUnMount(fn: Function) {
  useEffect(() => {
    return () => {
      fn()
    }
  }, [])
}

// 模拟componentDidUpdate
export function useOnUpdate(fn: () => void, dep?: any[]) {
  const ref = useRef({ fn, mounted: false })
  ref.current.fn = fn

  useEffect(() => {
    //   首次渲染不执行
    if (!ref.current.mounted) {
      ref.current.mounted = true
    } else {
      ref.current.fn()
    }
  }, dep)
}
