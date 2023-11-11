'use client'

import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import 'mapbox-gl/dist/mapbox-gl.css'

const markers: Marker[] = [
  {
    city: 'Sydney',
    country: 'Australia',
    latCoord: -33.8688,
    longCoord: 151.2093,
  },
  {
    city: 'Amsterdam',
    country: 'Netherlands',
    latCoord: 52.3676,
    longCoord: 4.9041,
  },
  {
    city: 'Seoul',
    country: 'South Korea',
    latCoord: 37.5665,
    longCoord: 126.978,
  },
]

const Map = ({ address }) => {
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

    map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    )

    const geojson = {
      type: 'Feature',
      features: markers.map((marker) => ({
        properties: {
          city: marker.city,
          country: marker.country,
          iconSize: [30, 42],
        },
        geometry: {
          type: 'Point',
          coordinates: {
            lat: marker.latCoord,
            lng: marker.longCoord,
          },
        },
      })),
    }
    map.current.on('load', () => {
      geojson.features.forEach((marker) => {
        // create a DOM element for the marker
        const markerIcon = document.createElement('div')
        markerIcon.className = 'location-marker'
        markerIcon.style.backgroundImage = 'url(/location_marker.png)'
        markerIcon.style.width = marker.properties.iconSize[0] + '.99px'
        markerIcon.style.height = marker.properties.iconSize[1] + 'px'

        new mapboxgl.Marker(markerIcon)
          .setLngLat(marker.geometry.coordinates) // add marker to map
          .setPopup(
            // add pop out to map
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<p>${marker.properties.city}, ${marker.properties.country}</p>`
            )
          )
          .addTo(map.current)
      })
    })
  }, [])

  return (
    <main>
      <div style={{ width: '400px', height: '300px' }} ref={mapContainer} />
    </main>
  )
}

export default Map
