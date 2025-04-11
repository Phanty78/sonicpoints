'use client';

import RingSection from '@/components/sections/RingSection';
import SiloSection from '@/components/sections/SiloSection';
import SonicSection from '@/components/sections/SonicSection';
import SwapXSection from '@/components/sections/SwapXSection';
import BeetsSection from '@/components/sections/BeetsSection';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useAccount } from '@/hooks/useAccount';
import { getDate, hasBeenMoreThan24Hours } from '@/utils/dates';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';
import { SPT_MIN_NUMBER } from '@/constants/constants';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [sonicData, setSonicData] = useState(null);
  const [sonicHistory, setSonicHistory] = useState(null);
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
  const [swapxHistory, setSwapxHistory] = useState(null);
  const [ringHistory, setRingHistory] = useState(null);
  const [siloHistory, setSiloHistory] = useState(null);
  const [sptToken, setSptToken] = useState('');
  const [sptData, setSptData] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const [beetsData, setBeetsData] = useState(null);
  const [beetsAmount, setBeetsAmount] = useState('');
  const [beetsHistory, setBeetsHistory] = useState(null);

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
        setSonicPoints(result.data.sonic_points.toFixed(1));
        setLiquidityPoints(result.data.passive_liquidity_points.toFixed(1));
        setActivePoints(result.data.active_liquidity_points.toFixed(1));
        setSonicRank(result.data.rank);
        setSonicHistory(result.history);
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
        setRingData(result.data);
        setRingPoints(result.data.total.slice(0, -36));
        setRingHistory(result.ringHistory);
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
        setSiloPoints(result.data.topAccounts[3].points.toFixed(0));
        setSiloRank(result.data.topAccounts[3].position);
        setSiloHistory(result.siloHistory);
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
        setSwapxData(result.data);
        setGemxAmount((result.data.result.slice(0, -17) / 10).toString());
        setSwapxHistory(result.swapxHistory);
      } catch (err) {
        setError(err.message);
      }
    }

    if (activeAddress) {
      fetchSwapxData();
    }
  }, [isConnected, activeAddress, inputAddress]);

  // Fetch the beets data
  useEffect(() => {
    async function fetchBeetsData() {
      if (!activeAddress) return;
      try {
        const response = await fetch(`/api/beets?address=${activeAddress}`);
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const result = await response.json();
        setBeetsData(result.data);
        setBeetsAmount((result.data.result.slice(0, -17) / 10).toString());
        setBeetsHistory(result.beetsHistory);
      } catch (err) {
        setError(err.message);
      }
    }

    if (activeAddress) {
      fetchBeetsData();
    }
  }, [isConnected, activeAddress, inputAddress]);

  // Fetch the spt data
  useEffect(() => {
    async function fetchSptData() {
      if (!activeAddress) return;
      try {
        const response = await fetch(`/api/spt?address=${activeAddress}`);
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const result = await response.json();
        setSptToken((result.data.result.slice(0, -17) / 10).toString());
        setSptData(result.data);
      } catch (err) {
        setError(err.message);
      }
    }

    if (activeAddress) {
      fetchSptData();
    }
  }, [isConnected, activeAddress, inputAddress]);

  useEffect(() => {
    console.log(sptToken);
  }, [sptToken]);

  //TODO : le montant de token n'est pas correctement remonté

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
            sonicPoints: sonicData?.data?.sonic_points?.toFixed(1) || '0',
            liquidityPoints:
              sonicData?.data?.passive_liquidity_points?.toFixed(1) || '0',
            activePoints:
              sonicData?.data?.active_liquidity_points?.toFixed(1) || '0',
            sonicRank: sonicData?.data?.rank || 0,
          },
          ringData: {
            ringPoints: ringData?.total?.slice(0, -36) || '0',
          },
          siloData: {
            siloPoints:
              siloData?.data?.topAccounts?.[3]?.points?.toFixed(0) || '0',
            siloRank: siloData?.data?.topAccounts?.[3]?.position || 0,
          },
          swapxData: {
            gemxAmount: swapxData?.result?.slice(0, -18) || '0',
          },
        };
        try {
          if (hasBeenMoreThan24Hours(date) || !localData) {
            setLocalStorage('data', dataObject);
            console.log('data saved in localStorage');
          }
        } catch (error) {
          console.error('Error saving data in localStorage:', error);
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
        {sptToken < SPT_MIN_NUMBER ? (
          <p className="mt-2 text-sm text-red-500">
            You need at least {SPT_MIN_NUMBER} SPT to see the graph
          </p>
        ) : (
          <p className="mt-2 text-sm text-green-500">
            You have at least {SPT_MIN_NUMBER} SPT, enjoy all features !
          </p>
        )}
      </section>

      <Separator />

      <SonicSection
        sonicData={sonicData}
        localData={localData}
        sonicPoints={sonicPoints}
        liquidityPoints={liquidityPoints}
        activePoints={activePoints}
        sonicRank={sonicRank}
        sonicHistory={sonicHistory}
        sptToken={sptToken}
        priceData={priceData}
      />

      <Separator />

      <RingSection
        ringData={ringData}
        localData={localData}
        ringPoints={ringPoints}
        ringHistory={ringHistory}
        sptToken={sptToken}
        priceData={priceData}
      />

      <Separator />

      <SiloSection
        siloData={siloData}
        localData={localData}
        siloPoints={siloPoints}
        siloRank={siloRank}
        siloHistory={siloHistory}
        sptToken={sptToken}
        priceData={priceData}
      />

      <Separator />

      <SwapXSection
        swapxData={swapxData}
        localData={localData}
        gemxAmount={gemxAmount}
        swapxHistory={swapxHistory}
        sptToken={sptToken}
        priceData={priceData}
      />

      <Separator />

      <BeetsSection
        beetsData={beetsData}
        localData={localData}
        beetsAmount={beetsAmount}
        beetsHistory={beetsHistory}
        sptToken={sptToken}
        priceData={priceData}
      />
    </main>
  );
}
