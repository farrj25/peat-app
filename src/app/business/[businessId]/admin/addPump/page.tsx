'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db, auth } from '@/lib/firebase';
import { collection, doc, getDoc, setDoc, addDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function AddPumpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessId = typeof window !== 'undefined' ? window.location.pathname.split('/')[2] : '';

  const isEditMode = searchParams.get('edit') === 'true';
  const pumpId = searchParams.get('id');

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
    externalId: '',
    notes: '',
  });

  useEffect(() => {
    if (isEditMode && pumpId) {
      const fetchPump = async () => {
        const ref = doc(db, `businesses/${businessId}/pumps/${pumpId}`);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setFormData((prev) => ({
            ...prev,
            ...data,
            gpsLat: String(data.gpsLat ?? ''),
            gpsLng: String(data.gpsLng ?? ''),
          }));
        }
      };
      fetchPump();
    }
  }, [isEditMode, pumpId, businessId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      gpsLat: parseFloat(formData.gpsLat),
      gpsLng: parseFloat(formData.gpsLng),
    };

    if (isEditMode && pumpId) {
      await setDoc(doc(db, `businesses/${businessId}/pumps/${pumpId}`), payload);
    } else {
      await addDoc(collection(db, `businesses/${businessId}/pumps`), payload);
    }

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
          <button onClick={handleLogout} className={buttonStyle}>Logout</button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit Pump' : 'Add New Pump'}</h1>
        <div className="grid grid-cols-1 gap-4 max-w-xl">
          <input name="tankNumber" placeholder="Tank #" value={formData.tankNumber} onChange={handleChange} className="border p-2 rounded" />
          <input name="tankSize" placeholder="Tank Size" value={formData.tankSize} onChange={handleChange} className="border p-2 rounded" />
          <input name="pumpBrand" placeholder="Pump Brand" value={formData.pumpBrand} onChange={handleChange} className="border p-2 rounded" />
          <input name="pumpModel" placeholder="Pump Model" value={formData.pumpModel} onChange={handleChange} className="border p-2 rounded" />
          <input name="datePurchased" type="date" placeholder="Date Purchased" value={formData.datePurchased} onChange={handleChange} className="border p-2 rounded" />
          <input name="vendor" placeholder="Vendor" value={formData.vendor} onChange={handleChange} className="border p-2 rounded" />
          <input name="warrantyInfo" placeholder="Warranty Info" value={formData.warrantyInfo} onChange={handleChange} className="border p-2 rounded" />

          <select name="monitor" value={formData.monitor} onChange={handleChange} className="border p-2 rounded">
            <option value="no">Monitor: No</option>
            <option value="yes">Monitor: Yes</option>
          </select>

          {formData.monitor === 'yes' && (
            <>
              <input name="monitorModel" placeholder="Monitor Model" value={formData.monitorModel} onChange={handleChange} className="border p-2 rounded" />
              <input name="monitorSerial" placeholder="Monitor Serial Number" value={formData.monitorSerial} onChange={handleChange} className="border p-2 rounded" />
            </>
          )}

          <input name="gpsLat" placeholder="GPS Latitude" value={formData.gpsLat} onChange={handleChange} className="border p-2 rounded" />
          <input name="gpsLng" placeholder="GPS Longitude" value={formData.gpsLng} onChange={handleChange} className="border p-2 rounded" />
          <input name="externalId" placeholder="External Barcode ID" value={formData.externalId} onChange={handleChange} className="border p-2 rounded" />
          <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="mt-6 flex space-x-4">
          <button onClick={handleSubmit} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
            {isEditMode ? 'Update Pump' : 'Confirm'}
          </button>
          <button onClick={() => router.push(`/business/${businessId}/admin`)} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
}
