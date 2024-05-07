import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/state';
import { calculateCombatLevel } from '@/utils';
import PlayerInnerContainer from '@/app/components/player/PlayerInnerContainer';
import LoadoutName from '@/app/components/player/LoadoutName';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import WikiSyncButton from 'src/app/components/player/WikiSyncButton';
import LoadoutTabs from './LoadoutTabs';

const PlayerContainer: React.FC = observer(() => {
  const store = useStore();
  const {
    loadouts, player, selectedLoadout, canCreateLoadout, createLoadout, renameLoadout, deleteLoadout,
  } = store;

  return (
    <div className="flex flex-col w-[350px]">
      <div
        className="sm:rounded sm:rounded-b-none text-sm font-bold font-serif flex gap-2 items-center bg-transparent text-white border-b-4 border-orange-300 dark:border-orange-700"
      >
        <LoadoutTabs />
        <div>
          <button
            type="button"
            disabled={!canCreateLoadout}
            onClick={() => createLoadout(true, selectedLoadout)}
            className="disabled:cursor-not-allowed text-body-500 dark:text-dark-100 disabled:text-body-200 dark:disabled:text-dark-500 hover:text-green transition-colors"
            data-tooltip-id="tooltip"
            data-tooltip-content="Add new loadout"
          >
            <IconPlus aria-label="Add new loadout" />
          </button>
        </div>
      </div>
      <div
        className="bg-tile sm:rounded-b-lg dark:bg-dark-300 text-black dark:text-white shadow-lg flex flex-col"
      >
        <div
          className="px-5 py-3 border-b-body-400 dark:border-b-dark-200 border-b flex justify-between items-center font-serif"
        >
          <div className="min-w-0">
            <LoadoutName name={loadouts[selectedLoadout].name} renameLoadout={renameLoadout} index={selectedLoadout} />
            <div className="text-xs font-bold text-gray-500 dark:text-gray-300">
              Level
              {' '}
              {calculateCombatLevel(player.skills)}
            </div>
          </div>
          <div className="flex gap-1">
            <WikiSyncButton />
            <button
              type="button"
              onClick={() => deleteLoadout(selectedLoadout)}
              className="disabled:cursor-not-allowed text-body-500 dark:text-dark-100 disabled:text-btns-100 dark:disabled:text-dark-500 hover:text-red transition-colors"
              data-tooltip-id="tooltip"
              data-tooltip-content="Remove loadout"
            >
              <IconTrash aria-label="Remove loadout" />
            </button>
          </div>
        </div>
        <PlayerInnerContainer />
      </div>
    </div>
  );
});

export default PlayerContainer;
