'use client';

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function CreateBusinessPage() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleCreate = async () => {
    if (!name) return;
    const docRef = await addDoc(collection(db, 'businesses'), { name });
    router.push('/admin');
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Business</h1>
      <input
        type="text"
        placeholder="Business Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-2 w-full">
        Create
      </button>
    </div>
  );
}
