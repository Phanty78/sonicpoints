'use client';

import { useAccount } from '@/hooks/useAccount';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [sonicData, setSonicData] = useState(null);
  const [ringData, setRingData] = useState(null);
  const [siloData, setSiloData] = useState(null);
  const [error, setError] = useState(null);
  const [sonicPoints, setSonicPoints] = useState('');
  const [liquidityPoints, setLiquidityPoints] = useState('');
  const [activePoints, setActivePoints] = useState('');
  const [sonicRank, setSonicRank] = useState('');
  const [ringPoints, setRingPoints] = useState('');
  const [siloPoints, setSiloPoints] = useState('');
  const [siloRank, setSiloRank] = useState('');

  useEffect(() => {
    async function fetchSonicData() {
      try {
        const response = await fetch(`/api/sonic?address=${address}`);
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const result = await response.json();
        setSonicData(result);
        setSonicPoints(result.sonic_points.toFixed(1));
        setLiquidityPoints(result.passive_liquidity_points.toFixed(1));
        setActivePoints(result.active_liquidity_points.toFixed(1));
        setSonicRank(result.rank);
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
        setRingPoints(result.total.slice(0, -36));
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
        setSiloPoints(result.topAccounts[3].points.toFixed(0));
        setSiloRank(result.topAccounts[3].position);
      } catch (err) {
        setError(err.message);
      }
    }

    if (isConnected && address) {
      fetchSiloData();
    }
  }, [isConnected, address]);

  return (
    <main className="container mx-auto flex max-w-[400px] flex-col items-center justify-center gap-8 rounded-lg border-2 border-gray-300 p-4">
      <h2 className="text-2xl font-bold text-center">All your Sonic AirDrop points in one place</h2>
      <ConnectButton label="Connect Wallet" showBalance={false} />
      {error && <p>Error: {error}</p>}
      <section className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-2">
          <Image src="/images/sonic.svg" alt="Sonic" width={20} height={20} />
          <h3 className="text-xl font-bold text-sonic-gradient">Sonic Points</h3>
        </div>

        {sonicData ? (
          <>
            <p>
              <strong>Total Sonic Points:</strong> {sonicPoints}
            </p>
            <p>
              <strong>Liquidity points:</strong> {liquidityPoints}
            </p>
            <p>
              <strong>Active points:</strong> {activePoints}
            </p>
            <p>
              <strong>Sonic rank:</strong> {sonicRank}
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </section>
      <Separator />
      <section className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-2">
          <Image src="/images/ring.svg" alt="Ring" width={20} height={20} />
          <h3 className="text-xl font-bold text-ring-gradient">Ring Points</h3>
        </div>
        {ringData ? (
          <p>
            <strong>Ring Points:</strong> {ringPoints}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </section>
      <Separator />
      <section className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-2">
          <Image src="/images/silo.svg" alt="Silo" width={20} height={20} />
          <h3 className="text-xl font-bold dark:bg-black dark:text-foreground dark:rounded-2xl dark:px-2">Silo Points</h3>
        </div>
        {siloData && siloData.topAccounts && siloData.topAccounts[3] ? (
          <>
            <p>
              <strong>Silo Points:</strong> {siloPoints}
            </p>
            <p>
              <strong>Silo rank:</strong> {siloRank}
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </main>
  );
}
