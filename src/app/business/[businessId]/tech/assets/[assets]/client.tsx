'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function TechAssetView() {
  const { businessId, assets } = useParams();
  const router = useRouter();
  const [pump, setPump] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    if (!businessId || !assets) return;
    const ref = doc(db, `businesses/${businessId}/pumps/${assets}`);
    getDoc(ref).then((snapshot) => {
      if (snapshot.exists()) {
        setPump(snapshot.data());
      }
    });
  }, [businessId, assets]);

  if (!pump) return <div className="p-6">Loading asset details...</div>;

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-xl font-bold mb-4">Pump Information</h1>
      <ul className="space-y-1 mb-6">
        {Object.entries(pump).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {String(value)}</li>
        ))}
      </ul>

      {pump.gpsLat && pump.gpsLng && (
        <div className="mb-6">
          <p className="mb-2"><strong>GPS:</strong> {pump.gpsLat}, {pump.gpsLng}</p>
          <div className="h-64 w-full">
            <Map markers={[{ lat: pump.gpsLat, lng: pump.gpsLng }]} />
          </div>
        </div>
      )}

      <button
        onClick={() => router.back()}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Back
      </button>
    </div>
  );
}
