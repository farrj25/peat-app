'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { db, auth } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function BusinessDetailsPage() {
  const router = useRouter();
  const { businessId } = useParams();
  const [business, setBusiness] = useState<any>(null);
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });

  const fetchBusiness = async () => {
    const ref = doc(db, 'businesses', businessId as string);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      setBusiness(snapshot.data());
      setContact({
        name: snapshot.data().contactName || '',
        email: snapshot.data().contactEmail || '',
        phone: snapshot.data().contactPhone || '',
      });
    }
  };

  const saveContactInfo = async () => {
    const ref = doc(db, 'businesses', businessId as string);
    await updateDoc(ref, {
      contactName: contact.name,
      contactEmail: contact.email,
      contactPhone: contact.phone,
    });
    fetchBusiness();
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const buttonStyle =
    'bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors w-full text-left';

  useEffect(() => {
    fetchBusiness();
  }, [businessId]);

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
          <button onClick={() => router.push('/admin')} className={buttonStyle}>
            Back to Dashboard
          </button>
          <button onClick={handleLogout} className={buttonStyle}>
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Business Details</h1>
        <div className="space-y-4 max-w-xl">
          <input
            type="text"
            placeholder="Contact Name"
            className="border p-2 rounded w-full"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Contact Email"
            className="border p-2 rounded w-full"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Contact Phone"
            className="border p-2 rounded w-full"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          />
          <button onClick={saveContactInfo} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
            Save Contact Info
          </button>
        </div>
      </main>
    </div>
  );
}
