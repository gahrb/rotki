import { get, set } from '@vueuse/core';
import { Ref } from 'vue';
import i18n from '@/i18n';
import { useHistory } from '@/store/history';
import { IgnoreActionPayload, IgnoreActionType } from '@/store/history/types';
import { useMessageStore } from '@/store/message';
import { ActionStatus } from '@/store/types';
import { EntryMeta } from '@/types/history/meta';
import { uniqueStrings } from '@/utils/data';

export const setupIgnore = <T extends EntryMeta>(
  type: IgnoreActionType,
  selected: Ref<T[]>,
  refresh: () => any,
  getIdentifier: (item: T) => string
) => {
  const { setMessage } = useMessageStore();

  const { ignoreInAccounting } = useHistory();

  const ignoreActions = async (
    payload: IgnoreActionPayload
  ): Promise<ActionStatus> => {
    return await ignoreInAccounting(payload, true);
  };

  const unignoreActions = async (
    payload: IgnoreActionPayload
  ): Promise<ActionStatus> => {
    return await ignoreInAccounting(payload, false);
  };

  const ignore = async (ignored: boolean) => {
    const ids = get(selected)
      .filter(item => {
        const { ignoredInAccounting } = item;
        return ignored ? !ignoredInAccounting : ignoredInAccounting;
      })
      .map(item => getIdentifier(item))
      .filter(uniqueStrings);

    let status: ActionStatus;

    if (ids.length === 0) {
      const choice = ignored ? 1 : 2;
      setMessage({
        success: false,
        title: i18n.tc('ignore.no_items.title', choice).toString(),
        description: i18n.tc('ignore.no_items.description', choice).toString()
      });
      return;
    }
    const payload: IgnoreActionPayload = {
      actionIds: ids,
      type: type
    };
    if (ignored) {
      status = await ignoreActions(payload);
    } else {
      status = await unignoreActions(payload);
    }

    if (status.success) {
      refresh();
      set(selected, []);
    }
  };

  return {
    ignore
  };
};
