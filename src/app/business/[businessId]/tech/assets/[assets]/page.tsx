'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';

export default function TechAssetPage({ params }: { params: { assetId: string } }) {
  const router = useRouter();
  const businessId = typeof window !== 'undefined' ? window.location.pathname.split('/')[2] : '';
  const { assetId } = params;
  const [asset, setAsset] = useState<any>(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    const fetchAsset = async () => {
      const docRef = doc(db, `businesses/${businessId}/pumps/${assetId}`);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) setAsset(snapshot.data());
    };
    fetchAsset();
  }, [assetId, businessId]);

  const handleAddNote = async () => {
    if (!note.trim()) return;
    const assetRef = doc(db, `businesses/${businessId}/pumps/${assetId}`);
    await updateDoc(assetRef, {
      serviceNotes: arrayUnion({ text: note, timestamp: Timestamp.now() })
    });
    setNote('');
    router.refresh();
  };

  if (!asset) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Pump Details</h1>
      <ul className="mb-4 space-y-1">
        {Object.entries(asset).map(([key, value]) => (
          key !== 'serviceNotes' && (
            <li key={key}><strong>{key}:</strong> {String(value)}</li>
          )
        ))}
      </ul>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Service Log</h2>
        {asset.serviceNotes && Array.isArray(asset.serviceNotes) ? (
          <ul className="space-y-2">
            {asset.serviceNotes.map((entry: any, index: number) => (
              <li key={index} className="border rounded p-2">
                <div className="text-sm text-gray-600">
                  {entry.timestamp?.seconds
                    ? new Date(entry.timestamp.seconds * 1000).toLocaleString()
                    : 'Unknown time'}
                </div>
                <div>{entry.text}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No service notes found.</p>
        )}
      </div>

      <div className="mb-4">
        <textarea
          placeholder="Add service note..."
          className="border w-full p-2 rounded"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={handleAddNote} className="bg-blue-600 text-white px-4 py-2 mt-2 rounded">
          Add Note
        </button>
      </div>

      <button onClick={() => router.back()} className="bg-blue-600 text-white px-4 py-2 rounded">
        Back
      </button>
    </div>
  );
}
