import { Loader } from '@googlemaps/js-api-loader';

let googleMapsPromise: Promise<typeof google> | null = null;

export function loadGoogleMapsApi(): Promise<typeof google> {
  if (!googleMapsPromise) {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: 'weekly',
      libraries: ['places']
    });
    googleMapsPromise = loader.load();
  }
  return googleMapsPromise;
}

