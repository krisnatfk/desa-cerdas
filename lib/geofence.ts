/**
 * lib/geofence.ts
 * Geofencing utilities that are dynamic:
 *  — If the admin has saved a boundary polygon → uses Point-in-Polygon (Turf.js)
 *  — Otherwise → falls back to Haversine radius check
 * The app_settings are fetched server-side via the /api/settings endpoint.
 */
import { booleanPointInPolygon } from '@turf/boolean-point-in-polygon';
import { point, polygon } from '@turf/helpers';

type Coord = [number, number]; // [lng, lat]

// Default center (Labuhan Maringgai)
export const DEFAULT_CENTER = { lat: -5.3428912, lng: 105.7938069 };
// Kept for backward compatibility
export const LABUHAN_MARINGGAI = DEFAULT_CENTER;

// Default placeholder polygon (abstrak, overridden by DB at runtime)
export const VILLAGE_POLYGON_COORDS: Coord[][] = [
  [
    [105.750, -5.310],
    [105.805, -5.320],
    [105.820, -5.350],
    [105.800, -5.365],
    [105.760, -5.355],
    [105.750, -5.310],
  ]
];

// ─── In-memory cache (invalidated when admin saves settings) ──
let _cachedSettings: AppSettings | null = null;

export interface AppSettings {
  village_name: string;
  district_name: string;
  city_name: string;
  province_name: string;
  center_lat: number;
  center_lng: number;
  boundary_geojson: Coord[][] | null;
  fallback_radius_m: number;
}

/** Fetch settings from local API (cached after first call) */
export async function fetchSettings(): Promise<AppSettings> {
  if (_cachedSettings) return _cachedSettings;
  try {
    const res = await fetch('/api/settings', { cache: 'no-store' });
    if (res.ok) {
      _cachedSettings = await res.json();
      return _cachedSettings!;
    }
  } catch { /* Silent fail — use defaults */ }
  return {
    village_name: 'Labuhan Maringgai',
    district_name: 'Labuhan Maringgai',
    city_name: 'Lampung Timur',
    province_name: 'Lampung',
    center_lat: DEFAULT_CENTER.lat,
    center_lng: DEFAULT_CENTER.lng,
    boundary_geojson: null,
    fallback_radius_m: 2500,
  };
}

/** Invalidate cache so map/forms pick up fresh settings after admin save */
export function invalidateSettingsCache() {
  _cachedSettings = null;
}

// ─── Haversine formula (fallback) ────────────────────────────
function getDistanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3;
  const p1 = (lat1 * Math.PI) / 180;
  const p2 = (lat2 * Math.PI) / 180;
  const dp = ((lat2 - lat1) * Math.PI) / 180;
  const dl = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Validate that a coordinate falls within the village boundary.
 * Uses Polygon (Point-in-Polygon) if `boundaryCoords` is provided,
 * otherwise uses Haversine radius check against `center` + `radius`.
 */
export function isWithinVillage(
  lat: number,
  lng: number,
  options?: {
    boundaryCoords?: Coord[][] | null;
    center?: { lat: number; lng: number };
    radiusM?: number;
  }
): boolean {
  const {
    boundaryCoords = VILLAGE_POLYGON_COORDS,
    center = DEFAULT_CENTER,
    radiusM = 2500,
  } = options ?? {};

  try {
    if (boundaryCoords && boundaryCoords.length > 0 && boundaryCoords[0].length >= 4) {
      const pt   = point([lng, lat]);
      const poly = polygon(boundaryCoords);
      return booleanPointInPolygon(pt, poly);
    }
    // Fallback: radius
    const dist = getDistanceInMeters(lat, lng, center.lat, center.lng);
    return dist <= radiusM;
  } catch (err) {
    console.error('Geofence error:', err);
    return false;
  }
}
