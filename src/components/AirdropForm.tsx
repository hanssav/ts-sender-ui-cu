'use client';

import InputField from '@/components/ui/InputField';
import { useAccount, useChainId, useConfig } from 'wagmi';
import { chainsToTSender, erc20Abi } from '@/constants';
import { useState } from 'react';
import { readContract } from '@wagmi/core';

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [recipients, setRecipients] = useState('');
  const [amounts, setAmounts] = useState('');

  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();

  async function getApprovedAmount(
    tSenderAddress: string | null
  ): Promise<number> {
    if (!tSenderAddress) {
      alert('No address found, please use a supported chain ');
      return 0;
    }

    //read from the chains to see if we have approved enoug token
    const response = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: 'allowance',
      args: [account.address, tSenderAddress as `0x${string}`],
    });

    return response as number;
  }

  const handleSubmit = async () => {
    const tSenderAddress = chainsToTSender[chainId]['tsender'];
    // console.log(tSenderAddress, 'tsender');
    // console.log(chainId);

    const approvedAmount = await getApprovedAmount(tSenderAddress);

    console.log(approvedAmount);
  };
  return (
    <div className='min-h-screen p-4 max-w-4xl mx-auto'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl font-bold'>Token Sender</h1>
        <div className='text-sm text-gray-500'>
          Send tokens to multiple addresses
        </div>
      </div>

      {/* Form */}
      <div className='space-y-6'>
        {/* Token Address */}
        <InputField
          label='Token Address'
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          placeholder='0x...'
          helperText='The ERC20 token contract address to send'
          className='font-mono text-sm'
        />

        {/* Recipients */}
        <InputField
          label='Recipients (comma or new line separated)'
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          placeholder='0x123..., 0x456...'
          large
          rows={4}
        />

        {/* Amounts */}
        <InputField
          label='Amounts (wei; comma or new line separated)'
          value={amounts}
          onChange={(e) => setAmounts(e.target.value)}
          placeholder='100, 200, 300....'
          large
          rows={3}
        />

        {/* Transaction Details */}
        <div className='border-t border-neutral-700 pt-6'>
          <h3 className='font-medium mb-4'>Transaction Details</h3>
          <div className='p-4 rounded-lg'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <div className='text-sm text-gray-500'>Token Name</div>
                <div className='font-medium'>USDC</div>
              </div>
              <div>
                <div className='text-sm text-gray-500'>Amount (wei)</div>
                <div className='font-medium font-mono'>1000</div>
              </div>
              <div>
                <div className='text-sm text-gray-500'>Amount (tokens)</div>
                <div className='font-medium'>0.00</div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          className='py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium w-auto'
          onClick={handleSubmit}
          disabled={!recipients.trim() || !amounts.trim()}
        >
          Send Tokens
        </button>
      </div>
    </div>
  );
}
