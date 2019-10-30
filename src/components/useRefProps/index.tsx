import { useRef } from 'react'
export default function useRefProps<T>(props: T) {
  const ins = useRef<T>(props)

  ins.current = props

  return ins
}
