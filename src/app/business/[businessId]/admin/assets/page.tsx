'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, auth } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function AdminAssetListPage() {
  const router = useRouter();
  const businessId = typeof window !== 'undefined' ? window.location.pathname.split('/')[2] : '';
  const [pumps, setPumps] = useState<any[]>([]);

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
        <h1 className="text-2xl font-bold mb-6">Pump / Asset Inventory</h1>
        <ul className="space-y-2">
          {pumps.map((pump) => (
            <li
              key={pump.id}
              className="border p-4 hover:bg-gray-100 cursor-pointer rounded"
              onClick={() => router.push(`/business/${businessId}/admin/assets/${pump.id}`)}
            >
              Tank #{pump.tankNumber} – {pump.pumpBrand} {pump.pumpModel}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
