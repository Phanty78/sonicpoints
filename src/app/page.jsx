'use client';

import RingSection from '@/components/sections/RingSection';
import SiloSection from '@/components/sections/SiloSection';
import SonicSection from '@/components/sections/SonicSection';
import SwapXSection from '@/components/sections/SwapXSection';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAccount } from '@/hooks/useAccount';
import { getDate, hasBeenMoreThan24Hours } from '@/utils/dates';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';

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
  const [inputAddress, setInputAddress] = useState('');
  const [activeAddress, setActiveAddress] = useState(address);
  const [localData, setLocalData] = useState(null);
  const [swapxData, setSwapxData] = useState(null);
  const [gemxAmount, setGemxAmount] = useState('');

  // Fetch the sonic data
  useEffect(() => {
    async function fetchSonicData() {
      if (!activeAddress) return;
      try {
        const response = await fetch(`/api/sonic?address=${activeAddress}`);
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

    if (activeAddress) {
      fetchSonicData();
    }
  }, [isConnected, activeAddress, inputAddress]);

  // Fetch the ring data
  useEffect(() => {
    async function fetchRingData() {
      if (!activeAddress) return;
      try {
        const response = await fetch(`/api/ring?address=${activeAddress}`);
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

    if (activeAddress) {
      fetchRingData();
    }
  }, [isConnected, activeAddress, inputAddress]);

  // Fetch the silo data
  useEffect(() => {
    async function fetchSiloData() {
      if (!activeAddress) return;
      try {
        const response = await fetch(`/api/silo?address=${activeAddress}`);
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

    if (activeAddress) {
      fetchSiloData();
    }
  }, [isConnected, activeAddress, inputAddress]);

  // Fetch the swapx data
  useEffect(() => {
    async function fetchSwapxData() {
      if (!activeAddress) return;
      try {
        const response = await fetch(`/api/swapx?address=${activeAddress}`);
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const result = await response.json();
        setSwapxData(result);
        setGemxAmount(result.result);
      } catch (err) {
        setError(err.message);
      }
    }

    if (activeAddress) {
      fetchSwapxData();
    }
  }, [isConnected, activeAddress, inputAddress]);

  // Clear the data when the user disconnects or the address is empty
  useEffect(() => {
    if (!isConnected || activeAddress === '') {
      setSonicData(null);
      setRingData(null);
      setSiloData(null);
      setSonicPoints('');
      setLiquidityPoints('');
      setActivePoints('');
      setSonicRank('');
      setRingPoints('');
      setSiloPoints('');
      setSiloRank('');
    }
  }, [isConnected, inputAddress]);

  // Set the active address
  useEffect(() => {
    if (inputAddress) {
      setActiveAddress(inputAddress);
    } else if (address && isConnected) {
      setActiveAddress(address);
    } else {
      setActiveAddress('');
    }
  }, [inputAddress, address, isConnected]);

  // Save the data in localStorage
  useEffect(() => {
    try {
      if (sonicData && ringData && siloData) {
        const date = getDate();
        const dataObject = {
          date: date,
          sonicData: {
            sonicPoints: sonicData.sonic_points.toFixed(1),
            liquidityPoints: sonicData.passive_liquidity_points.toFixed(1),
            activePoints: sonicData.active_liquidity_points.toFixed(1),
            sonicRank: sonicData.rank,
          },
          ringData: {
            ringPoints: ringData.total.slice(0, -36),
          },
          siloData: {
            siloPoints: siloData.topAccounts[3].points.toFixed(0),
            siloRank: siloData.topAccounts[3].position,
          },
          swapxData: {
            gemxAmount: swapxData.result,
          },
        };
        if (hasBeenMoreThan24Hours(date) || !localData) {
          setLocalStorage('data', dataObject);
          console.log('data saved in localStorage');
        } else {
          console.log(
            'data not saved in localStorage because it has been less than 24 hours'
          );
        }
      }
    } catch (error) {
      console.error('Error saving data in localStorage:', error);
    }
  }, [sonicData, ringData, siloData]);

  // Get the data from localStorage
  useEffect(() => {
    try {
      const data = getLocalStorage('data');
      if (data) {
        setLocalData(data);
        console.log('data loaded from localStorage');
      } else {
        console.log('no data found in localStorage');
      }
    } catch (error) {
      console.error('Error getting data from localStorage:', error);
    }
  }, []);

  // Log the data from localStorage
  useEffect(() => {
    console.log(localData);
  }, [localData]);

  return (
    <main className="container mx-auto flex max-w-[400px] flex-col items-center justify-center gap-8 rounded-lg border-2 border-gray-300 p-4">
      <h2 className="text-sonic-gradient text-center text-2xl font-bold">
        All your Sonic AirDrop points in one place
      </h2>

      <Separator />

      <section className="flex flex-col items-center justify-center gap-2">
        <ConnectButton label="Connect Wallet" showBalance={false} />
        <p className="text-center text-xl">OR</p>
        <Input
          type="text"
          placeholder="Enter your address"
          value={inputAddress}
          onChange={(e) => setInputAddress(e.target.value)}
        />
        {error && <p>Error: {error}</p>}
      </section>

      <Separator />

      <SonicSection
        sonicData={sonicData}
        localData={localData}
        sonicPoints={sonicPoints}
        liquidityPoints={liquidityPoints}
        activePoints={activePoints}
        sonicRank={sonicRank}
      />

      <Separator />

      <RingSection
        ringData={ringData}
        localData={localData}
        ringPoints={ringPoints}
      />

      <Separator />

      <SiloSection
        siloData={siloData}
        localData={localData}
        siloPoints={siloPoints}
        siloRank={siloRank}
      />

      <Separator />

      <SwapXSection
        swapxData={swapxData}
        localData={localData}
        gemxAmount={gemxAmount}
      />
    </main>
  );
}
