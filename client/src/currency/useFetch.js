import {useEffect, useState} from "react";

const BASE_URL = 'http://localhost:3001/api'

export const useFetch = (path) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    setLoading(true)
    if (!path) return
    
    fetch(`${BASE_URL}${path}`)
      .then(res => res.json())
      .then(data => {
        const { error: errorMessage } = data
        if ( errorMessage ) {
          setError(errorMessage)
        }

        setData(data)
        setLoading(false)
      })

  }, [path])

  return { loading, data, error }
}
