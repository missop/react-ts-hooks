import { useState, useCallback } from 'react'

export function useOnChange(initialValue) {
  const [value, setValue] = useState(initialValue)
  const onChange = useCallback(e => {
    setValue(e.target.value)
  }, [])
  return {
    value,
    setValue,
    onChange,
    // 绑定到原生事件
    bindEvent: {
      onChange,
      value
    },
    // 绑定到自定义组件
    bind: {
      onChange: setValue,
      value
    }
  }
}
