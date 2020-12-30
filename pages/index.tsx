import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

export default function Home() {
  const Map = React.useMemo(
    () =>
      dynamic(
        () => import("@/components/Map"), // replace '@components/map' with your component's location
        {
          loading: () => <p>A map is loading</p>,
          ssr: false, // This line is important. It's what prevents server-side render
        }
      ),
    [
      /* list variables which should trigger a re-render here */
    ]
  );

  return (
    <>
      <Head>
        <title>Leaflet Map POC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen">
        <Map />
      </main>
    </>
  );
}
