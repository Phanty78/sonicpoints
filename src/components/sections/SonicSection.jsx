import Image from 'next/image';
import { CircleLoader } from 'react-spinners';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { DisplayDifference } from '@/utils/utils';

export default function SonicSection({
  sonicData,
  localData,
  sonicPoints,
  liquidityPoints,
  activePoints,
  sonicRank,
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
                    sonicData.sonic_points,
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
                    sonicData.passive_liquidity_points,
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
                    sonicData.active_liquidity_points,
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
                    sonicData.rank,
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
        </>
      ) : (
        <CircleLoader color="orange" size={20} />
      )}
    </section>
  );
}
