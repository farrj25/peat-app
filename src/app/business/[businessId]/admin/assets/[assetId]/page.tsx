'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function PumpDetailPage({ params }: { params: { assetId: string } }) {
  const router = useRouter();
  const businessId = typeof window !== 'undefined' ? window.location.pathname.split('/')[2] : '';
  const [assetId, setAssetId] = useState<string>('');

  useEffect(() => {
    (async () => {
      const routeParams = await params;
      setAssetId(routeParams.assetId);
    })();
  }, [params]);
  const [pump, setPump] = useState<any>(null);

  useEffect(() => {
    const fetchPump = async () => {
      const ref = doc(db, `businesses/${businessId}/pumps/${assetId}`);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) setPump(snapshot.data());
    };
    fetchPump();
  }, [businessId, assetId]);

  if (!pump) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Pump Details</h1>
      <ul className="space-y-1 mb-6">
        {Object.entries(pump).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {String(value)}</li>
        ))}
      </ul>

      {pump.gpsLat && pump.gpsLng && (
        <div className="mb-6">
          <p className="mb-2"><strong>GPS Location:</strong> {pump.gpsLat}, {pump.gpsLng}</p>
          <div className="h-64 w-full rounded overflow-hidden">
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
