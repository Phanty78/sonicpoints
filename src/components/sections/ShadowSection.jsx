import { DisplayDifference } from '@/utils/utils';
import Image from 'next/image';
import { CircleLoader } from 'react-spinners';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { SwapxHistoryChart } from '@/components/ui/charts/swapxLineChart';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { FaChartLine as FaChartLineIcon } from 'react-icons/fa';
import { SPT_MIN_NUMBER } from '@/constants/constants';
import { useEffect, useState } from 'react';

export default function ShadowSection({
  shadowData,
  localData,
  shadowPoints,
  shadowHistory,
  sptToken,
  priceData,
}) {
  const [shadowPointsInUSD, setShadowPointsInUSD] = useState(0);

  useEffect(() => {
    if (priceData && priceData[1]) {
      setShadowPointsInUSD(priceData[1].estimatedPrice * shadowPoints);
    }
  }, [priceData, shadowPoints]);
  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-2">
        <Image src="/images/gems.png" alt="Gems logo" width={20} height={20} />
        <h3 className="text-shadow-gradient text-xl font-bold">
          GemX from Shadow
        </h3>
      </div>
      {shadowData ? (
        <>
          <div className="flex items-center justify-between gap-4">
            <p>
              <strong>GemX from Shadow:</strong> {shadowPoints}{' '}
              {localData?.shadowData && shadowData?.result && (
                <Tooltip>
                  <TooltipTrigger>
                    {DisplayDifference(
                      shadowPoints,
                      localData.shadowData.shadowPoints,
                      false
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>GemX from Shadow difference since last update</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </p>
            {sptToken >= SPT_MIN_NUMBER ? (
              <p className="dark:text-foreground text-base font-bold">
                ≃ {shadowPointsInUSD.toFixed(2)} $
              </p>
            ) : (
              <p className="dark:text-foreground text-base font-bold">
                ≃ <span className="blur-sm select-none">•••••</span> $
              </p>
            )}
          </div>
          {sptToken >= SPT_MIN_NUMBER ? (
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <svg width="0" height="0">
                          <linearGradient
                            id="shadow-gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="rgb(251, 198, 126)" />
                            <stop offset="100%" stopColor="rgb(255, 148, 1)" />
                          </linearGradient>
                        </svg>
                        <FaChartLineIcon
                          size={30}
                          className="mt-2 cursor-pointer transition-all duration-300 hover:scale-110"
                          style={{ fill: 'url(#shadow-gradient)' }}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>GemX from Shadow graph</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>GemX from Shadow graph</DialogTitle>
                  <DialogDescription>
                    This graph shows the GemX amount you have earned from
                    Shadow.
                  </DialogDescription>
                </DialogHeader>
                <SwapxHistoryChart history={shadowHistory} />
              </DialogContent>
            </Dialog>
          ) : (
            <div className="pointer-events-none cursor-not-allowed opacity-50">
              <FaChartLineIcon
                size={30}
                className="mt-2 cursor-pointer transition-all duration-300 hover:scale-110"
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

// TODO : ajouter le gradient pour le graf
