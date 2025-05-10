'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function AdminDashboardPage() {
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
          <button
            onClick={() => router.push(`/business/${businessId}/admin/assets`)}
            className={buttonStyle}
          >
            View Pumps / Assets
          </button>

          <button
            onClick={() => router.push(`/business/${businessId}/admin/addPump`)}
            className={buttonStyle}
          >
            Add New Pump
          </button>

          <button
            onClick={() => router.push(`/business/${businessId}/admin/resources`)}
            className={buttonStyle}
          >
            Resources
          </button>

          <button
            onClick={() => router.push(`/business/${businessId}/admin/addTech`)}
            className={buttonStyle}
          >
            Add New Technician
          </button>

          <button
            onClick={handleLogout}
            className={buttonStyle}
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin control panel. Use the sidebar to manage pumps, technicians, and resources.</p>
      </main>
    </div>
  );
}
