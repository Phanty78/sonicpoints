'use client';

import { useAccount } from '@/hooks/useAccount';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import CircleLoader from 'react-spinners/CircleLoader';
import { Input } from '@/components/ui/input';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { getDate, hasBeenMoreThan24Hours, formatDate } from '@/utils/dates';
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

  function DisplayDifference(data, localData) {
    if (localData && sonicData && ringData && siloData) {
      const difference = data - localData;
      if (difference > 0) {
        return <span className="text-green-500">+{difference.toFixed(1)}</span>;
      } else if (difference === 0) {
        return (
          <span className="text-orange-500">+{difference.toFixed(1)}</span>
        );
      } else {
        return <span className="text-red-500">{difference.toFixed(1)}</span>;
      }
    }
  }

  return (
    <main className="container mx-auto flex max-w-[400px] flex-col items-center justify-center gap-8 rounded-lg border-2 border-gray-300 p-4">
      <h2 className="text-center text-2xl font-bold">
        All your Sonic AirDrop points in one place
      </h2>
      <Separator />
      <ConnectButton label="Connect Wallet" showBalance={false} />
      <p className="text-center text-xl">OR</p>
      <Input
        type="text"
        placeholder="Enter your address"
        value={inputAddress}
        onChange={(e) => setInputAddress(e.target.value)}
      />
      {error && <p>Error: {error}</p>}
      <Separator />
      <section className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-2">
          <Image src="/images/sonic.svg" alt="Sonic" width={20} height={20} />
          <h3 className="text-sonic-gradient text-xl font-bold">
            Sonic Points
          </h3>
        </div>

        {sonicData ? (
          <>
            <p>
              <strong>Total Sonic Points:</strong> {sonicPoints}{' '}
              {localDataData &&
                sonicData &&
                DisplayDifference(
                  sonicData.sonic_points,
                  localData.sonicData.sonicPoints
                )}
            </p>
            <p>
              <strong>Liquidity points:</strong> {liquidityPoints}{' '}
              {localData &&
                sonicData &&
                DisplayDifference(
                  sonicData.passive_liquidity_points,
                  localData.sonicData.liquidityPoints
                )}
            </p>
            <p>
              <strong>Active points:</strong> {activePoints}{' '}
              {localData &&
                sonicData &&
                DisplayDifference(
                  sonicData.active_liquidity_points,
                  localData.sonicData.activePoints
                )}
            </p>
            <p>
              <strong>Sonic rank:</strong> {sonicRank}
              {localData &&
                sonicData &&
                DisplayDifference(
                  sonicData.rank,
                  localData.sonicData.sonicRank
                )}
            </p>
          </>
        ) : (
          <CircleLoader color="orange" size={20} />
        )}
      </section>
      <Separator />
      <section className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-2">
          <Image src="/images/ring.svg" alt="Ring" width={20} height={20} />
          <h3 className="text-ring-gradient text-xl font-bold">Ring Points</h3>
        </div>
        {ringData ? (
          <p>
            <strong>Ring Points:</strong> {ringPoints}{' '}
            {localData &&
              ringData &&
              DisplayDifference(
                ringData.total.slice(0, -36),
                localData.ringData.ringPoints
              )}
          </p>
        ) : (
          <CircleLoader color="orange" size={20} />
        )}
      </section>
      <Separator />
      <section className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-2">
          <Image src="/images/silo.svg" alt="Silo" width={20} height={20} />
          <h3 className="dark:text-foreground text-xl font-bold dark:rounded-2xl dark:bg-black dark:px-2">
            Silo Points
          </h3>
        </div>
        {siloData && siloData.topAccounts && siloData.topAccounts[3] ? (
          <>
            <p>
              <strong>Silo Points:</strong> {siloPoints}{' '}
              {localData &&
                siloData &&
                DisplayDifference(
                  siloData.topAccounts[3].points,
                  localData.siloData.siloPoints
                )}
            </p>
            <p>
              <strong>Silo rank:</strong> {siloRank}{' '}
              {localData &&
                siloData &&
                DisplayDifference(
                  siloData.topAccounts[3].position,
                  localData.siloData.siloRank
                )}
            </p>
          </>
        ) : (
          <CircleLoader color="orange" size={20} />
        )}
      </section>
    </main>
  );
}
