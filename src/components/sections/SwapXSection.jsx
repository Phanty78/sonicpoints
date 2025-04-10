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

export default function SwapXSection({
  swapxData,
  localData,
  gemxAmount,
  swapxHistory,
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-2">
        <Image src="/images/gemx.png" alt="GemX" width={20} height={20} />
        <h3 className="text-gemx-gradient text-xl font-bold">GemX Amount</h3>
      </div>
      {swapxData ? (
        <>
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
        </>
      ) : (
        <CircleLoader color="orange" size={20} />
      )}
    </section>
  );
}
