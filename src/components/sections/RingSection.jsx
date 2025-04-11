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
import { SPT_MIN_NUMBER } from '@/constants/constants';

export default function RingSection({
  ringData,
  localData,
  ringPoints,
  ringHistory,
  sptToken,
  priceData,
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
              {sptToken >= SPT_MIN_NUMBER ? (
                <div className="cursor-pointer">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="group relative">
                        <svg width="0" height="0">
                          <linearGradient
                            id="ring-gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#7a8fd9" />
                            <stop offset="100%" stopColor="#ac62e4" />
                          </linearGradient>
                        </svg>
                        <FaChartLineIcon
                          size={30}
                          className="mt-2 transition-all duration-300 group-hover:scale-110"
                          style={{ fill: 'url(#ring-gradient)' }}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="bg-slate-800 text-white"
                    >
                      <p>Voir l'historique des Ring Points</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ) : (
                <div className="pointer-events-none cursor-not-allowed opacity-50">
                  <FaChartLineIcon
                    size={30}
                    className="text-foreground mt-2 cursor-pointer transition-all duration-300 hover:scale-110"
                  />
                </div>
              )}
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
