<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          <card-title>{{ t('common.price') }}</card-title>
        </v-card-title>
        <v-card-text class="text-end text-h5 font-weight-medium pt-4">
          <amount-display
            v-if="info.usdPrice && info.usdPrice.gte(0)"
            show-currency="symbol"
            fiat-currency="USD"
            tooltip
            :price-asset="symbol"
            :value="info.usdPrice"
          />
          <span v-else>-</span>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>
          <card-title>{{ t('assets.amount') }}</card-title>
        </v-card-title>
        <v-card-text class="text-end text-h5 font-weight-medium pt-4">
          <amount-display :value="info.amount" :asset="symbol" />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>
          <card-title>{{ t('assets.value') }}</card-title>
        </v-card-title>
        <v-card-text class="text-end text-h5 font-weight-medium pt-4">
          <amount-display
            show-currency="symbol"
            :fiat-currency="identifier"
            :amount="info.amount"
            :value="info.usdValue"
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { get } from '@vueuse/core';
import { computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n-composable';
import CardTitle from '@/components/typography/CardTitle.vue';
import { useBlockchainBalancesStore } from '@/store/balances/blockchain-balances';
import { AssetPriceInfo } from '@/store/balances/types';

const props = defineProps({
  identifier: { required: true, type: String },
  symbol: { required: true, type: String }
});
const { identifier } = toRefs(props);
const { assetPriceInfo } = useBlockchainBalancesStore();

const info = computed<AssetPriceInfo>(() => {
  return get(assetPriceInfo(identifier));
});

const { t } = useI18n();
</script>
