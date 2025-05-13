'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function PumpDetailsClient() {
  const { businessId, assetId } = useParams();
  const router = useRouter();
  const [pump, setPump] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    if (!businessId || !assetId) return;
    const fetchPump = async () => {
      const ref = doc(db, `businesses/${businessId}/pumps/${assetId}`);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) setPump(snapshot.data());
    };
    fetchPump();
  }, [businessId, assetId]);

  const handleEdit = () => {
    const query = new URLSearchParams({ edit: 'true', id: assetId as string }).toString();
    router.push(`/business/${businessId}/admin/addpump?${query}`);
  };

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this pump?');
    if (!confirmDelete) return;

    await deleteDoc(doc(db, `businesses/${businessId}/pumps/${assetId}`));
    router.push(`/business/${businessId}/admin`);
  };

  if (!pump) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded shadow text-gray-800">
      <h1 className="text-2xl font-bold mb-4 text-center">Pump Details</h1>

      <ul className="space-y-2 mb-6">
        {Object.entries(pump).map(([key, value]) => (
          <li key={key}>
            <strong className="capitalize">{key}:</strong> {String(value)}
          </li>
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

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        <button
          onClick={handleEdit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded shadow"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow"
        >
          Delete
        </button>
        <button
          onClick={() => router.back()}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded shadow"
        >
          Back
        </button>
      </div>
    </div>
  );
}
