'use client'

import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import 'mapbox-gl/dist/mapbox-gl.css'

const Map = ({ locations = [] }) => {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 10,
  })

  const mapContainer = useRef<any>(null)
  const map = useRef<mapboxgl.Map | any>(null)

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? ''
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [269.934, 29.990188], // center map on Chad
      zoom: 10.8,
    })

    const geojson = {
      type: 'FeatureCollection',
      features: locations.map((location) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
        },
        properties: {
          title: location.name,
          description: location.address1,
        },
      })),
    }

    map.current.on('load', () => {
      locations.forEach(async (location) => {
        await handleCoordinates(location.address1)
        // Use the Mapbox GL Geocoder to geocode addresses
      })
    })
  }, [locations])

  const handleCoordinates = async (address) => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      showSearchButton: false, // Set to false to hide the search box
    })

    map.current.addControl(geocoder)

    await geocoder.query(address, (result) => {
      if (result && result.features && result.features.length > 0) {
        const coordinates = result.features[0].geometry.coordinates
        const markerIcon = document.createElement('div')
        markerIcon.className = 'location-marker'
        markerIcon.style.backgroundImage = 'url(/location_marker.png)'
        markerIcon.style.width = '80px'
        markerIcon.style.height = '80px'
        // Create a marker for each location
        new mapboxgl.Marker(markerIcon).setLngLat(coordinates).addTo(map.current)
      }
    })
  }

  return (
    <>
      <div style={{ width: '400px', height: '300px' }} ref={mapContainer} />
    </>
  )
}

export default Map
