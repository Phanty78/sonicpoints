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
import { RingHistoryChart } from '@/components/ui/charts/ringLineChart';

export default function RingSection({
  ringData,
  localData,
  ringPoints,
  ringHistory,
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-2">
        <Image src="/images/ring.svg" alt="Ring" width={20} height={20} />
        <h3 className="text-ring-gradient text-xl font-bold">Ring Points</h3>
      </div>
      {ringData ? (
        <>
          <p>
            <strong>Ring Points:</strong> {ringPoints}{' '}
            {localData && ringData && (
              <Tooltip>
                <TooltipTrigger>
                  {DisplayDifference(
                    ringData.total.slice(0, -36),
                    localData.ringData.ringPoints,
                    false
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ring points difference since last update</p>
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
                    <p>Ring points graph</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ring points graph</DialogTitle>
                <DialogDescription>
                  This graph shows the Ring points you have earned.
                </DialogDescription>
              </DialogHeader>
              <RingHistoryChart history={ringHistory} />
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <CircleLoader color="orange" size={20} />
      )}
    </section>
  );
}
