'use client';

import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

export default function AdminMapPage() {
  const router = useRouter();
  const businessId = typeof window !== 'undefined' ? window.location.pathname.split('/')[2] : '';
  const [locations, setLocations] = useState<{ lat: number; lng: number }[]>([]);

  const fetchPumpLocations = async () => {
    const snapshot = await getDocs(collection(db, `businesses/${businessId}/pumps`));
    const data = snapshot.docs.map(doc => doc.data());
    const gps = data
      .filter(pump => pump.gpsLat && pump.gpsLng)
      .map(pump => ({ lat: pump.gpsLat, lng: pump.gpsLng }));
    setLocations(gps);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const buttonStyle =
    'bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors w-full text-left';

  useEffect(() => {
    fetchPumpLocations();
  }, [businessId]);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-6 shadow-md">
        <div className="mb-6 text-center">
          <button onClick={() => router.push(`/business/${businessId}/admin`)} className="w-full">
            <img
              src="/Byrom-petroleum-m.png"
              alt="Byrom Petroleum Logo"
              className="mx-auto h-16 object-contain hover:opacity-90 transition-opacity"
            />
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-6 text-center">Navigation</h2>
        <div className="flex flex-col space-y-4">
          <button onClick={() => router.push(`/business/${businessId}/admin`)} className={buttonStyle}>
            Back to Dashboard
          </button>
          <button onClick={handleLogout} className={buttonStyle}>
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Tank GPS Map</h1>
        {locations.length > 0 ? (
          <div className="h-[500px]">
            <Map markers={locations} />
          </div>
        ) : (
          <p>No tanks with GPS coordinates found.</p>
        )}
      </main>
    </div>
  );
}
