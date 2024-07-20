import { useEffect } from 'react'

export function useKey(key, action) {
  useEffect(
    function () {
      function calback(event) {
        if (event.code.toLowerCase() === key.toLowerCase()) action()
      }
      document.addEventListener('keydown', calback)

      return function () {
        document.removeEventListener('keydown', calback)
      }
    },
    [key, action]
  )
}
