import Image from 'next/image'
import { useState, useEffect } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Geocode from 'react-geocode'

export default function EventMap({ evt }) {
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [loading, setLoading] = useState(true)
    const [viewport, setViewport] = useState({
        latitude: 40.712772,
        longitude: -73.935242,
        width: '100%',
        height: '500px',
        zoom: 12
    })

    useEffect(() => {
        Geocode.fromAddress(evt.address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                setLat(lat)
                setLng(lng)
                setViewport({ ...viewport, latitude: lat, longitude: lng })
                setLoading(false)
            },
            (error) => {
                console.error(error);
            }
        )
    }, [])

    Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY)
    console.log(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY)
    if (loading) return false
    return (
        <ReactMapGL {...viewport} 
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onViewportChange={(vp) => setViewport(vp)}>
            <Marker key={evt.id} latitude={lat} longitude={lng}>
                <Image src='/images/pin.svg' width={30} height={30}/>
            </Marker>
        </ReactMapGL>
    )
}
