'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { collectionGroup, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';

export default function ScanPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [message, setMessage] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanControl, setScanControl] = useState<{ stop: () => void } | null>(null);

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

  const startScan = async () => {
    setMessage('Initializing camera...');
    const reader = new BrowserMultiFormatReader();

    try {
      const devices = await BrowserMultiFormatReader.listVideoInputDevices();
      console.log('🟡 Devices:', devices);

      const deviceId = devices[0]?.deviceId;

      if (!deviceId || !videoRef.current) {
        setMessage('❌ No camera found. Please check browser permissions.');
        return;
      }

      setScanning(true);

      // Delay to avoid DOM timing issues
      setTimeout(() => {
        reader.decodeFromVideoDevice(
          deviceId,
          videoRef.current!,
          async (result, error, control) => {
            setScanControl(control);

            if (result) {
              setMessage(`✅ Scanned: ${result.getText()}`);
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
                setScanning(false);
              }
            }
          }
        );
      }, 300);
    } catch (err) {
      console.error('Camera init error:', err);
      setMessage(`⚠️ Camera error: ${err}`);
    }
  };

  const stopScan = () => {
    if (scanControl) {
      scanControl.stop();
      setScanControl(null);
      setScanning(false);
      setMessage('Scan cancelled.');
    }
  };

  if (!authorized) return null;

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Scan Pump Barcode</h1>

      {!scanning && (
        <button
          onClick={startScan}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
        >
          Start Scan
        </button>
      )}

      {scanning && (
        <>
          <video ref={videoRef} className="w-full max-w-md rounded shadow mb-4" />
          <button
            onClick={stopScan}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-4"
          >
            Cancel Scan
          </button>
        </>
      )}

      {message && <p className="text-gray-700 mb-6">{message}</p>}

      <button
        onClick={() => router.back()}
        className="text-blue-600 underline hover:text-blue-800"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}
