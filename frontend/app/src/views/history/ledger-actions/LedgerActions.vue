<template>
  <progress-screen v-if="loading">
    <template #message>
      {{ t('ledger_actions.loading') }}
    </template>
    {{ t('ledger_actions.loading_subtitle') }}
  </progress-screen>
  <div v-else>
    <div class="mt-8">
      <ledger-action-content @fetch="fetchLedgerActions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n-composable';
import ProgressScreen from '@/components/helper/ProgressScreen.vue';
import LedgerActionContent from '@/components/history/ledger-actions/LedgerActionContent.vue';
import { useSectionLoading } from '@/composables/common';
import { Section } from '@/store/const';
import { useLedgerActions } from '@/store/history/ledger-actions';

const { fetchLedgerActions } = useLedgerActions();

onBeforeMount(async () => {
  await fetchLedgerActions();
});

const { shouldShowLoadingScreen } = useSectionLoading();
const loading = shouldShowLoadingScreen(Section.LEDGER_ACTIONS);

const { t } = useI18n();
</script>
