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

export default function BeetsSection({
  beetsData,
  localData,
  beetsAmount,
  beetsHistory,
  sptToken,
  priceData,
}) {
  const [beetsAmountInUSD, setBeetsAmountInUSD] = useState(0);

  useEffect(() => {
    if (priceData && priceData[0]) {
      setBeetsAmountInUSD(priceData[0].estimatedPrice * beetsAmount);
    }
  }, [priceData, beetsAmount]);
  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/images/beets.png"
          alt="Beets logo"
          width={20}
          height={20}
        />
        <h3 className="text-beets-gradient text-xl font-bold">Beets Amount</h3>
      </div>
      {beetsData ? (
        <>
          <div className="flex items-center justify-between gap-4">
            <p>
              <strong>Beets Amount:</strong> {beetsAmount}{' '}
              {localData?.beetsData && beetsData?.result && (
                <Tooltip>
                  <TooltipTrigger>
                    {DisplayDifference(
                      beetsAmount,
                      localData.beetsData.beetsAmount,
                      false
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Beets amount difference since last update</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </p>
            {sptToken >= SPT_MIN_NUMBER ? (
              <p className="dark:text-foreground text-base font-bold">
                ≃ {beetsAmountInUSD.toFixed(2)} $
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
                      <FaChartLineIcon
                        size={30}
                        className="text-foreground mt-2 cursor-pointer transition-all duration-300 hover:scale-110"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Beets amount graph</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Beets amount graph</DialogTitle>
                  <DialogDescription>
                    This graph shows the Beets amount you have earned from Beets
                    LP.
                  </DialogDescription>
                </DialogHeader>
                <SwapxHistoryChart history={beetsHistory} />
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
