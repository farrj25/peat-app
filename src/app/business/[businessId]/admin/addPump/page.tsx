'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function AddPumpPage() {
  const router = useRouter();
  const businessId = typeof window !== 'undefined' ? window.location.pathname.split('/')[2] : '';

  const [formData, setFormData] = useState({
    tankNumber: '',
    tankSize: '',
    pumpBrand: '',
    pumpModel: '',
    datePurchased: '',
    vendor: '',
    warrantyInfo: '',
    monitor: 'no',
    monitorModel: '',
    monitorSerial: '',
    gpsLat: '',
    gpsLng: '',
    externalId: '', // ✅ new field
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await addDoc(collection(db, `businesses/${businessId}/pumps`), {
      ...formData,
      gpsLat: parseFloat(formData.gpsLat),
      gpsLng: parseFloat(formData.gpsLng),
    });
    router.push(`/business/${businessId}/admin`);
  };

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
        <h1 className="text-2xl font-bold mb-6">Add New Pump</h1>
        <div className="grid grid-cols-1 gap-4 max-w-xl">
          <input name="tankNumber" placeholder="Tank #" className="border p-2 rounded" onChange={handleChange} />
          <input name="tankSize" placeholder="Tank Size" className="border p-2 rounded" onChange={handleChange} />
          <input name="pumpBrand" placeholder="Pump Brand" className="border p-2 rounded" onChange={handleChange} />
          <input name="pumpModel" placeholder="Pump Model" className="border p-2 rounded" onChange={handleChange} />
          <input name="datePurchased" placeholder="Date Purchased" type="date" className="border p-2 rounded" onChange={handleChange} />
          <input name="vendor" placeholder="Vendor" className="border p-2 rounded" onChange={handleChange} />
          <input name="warrantyInfo" placeholder="Warranty Info" className="border p-2 rounded" onChange={handleChange} />

          <select name="monitor" value={formData.monitor} onChange={handleChange} className="border p-2 rounded">
            <option value="no">Monitor: No</option>
            <option value="yes">Monitor: Yes</option>
          </select>

          {formData.monitor === 'yes' && (
            <>
              <input name="monitorModel" placeholder="Monitor Model" className="border p-2 rounded" onChange={handleChange} />
              <input name="monitorSerial" placeholder="Monitor Serial Number" className="border p-2 rounded" onChange={handleChange} />
            </>
          )}

          <input name="gpsLat" placeholder="GPS Latitude" className="border p-2 rounded" onChange={handleChange} />
          <input name="gpsLng" placeholder="GPS Longitude" className="border p-2 rounded" onChange={handleChange} />

          {/* ✅ New field for barcode ID */}
          <input
            name="externalId"
            placeholder="External Barcode ID (e.g. 001233113)"
            className="border p-2 rounded"
            onChange={handleChange}
          />

          <textarea name="notes" placeholder="Notes" className="border p-2 rounded" onChange={handleChange} />
        </div>

        <div className="mt-6 flex space-x-4">
          <button onClick={handleSubmit} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
            Confirm
          </button>
          <button onClick={() => router.push(`/business/${businessId}/admin`)} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
}
