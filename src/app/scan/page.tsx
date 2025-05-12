'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { collectionGroup, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';

export default function ScanPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [message, setMessage] = useState('Point your camera at a barcode...');
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      } else {
        setAuthorized(true);
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!authorized) return;

    const codeReader = new BrowserMultiFormatReader();

    BrowserMultiFormatReader.listVideoInputDevices()
      .then((devices) => {
        const deviceId = devices[0]?.deviceId;
        if (!deviceId || !videoRef.current) return;

        codeReader.decodeFromVideoDevice(
          deviceId,
          videoRef.current,
          async (result, error, control) => {
            if (result) {
              setMessage(`Scanned: ${result.getText()}`);
              control.stop();

              const scannedCode = result.getText();
              const pumpsRef = collectionGroup(db, 'pumps');
              const q = query(pumpsRef, where('externalId', '==', scannedCode));
              const snapshot = await getDocs(q);

              if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                const pathSegments = doc.ref.path.split('/');
                const businessId = pathSegments[1];
                const pumpId = doc.id;

                router.push(`/business/${businessId}/pumps/${pumpId}`);
              } else {
                setMessage('No matching pump found.');
              }
            }
          }
        );
      })
      .catch((err) => setMessage(`Camera error: ${err}`));

   return () => {
  // cleanup handled by control.stop() inside the handler
};

  }, [authorized, router]);

  if (!authorized) return null;

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Scan Pump Barcode</h1>
      <video ref={videoRef} className="w-full max-w-md rounded shadow" />
      <p className="mt-4 text-gray-700">{message}</p>
    </div>
  );
}
