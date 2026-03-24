'use client';
/**
 * components/map/AdminMapDrawer.tsx
 * Interactive polygon drawing tool for Admin Map Settings.
 * Allows admins to draw their village boundary directly on the satellite map.
 * MUST be loaded via dynamic import with { ssr: false }.
 */
import { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Polygon,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

// Fix default icon
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

type Coord = [number, number]; // [lng, lat] (GeoJSON orde)

interface Props {
  center: [number, number]; // [lat, lng] (Leaflet order)
  existingPolygon?: Coord[][] | null;
  onPolygonChange: (coords: Coord[][] | null) => void;
}

/** Activate Leaflet.draw controls inside the map */
function DrawControls({ featureGroupRef, onPolygonChange }: {
  featureGroupRef: React.RefObject<L.FeatureGroup>;
  onPolygonChange: (coords: Coord[][] | null) => void;
}) {
  const map = useMap();
  const drawRef = useRef<L.Control.Draw | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('leaflet-draw');

    if (!featureGroupRef.current) return;

    // Remove old controls if re-mounted
    if (drawRef.current) map.removeControl(drawRef.current);

    const drawControl = new (L.Control as any).Draw({
      edit: { featureGroup: featureGroupRef.current, remove: true },
      draw: {
        polygon: {
          shapeOptions: { color: '#1e3a5f', weight: 2, fillOpacity: 0.1 },
          showArea: true,
        },
        polyline: false,
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false,
      },
    });
    drawRef.current = drawControl;
    map.addControl(drawControl);

    // Helper — extract GeoJSON coords from all polygon layers
    function extractCoords(): Coord[][] | null {
      if (!featureGroupRef.current) return null;
      const layers: L.Layer[] = [];
      featureGroupRef.current.eachLayer(l => layers.push(l));
      if (layers.length === 0) return null;
      const poly = layers[layers.length - 1] as L.Polygon;
      const latlngs = poly.getLatLngs()[0] as L.LatLng[];
      const ring: Coord[] = latlngs.map(ll => [ll.lng, ll.lat]);
      // Close the ring
      ring.push(ring[0]);
      return [ring];
    }

    map.on(L.Draw.Event.CREATED, (e: any) => {
      featureGroupRef.current?.clearLayers();
      featureGroupRef.current?.addLayer(e.layer);
      onPolygonChange(extractCoords());
    });

    map.on(L.Draw.Event.EDITED, () => onPolygonChange(extractCoords()));
    map.on(L.Draw.Event.DELETED, () => {
      featureGroupRef.current?.clearLayers();
      onPolygonChange(null);
    });

    return () => {
      map.removeControl(drawControl);
      map.off(L.Draw.Event.CREATED);
      map.off(L.Draw.Event.EDITED);
      map.off(L.Draw.Event.DELETED);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return null;
}

/** Fly map to a new center whenever it changes */
function FlyTo({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => { map.flyTo(center, 14, { duration: 1.5 }); }, [center, map]);
  return null;
}

export default function AdminMapDrawer({ center, existingPolygon, onPolygonChange }: Props) {
  const featureGroupRef = useRef<L.FeatureGroup>(null!);

  // Convert existing GeoJSON [lng, lat] polygon → Leaflet [lat, lng]
  const leafletPositions: [number, number][] | undefined = existingPolygon?.[0]?.slice(0, -1).map(
    c => [c[1], c[0]]
  );

  return (
    <MapContainer
      center={center}
      zoom={14}
      style={{ height: '100%', width: '100%' }}
      zoomControl
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="© Esri, Maxar, Earthstar Geographics"
        maxZoom={20}
      />
      <FlyTo center={center} />

      <FeatureGroup ref={featureGroupRef}>
        <DrawControls featureGroupRef={featureGroupRef} onPolygonChange={onPolygonChange} />
        {leafletPositions && leafletPositions.length >= 3 && (
          <Polygon
            positions={leafletPositions}
            pathOptions={{ color: '#1e3a5f', weight: 2, dashArray: '6 4', fillOpacity: 0.1 }}
          />
        )}
      </FeatureGroup>
    </MapContainer>
  );
}
