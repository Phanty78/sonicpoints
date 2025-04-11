'use client';

import { DisplayDifference } from '@/utils/utils';
import { CircleLoader } from 'react-spinners';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import Image from 'next/image';
import { FaChartLine as FaChartLineIcon } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SiloHistoryChart } from '@/components/ui/charts/siloLineChart';
import { SPT_MIN_NUMBER } from '@/constants/constants';
import { useEffect, useState } from 'react';

export default function SiloSection({
  siloData,
  localData,
  siloPoints,
  siloRank,
  siloHistory,
  sptToken,
  priceData,
}) {
  const [siloPointsInUSD, setSiloPointsInUSD] = useState(0);

  useEffect(() => {
    if (priceData && priceData[4]) {
      setSiloPointsInUSD(priceData[4].estimatedPrice * siloPoints);
    }
  }, [priceData, siloPoints]);

  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-2">
        <Image src="/images/silo.svg" alt="Silo" width={20} height={20} />
        <h3 className="dark:text-foreground text-xl font-bold dark:rounded-2xl dark:bg-black dark:px-2">
          Silo Points
        </h3>
      </div>
      {siloData && siloData.data.topAccounts && siloData.data.topAccounts[3] ? (
        <>
          <div className="flex items-center justify-between gap-4">
            <p>
              <strong>Silo Points:</strong> {siloPoints}{' '}
              {localData && siloData && (
                <Tooltip>
                  <TooltipTrigger>
                    {DisplayDifference(
                      siloData.data.topAccounts[3].points,
                      localData.siloData.siloPoints,
                      false
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Silo points difference since last update</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </p>
            {sptToken >= SPT_MIN_NUMBER ? (
              <p className="dark:text-foreground text-base font-bold">
                {siloData && priceData && (
                  <Tooltip>
                    <TooltipTrigger>
                      ≃ {siloPointsInUSD.toFixed(2)} $
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Estimated Silo points in USD</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </p>
            ) : (
              <p className="dark:text-foreground text-base font-bold">
                ≃ <span className="blur-sm select-none">•••••</span> $
              </p>
            )}
          </div>
          <p>
            <strong>Silo rank:</strong> {siloRank}{' '}
            {localData && siloData && (
              <Tooltip>
                <TooltipTrigger>
                  {DisplayDifference(
                    siloData.data.topAccounts[3].position,
                    localData.siloData.siloRank,
                    true
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Silo rank difference since last update</p>
                </TooltipContent>
              </Tooltip>
            )}
          </p>
          {sptToken >= SPT_MIN_NUMBER ? (
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <FaChartLineIcon
                        size={30}
                        className="text-foreground mt-2 cursor-pointer transition-all duration-300 hover:scale-110"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Silo points graph</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Silo points graph</DialogTitle>
                  <DialogDescription>
                    This graph shows the Silo points you have earned.
                  </DialogDescription>
                </DialogHeader>
                <SiloHistoryChart history={siloHistory} />
              </DialogContent>
            </Dialog>
          ) : (
            <div className="pointer-events-none cursor-not-allowed opacity-50">
              <FaChartLineIcon
                size={30}
                className="text-foreground mt-2 cursor-pointer transition-all duration-300 hover:scale-110"
              />
            </div>
          )}
        </>
      ) : (
        <CircleLoader color="orange" size={20} />
      )}
    </section>
  );
}
