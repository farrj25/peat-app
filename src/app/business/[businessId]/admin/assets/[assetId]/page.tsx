'use client';
export const dynamic = 'force-dynamic';

import nextDynamic from 'next/dynamic';

const PumpDetails = nextDynamic(() => import('./client'), {
  ssr: false,
  loading: () => <div className="p-6">Loading pump details...</div>,
});

export default function Page() {
  return <PumpDetails />;
}
