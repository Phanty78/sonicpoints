'use client';

import { useAccount } from '@/hooks/useAccount';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [sonicData, setSonicData] = useState(null);
  const [ringData, setRingData] = useState(null);
  const [siloData, setSiloData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSonicData() {
      try {
        const response = await fetch(`/api/sonic?address=${address}`);
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const result = await response.json();
        setSonicData(result);
      } catch (err) {
        setError(err.message);
      }
    }

    if (isConnected && address) {
      fetchSonicData();
    }
  }, [isConnected, address]);

  useEffect(() => {
    async function fetchRingData() {
      try {
        const response = await fetch(`/api/ring?address=${address}`);
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const result = await response.json();
        setRingData(result);
      } catch (err) {
        setError(err.message);
      }
    }

    if (isConnected && address) {
      fetchRingData();
    }
  }, [isConnected, address]);

  useEffect(() => {
    async function fetchSiloData() {
      try {
        const response = await fetch(`/api/silo?address=${address}`);
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const result = await response.json();
        setSiloData(result);
      } catch (err) {
        setError(err.message);
      }
    }

    if (isConnected && address) {
      fetchSiloData();
    }
  }, [isConnected, address]);

  return (
    <main className="flex flex-col items-center justify-center container mx-auto gap-8">
      <h2 className="text-2xl font-bold">All your points in one place</h2>
      <ConnectButton />
      {error && <p>Error: {error}</p>}
      <section className="flex flex-col items-center justify-center gap-2">
        <h3 className="text-lg font-bold">Sonic Points</h3>
        <Image src="/images/sonic.svg" alt="Sonic" width={20} height={20} />
        {sonicData ? <p>Sonic Points: {sonicData.sonic_points}</p> : <p>Loading...</p>}
        {sonicData ? <p>Sonic rank: {sonicData.rank}</p> : <p>Loading...</p>}
      </section>
      <section className="flex flex-col items-center justify-center gap-2">
        <h3 className="text-lg font-bold">Ring Points</h3>
        <Image src="/images/ring.svg" alt="Ring" width={20} height={20} />
        {ringData ? <p>Ring Points: {ringData.total}</p> : <p>Loading...</p>}
      </section>
      <section className="flex flex-col items-center justify-center gap-2">
        <h3 className="text-lg font-bold">Silo Points</h3>
        <Image src="/images/silo.svg" alt="Silo" width={20} height={20} />
        {siloData && siloData.topAccounts && siloData.topAccounts[3] ? (
          <p>Silo Points: {siloData.topAccounts[3].points}</p>
        ) : (
          <p>Loading...</p>
        )}
        {siloData && siloData.topAccounts && siloData.topAccounts[3] ? (
          <p>Silo rank: {siloData.topAccounts[3].position}</p>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </main>
  );
}
