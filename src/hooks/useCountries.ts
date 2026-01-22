import { useEffect, useState } from 'react'

export function useCountries() {
  const [countries, setCountries] = useState({ features: [] })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(data => {
        setCountries(data)
        setIsLoading(false)
      })
  }, [])

  return { countries, isLoading }
}
