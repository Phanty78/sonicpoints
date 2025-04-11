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

export default function SwapXSection({
  swapxData,
  localData,
  gemxAmount,
  swapxHistory,
  sptToken,
  priceData,
}) {
  const [gemxAmountInUSD, setGemxAmountInUSD] = useState(0);

  useEffect(() => {
    if (priceData && priceData[1]) {
      setGemxAmountInUSD(priceData[1].estimatedPrice * gemxAmount);
    }
  }, [priceData, gemxAmount]);
  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-2">
        <Image src="/images/gemx.png" alt="GemX" width={20} height={20} />
        <h3 className="text-gemx-gradient text-xl font-bold">GemX Amount</h3>
      </div>
      {swapxData ? (
        <>
          <div className="flex items-center justify-between gap-4">
            <p>
              <strong>GemX Amount:</strong> {gemxAmount}{' '}
              {localData?.swapxData && swapxData?.result && (
                <Tooltip>
                  <TooltipTrigger>
                    {DisplayDifference(
                      gemxAmount,
                      localData.swapxData.gemxAmount,
                      false
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>GemX amount difference since last update</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </p>
            {sptToken >= SPT_MIN_NUMBER ? (
              <p className="dark:text-foreground text-base font-bold">
                ≃ {gemxAmountInUSD.toFixed(2)} $
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
                            id="gemx-gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="rgb(188, 255, 47)" />
                            <stop offset="100%" stopColor="rgb(0, 255, 135)" />
                          </linearGradient>
                        </svg>
                        <FaChartLineIcon
                          size={30}
                          className="mt-2 cursor-pointer transition-all duration-300 hover:scale-110"
                          style={{ fill: 'url(#gemx-gradient)' }}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>SwapX points graph</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>GemX amount graph</DialogTitle>
                  <DialogDescription>
                    This graph shows the GemX amount you have earned from SwapX
                    LP.
                  </DialogDescription>
                </DialogHeader>
                <SwapxHistoryChart history={swapxHistory} />
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
