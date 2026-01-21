'use client';

import InputField from '@/components/ui/InputField';
import { useState } from 'react';

export default function Home() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [recipients, setRecipients] = useState('');
  const [amounts, setAmounts] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [amountWei, setAmountWei] = useState('');
  const [amountTokens, setAmountTokens] = useState('');

  const parseList = (input: string) =>
    input
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);

  const recipientCount = parseList(recipients).length;
  const amountCount = parseList(amounts).length;

  const calculateTokenAmount = (wei: string) => {
    const weiNumber = parseFloat(wei);
    return isNaN(weiNumber) ? '0.00' : (weiNumber / 1e18).toFixed(4);
  };

  const handleAmountsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setAmounts(value);

    // Calculate total wei if multiple amounts
    const amountsList = parseList(value);
    const totalWei = amountsList.reduce((sum, amt) => {
      const num = parseFloat(amt);
      return sum + (isNaN(num) ? 0 : num);
    }, 0);

    setAmountWei(totalWei.toString());
    setAmountTokens(calculateTokenAmount(totalWei.toString()));
  };

  const handleRecipientsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setRecipients(value);
  };

  return (
    <div className='min-h-screen p-4 max-w-4xl mx-auto'>
      {/* Header */}
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl font-bold'>Token Sender</h1>
        <div className='text-sm text-gray-500'>
          Send tokens to multiple addresses
        </div>
      </div>

      {/* Form */}
      <div className='space-y-6'>
        {/* Token Address - Now using InputField */}
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
          onChange={handleRecipientsChange}
          placeholder='0x123..., 0x456...'
          large
          rows={4}
        />
        <div className='text-sm text-gray-500'>
          {recipientCount} recipient{recipientCount !== 1 ? 's' : ''}
        </div>

        {/* Amounts */}
        <InputField
          label='Amounts (wei; comma or new line separated)'
          value={amounts}
          onChange={handleAmountsChange}
          placeholder='100, 200, 300....'
          large
          rows={3}
        />
        <div className='text-sm text-gray-500'>
          {amountCount} amount{amountCount !== 1 ? 's' : ''}
        </div>

        {/* Transaction Details - Now using InputFields */}
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

        {/* Validation Check */}
        {recipientCount !== amountCount &&
          recipientCount > 0 &&
          amountCount > 0 && (
            <div className='p-3 bg-yellow-50 border border-yellow-200 rounded'>
              <p className='text-sm text-yellow-800'>
                ⚠ Warning: {recipientCount} recipient
                {recipientCount !== 1 ? 's' : ''} but {amountCount} amount
                {amountCount !== 1 ? 's' : ''}.
                {recipientCount > amountCount
                  ? " Some recipients won't receive tokens."
                  : ' Some amounts will be ignored.'}
              </p>
            </div>
          )}

        {/* Submit Button */}
        <button
          className='w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium'
          onClick={() => {
            const recipientsList = parseList(recipients);
            const amountsList = parseList(amounts);

            console.log('Transaction Data:', {
              tokenAddress,
              tokenName,
              recipients: recipientsList,
              amounts: amountsList,
              totalWei: amountWei,
              totalTokens: amountTokens,
            });

            alert(
              `Preparing transaction for ${recipientCount} recipient${recipientCount !== 1 ? 's' : ''}`
            );
          }}
          disabled={recipientCount === 0 || amountCount === 0}
        >
          Send Tokens
        </button>
      </div>
    </div>
  );
}
