import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function LiveTruckMap({
  routePoints,
  truckPos,
  startPoint,
  endPoint,
  status = "in_transit",
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const truckMarkerRef = useRef(null);
  const startMarkerRef = useRef(null);
  const endMarkerRef = useRef(null);
  const hasFitBoundsRef = useRef(false);

  // ─────────────────────────────────────────────────────────────
  // Create map only once
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [73.8567, 18.5204], // Pune
      zoom: 9,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");
  }, []);

  // ─────────────────────────────────────────────────────────────
  // Draw route layers + start/end markers
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !routePoints?.length) return;

    // Convert [lat, lng] -> [lng, lat]
    const fullRouteCoords = routePoints.map(([lat, lng]) => [lng, lat]);

    // Find truck position index inside route
    const truckIdx = routePoints.findIndex(
      (p) => p[0] === truckPos?.[0] && p[1] === truckPos?.[1]
    );

    // fallback
    const splitIdx = truckIdx === -1 ? 0 : truckIdx;

    // Completed route = from start till truck
    const completedCoords = routePoints
      .slice(0, splitIdx + 1)
      .map(([lat, lng]) => [lng, lat]);

    const updateRouteLayer = (sourceId, layerId, coords, color, width, opacity = 1) => {
      const geojson = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coords,
        },
      };

      if (map.getSource(sourceId)) {
        map.getSource(sourceId).setData(geojson);
      } else {
        map.addSource(sourceId, {
          type: "geojson",
          data: geojson,
        });

        map.addLayer({
          id: layerId,
          type: "line",
          source: sourceId,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": color,
            "line-width": width,
            "line-opacity": opacity,
          },
        });
      }
    };

    const renderRoute = () => {
      // 1) FULL ROUTE (background route)
      updateRouteLayer(
        "route-full-source",
        "route-full-layer",
        fullRouteCoords,
        "#9ca3af", // gray
        5,
        0.7
      );

      // 2) COMPLETED ROUTE (highlight route)
      updateRouteLayer(
        "route-completed-source",
        "route-completed-layer",
        completedCoords,
        "#2563eb", // blue
        7,
        1
      );
    };

    if (map.isStyleLoaded()) {
      renderRoute();
    } else {
      map.once("style.load", renderRoute);
    }

    // ─────────────────────────────────────────────────────────────
    // Start marker
    // ─────────────────────────────────────────────────────────────
    if (startPoint) {
      if (startMarkerRef.current) startMarkerRef.current.remove();

      const el = document.createElement("div");
      el.innerHTML = "🏭";
      el.style.fontSize = "28px";

      startMarkerRef.current = new mapboxgl.Marker(el)
        .setLngLat([startPoint[1], startPoint[0]])
        .setPopup(new mapboxgl.Popup().setHTML("<b>Warehouse</b>"))
        .addTo(map);
    }

    // ─────────────────────────────────────────────────────────────
    // End marker
    // ─────────────────────────────────────────────────────────────
    if (endPoint) {
      if (endMarkerRef.current) endMarkerRef.current.remove();

      const el = document.createElement("div");
      el.innerHTML = "🛍️";
      el.style.fontSize = "28px";

      endMarkerRef.current = new mapboxgl.Marker(el)
        .setLngLat([endPoint[1], endPoint[0]])
        .setPopup(new mapboxgl.Popup().setHTML("<b>Destination Store</b>"))
        .addTo(map);
    }

    // ─────────────────────────────────────────────────────────────
    // Fit route only once
    // ─────────────────────────────────────────────────────────────
    if (!hasFitBoundsRef.current) {
      const bounds = new mapboxgl.LngLatBounds();
      routePoints.forEach(([lat, lng]) => bounds.extend([lng, lat]));
      map.fitBounds(bounds, { padding: 80, duration: 1000 });
      hasFitBoundsRef.current = true;
    }
  }, [routePoints, truckPos, startPoint, endPoint]);

  // ─────────────────────────────────────────────────────────────
  // Update truck marker only
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !truckPos) return;

    if (!truckMarkerRef.current) {
      const truckEl = document.createElement("div");
      truckEl.innerHTML = "🚛";
      truckEl.style.fontSize = "32px";
      truckEl.style.filter = "drop-shadow(0 0 8px rgba(37,99,235,0.8))";

      truckMarkerRef.current = new mapboxgl.Marker(truckEl)
        .setLngLat([truckPos[1], truckPos[0]])
        .setPopup(new mapboxgl.Popup().setHTML(`<b>Truck Status:</b> ${status}`))
        .addTo(map);
    } else {
      truckMarkerRef.current.setLngLat([truckPos[1], truckPos[0]]);
    }
  }, [truckPos, status]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}