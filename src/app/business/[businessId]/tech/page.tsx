'use client';

import { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

export default function TechDashboardPage() {
  const [pumps, setPumps] = useState<any[]>([]);
  const router = useRouter();
  const businessId = typeof window !== 'undefined' ? window.location.pathname.split('/')[2] : '';

  useEffect(() => {
    const fetchPumps = async () => {
      const snapshot = await getDocs(collection(db, `businesses/${businessId}/pumps`));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPumps(data);
    };
    fetchPumps();
  }, [businessId]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const buttonStyle =
    'bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors w-full text-left';

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-6 shadow-md">
        <div className="mb-6 text-center">
          <button onClick={() => router.push(`/business/${businessId}/tech`)} className="w-full">
            <img
              src="/Byrom-petroleum-m.png"
              alt="Byrom Petroleum Logo"
              className="mx-auto h-16 object-contain hover:opacity-90 transition-opacity"
            />
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-6 text-center">Navigation</h2>
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleLogout}
            className={buttonStyle}
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Technician Dashboard</h1>
        <p className="mb-6">Read-only view of your assigned equipment. Click an asset to view details and add notes.</p>
        <ul className="space-y-2">
          {pumps.map((pump) => (
            <li
              key={pump.id}
              className="border p-4 hover:bg-gray-100 cursor-pointer rounded"
              onClick={() => router.push(`/business/${businessId}/tech/assets/${pump.id}`)}
            >
              <div className="font-semibold">Tank #{pump.tankNumber}</div>
              <div>{pump.pumpBrand} {pump.pumpModel}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
