'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function ResourcesPage() {
  const router = useRouter();
  const businessId = typeof window !== 'undefined' ? window.location.pathname.split('/')[2] : '';

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
        <h1 className="text-2xl font-bold mb-6">Resources</h1>
        <p className="mb-4">Here you can find diagrams, parts lists, manuals, and other useful documentation related to your pumps.</p>
        <ul className="list-disc pl-5">
          <li>Fill-Rite Pump Diagram</li>
          <li>GPI Service Manual</li>
          <li>Tecalemit Replacement Parts</li>
        </ul>
      </main>
    </div>
  );
}