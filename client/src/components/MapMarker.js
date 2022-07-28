import React from "react";
import "./MapMarker.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { breakAddr } from "../helpers/utils";
// source: Jim's MapsAndGeo Demo

const L = window.L;

function MarkerMap(props) {
  // By default Leaflet only comes with blue markers. We want green too!
  // https://github.com/pointhi/leaflet-color-markers
  let greenMarker = new L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    nameAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div>
      <MapContainer
        className="MarkerMap"
        center={props.home}
        zoom={props.zoom}
        scrollWheelZoom={false}
      >
        {/* Create the tile layer that shows the map */}
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Draw the green "YOU ARE HERE" marker */}
        {props.home && (
          <Marker position={props.home} icon={greenMarker}>
            <Popup>YOU ARE HERE</Popup>
          </Marker>
        )}

        {/* Draw a blue marker for each of the places passed as prop */}
        {props.places &&
          props.places.map((p) => (
            <Marker key={p.input_address} position={p.latLng}>
              <Popup>{breakAddr(p.formatted_address)}</Popup>{" "}
              {/* the breakAddr function is just setting the address in a nice way for the popup, instead of a long string. */}
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

export default MarkerMap;
