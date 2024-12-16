import React, { useEffect, useRef, useState } from 'react';
import { loadGoogleMapsApi } from '../utils/loadGoogleMapsApi';
import DeliveryForm from './DeliveryForm';

interface Destination {
  address: string;
  arrivalTime: string;
}

export default function DeliveryMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    loadGoogleMapsApi().then((google) => {
      const map = new google.maps.Map(mapRef.current!, {
        center: { lat: 35.6762, lng: 139.6503 },
        zoom: 10,
      });
      setMap(map);
      setDirectionsService(new google.maps.DirectionsService());
      setDirectionsRenderer(new google.maps.DirectionsRenderer({ map }));
    });
  }, []);

  const calculateRoute = async (destinations: Destination[]) => {
    if (!directionsService || !directionsRenderer) return;

    const waypoints = destinations.slice(1, -1).map(dest => ({
      location: dest.address,
      stopover: true
    }));

    const request: google.maps.DirectionsRequest = {
      origin: destinations[0].address,
      destination: destinations[destinations.length - 1].address,
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      }
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1" ref={mapRef} />
      <div className="p-4">
        <DeliveryForm onSubmit={calculateRoute} />
      </div>
    </div>
  );
}

