import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import * as data from "@/data/data.json";
import { useRef, useState } from "react";
import { LatLngExpression, LatLng } from "leaflet";

const defaultCenter: LatLngExpression = new LatLng(data.center[0], data.center[1]);

export default function Map() {
  const [markers, setMarkers] = useState(data.markers);
  const [center, setCenter] = useState(defaultCenter);
  const [modal, setModal] = useState(false);
  const textRef = useRef(null);
  const latRef = useRef(null);
  const longRef = useRef(null);

  return (
    <div className="relative h-screen">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="h-full z-0">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((m, i) => {
          const pos: LatLngExpression = new LatLng(m.pos[0], m.pos[1]);
          return (
            <Marker position={pos} key={i}>
              <Popup>{m.text}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <button
        className="rounded-full h-12 w-12 flex items-center justify-center absolute bottom-4 right-4 z-10 bg-gray-500 text-white font-sans font-bold text-lg"
        onClick={() => setModal(true)}
      >
        +
      </button>
      {modal && (
        <div className="fixed z-20 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col">
                  <div className="flex items-center justify-center h-12 rounded-full bg-indigo-100 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-indigo-500 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Nuevo Punto
                    </h3>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="mt-2">
                      <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 text-left">
                        Latitud
                      </label>
                      <input
                        type="text"
                        name="latitude"
                        id="latitude"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md border-2 px-4 py-2"
                        ref={latRef}
                      />
                    </div>
                    <div className="mt-2">
                      <label htmlFor="long" className="block text-sm font-medium text-gray-700 text-left">
                        Longitud
                      </label>
                      <input
                        type="text"
                        name="long"
                        id="long"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md border-2 px-4 py-2"
                        ref={longRef}
                      />
                    </div>
                    <div className="mt-2">
                      <label htmlFor="text" className="block text-sm font-medium text-gray-700 text-left">
                        Texto
                      </label>
                      <input
                        type="text"
                        name="text"
                        id="text"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md border-2 px-4 py-2"
                        ref={textRef}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row justify-between">
                <button
                  type="button"
                  className="flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setModal(false)}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="flex justify-center rounded-md border bg-indigo-500 shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-white hover:text-indigo-500 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    const marker = {
                      text: textRef.current.value,
                      pos: [latRef.current.value, longRef.current.value],
                    };

                    setMarkers([marker, ...markers]);
                    setModal(false);
                  }}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
