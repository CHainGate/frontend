import { chaingateApi as t } from './chaingate.generated'

export const chaingateApi = t.enhanceEndpoints({
  addTagTypes: ['Wallet'],
  endpoints: {
    // basic notation: just specify properties to be overridden
    getWallets: {
      providesTags: ['Wallet'],
    },
    addWallet: {
      invalidatesTags: ['Wallet'],
    },
    deleteWallet: {
      invalidatesTags: ['Wallet'],
    },
  },
});

export const {
  useGetConfigQuery,
  useLoginMutation,
  useRegisterMerchantMutation,
  useVerifyEmailQuery,
  useGetWalletsQuery,
  useAddWalletMutation,
  useDeleteWalletMutation,
  useGetApiKeyQuery,
  useGenerateApiKeyMutation,
  useDeleteApiKeyMutation,
  useGetLoggingInformationQuery,
} = chaingateApi

