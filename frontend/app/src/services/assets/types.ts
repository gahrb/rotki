import { AssetEntry, NumericString, BigNumber } from '@rotki/common';
import {
  BaseAsset,
  EvmTokenKindEnum,
  SupportedAsset
} from '@rotki/common/lib/data';
import { z } from 'zod';
import { CONFLICT_RESOLUTION } from '@/services/assets/consts';

export const UnderlyingToken = z.object({
  address: z.string(),
  tokenKind: EvmTokenKindEnum,
  weight: z.string()
});

export type UnderlyingToken = z.infer<typeof UnderlyingToken>;

export const EthereumToken = BaseAsset.extend({
  address: z.string(),
  decimals: z.number(),
  underlyingTokens: z.array(UnderlyingToken).optional(),
  protocol: z.string().optional()
});

export type EthereumToken = z.infer<typeof EthereumToken>;

export interface AssetIdResponse {
  readonly identifier: string;
}

export type ConflictResolutionStrategy = typeof CONFLICT_RESOLUTION[number];

export interface AssetUpdatePayload {
  readonly resolution?: ConflictResolution;
  readonly version: number;
}

export interface ConflictResolution {
  readonly [assetId: string]: ConflictResolutionStrategy;
}

export type ManagedAsset = EthereumToken | SupportedAsset;

export interface HistoricalPrice {
  readonly fromAsset: string;
  readonly toAsset: string;
  readonly timestamp: number;
  readonly price: BigNumber;
}

export interface HistoricalPriceFormPayload {
  readonly fromAsset: string;
  readonly toAsset: string;
  readonly timestamp: number;
  readonly price: string;
}

export interface HistoricalPriceDeletePayload {
  readonly fromAsset: string;
  readonly toAsset: string;
  readonly timestamp: number;
}

export interface HistoricalPricePayload {
  readonly fromAsset: string | null;
  readonly toAsset: string | null;
}

export const PriceInformation = z.object({
  usdPrice: NumericString,
  manuallyInput: z.boolean(),
  priceAsset: z.string().nonempty(),
  priceInAsset: NumericString
});

export type PriceInformation = z.infer<typeof PriceInformation>;
export const AssetPrice = PriceInformation.merge(AssetEntry);

export type AssetPrice = z.infer<typeof AssetPrice>;

export const AssetPriceArray = z.array(AssetPrice);

export type AssetPriceArray = z.infer<typeof AssetPriceArray>;
