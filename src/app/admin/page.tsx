'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export default function MasterAdminPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const router = useRouter();

  const fetchBusinesses = async () => {
    const snapshot = await getDocs(collection(db, 'businesses'));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setBusinesses(data);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const buttonStyle =
    'bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors w-full text-left';

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 p-6 shadow-md">
        <div className="mb-6 text-center">
          <button onClick={() => router.push('/admin')} className="w-full">
            <img
              src="/Byrom-petroleum-m.png"
              alt="Byrom Petroleum Logo"
              className="mx-auto h-16 object-contain hover:opacity-90 transition-opacity"
            />
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-6 text-center">Navigation</h2>
        <div className="flex flex-col space-y-4">
          <button onClick={() => router.push('/admin/createBusiness')} className={buttonStyle}>
            Create New Business
          </button>
          <button onClick={handleLogout} className={buttonStyle}>
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">All Businesses</h1>
        <ul className="space-y-2">
          {businesses.map((biz) => (
            <li
              key={biz.id}
              className="border p-4 rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => router.push(`/admin/business/${biz.id}`)}
            >
              <div className="font-semibold">{biz.name}</div>
              <div className="text-sm text-gray-600">Click to view details</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
