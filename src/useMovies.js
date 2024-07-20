import { useEffect, useState } from 'react'

const key = 'a0642867'

export function useMovies(query) {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(
    function () {
      const controller = new AbortController()
      async function fetchMovies() {
        try {
          setIsLoading(true)
          setError('')

          const response = await fetch(
            `http://www.omdbapi.com/?s=${query}&apikey=${key}`,
            { signal: controller.signal }
          )

          if (!response.ok)
            throw new Error("something wen't wrong with fetching movies")

          const data = await response.json()
          if (data.Response === 'False') throw new Error('no movie found')

          setMovies(data.Search)
          setIsLoading(false)
          setError('')
        } catch (error) {
          if (error.name !== 'AbortError') setError(error.message)
        } finally {
          setIsLoading(false)
        }
      }
      if (query.length < 3) {
        setMovies([])
        setError([])
        return
      }
      fetchMovies()

      return function () {
        controller.abort()
      }
    },
    [query]
  )

  return { movies, isLoading, error }
}
