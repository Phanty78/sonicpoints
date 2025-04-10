import Image from 'next/image';
import { CircleLoader } from 'react-spinners';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { DisplayDifference } from '@/utils/utils';
import { FaChartLine as FaChartLineIcon } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SonicHistoryChart } from '@/components/ui/charts/sonicLineChart';
import { SonicRankHistoryChart } from '@/components/ui/charts/sonicRankLineChart';
import { Separator } from '@/components/ui/separator';

export default function SonicSection({
  sonicData,
  localData,
  sonicPoints,
  liquidityPoints,
  activePoints,
  sonicRank,
  sonicHistory,
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-2">
        <Image src="/images/sonic.svg" alt="Sonic" width={20} height={20} />
        <h3 className="text-sonic-gradient text-xl font-bold">Sonic Points</h3>
      </div>

      {sonicData ? (
        <>
          <p>
            <strong>Total Sonic Points:</strong> {sonicPoints}{' '}
            {localData && sonicData && (
              <Tooltip>
                <TooltipTrigger>
                  {DisplayDifference(
                    sonicData.data.sonic_points,
                    localData.sonicData.sonicPoints,
                    false
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sonic points difference since last update</p>
                </TooltipContent>
              </Tooltip>
            )}
          </p>
          <p>
            <strong>Liquidity points:</strong> {liquidityPoints}{' '}
            {localData && sonicData && (
              <Tooltip>
                <TooltipTrigger>
                  {DisplayDifference(
                    sonicData.data.passive_liquidity_points,
                    localData.sonicData.liquidityPoints,
                    false
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Liquidity points difference since last update</p>
                </TooltipContent>
              </Tooltip>
            )}
          </p>
          <p>
            <strong>Active points:</strong> {activePoints}{' '}
            {localData && sonicData && (
              <Tooltip>
                <TooltipTrigger>
                  {DisplayDifference(
                    sonicData.data.active_liquidity_points,
                    localData.sonicData.activePoints,
                    false
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Active points difference since last update</p>
                </TooltipContent>
              </Tooltip>
            )}
          </p>
          <p>
            <strong>Sonic rank:</strong> {sonicRank}{' '}
            {localData && sonicData && (
              <Tooltip>
                <TooltipTrigger>
                  {DisplayDifference(
                    sonicData.data.rank,
                    localData.sonicData.sonicRank,
                    true
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sonic rank difference since last update</p>
                </TooltipContent>
              </Tooltip>
            )}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center gap-1">
                        <div className="relative">
                          <svg width="0" height="0">
                            <linearGradient
                              id="sonic-gradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                stopColor="rgb(255, 203, 103)"
                              />
                              <stop
                                offset="34.85%"
                                stopColor="rgb(237, 84, 9)"
                              />
                              <stop
                                offset="63.64%"
                                stopColor="rgb(80, 97, 121)"
                              />
                              <stop
                                offset="83.85%"
                                stopColor="rgb(33, 78, 129)"
                              />
                            </linearGradient>
                          </svg>
                          <FaChartLineIcon
                            size={30}
                            className="mt-2 cursor-pointer transition-all duration-300 hover:scale-110"
                            style={{ fill: 'url(#sonic-gradient)' }}
                          />
                        </div>
                        <p className="text-sonic-gradient text-base">Points</p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Consolidated sonic points graph</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sonic points graph</DialogTitle>
                  <DialogDescription>
                    This graph shows the Sonic points you have earned.
                  </DialogDescription>
                </DialogHeader>
                <SonicHistoryChart history={sonicHistory} />
              </DialogContent>
            </Dialog>
            <Separator orientation="vertical" className="h-full" />
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center gap-1">
                        <div className="relative">
                          <svg width="0" height="0">
                            <linearGradient
                              id="sonic-gradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                stopColor="rgb(255, 203, 103)"
                              />
                              <stop
                                offset="34.85%"
                                stopColor="rgb(237, 84, 9)"
                              />
                              <stop
                                offset="63.64%"
                                stopColor="rgb(80, 97, 121)"
                              />
                              <stop
                                offset="83.85%"
                                stopColor="rgb(33, 78, 129)"
                              />
                            </linearGradient>
                          </svg>
                          <FaChartLineIcon
                            size={30}
                            className="mt-2 cursor-pointer transition-all duration-300 hover:scale-110"
                            style={{ fill: 'url(#sonic-gradient)' }}
                          />
                        </div>
                        <p className="text-sonic-gradient text-base">Rank</p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Consolidated sonic rank graph</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sonic rank graph</DialogTitle>
                  <DialogDescription>
                    This graph shows the Sonic rank you have earned.
                  </DialogDescription>
                </DialogHeader>
                <SonicRankHistoryChart history={sonicHistory} />
              </DialogContent>
            </Dialog>
          </div>
        </>
      ) : (
        <CircleLoader color="orange" size={20} />
      )}
    </section>
  );
}
