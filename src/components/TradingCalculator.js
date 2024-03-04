import React, { useState } from 'react';

const TradingCalculator = () => {
  const [form, setForm] = useState({
    balance: '',
    leverage: '',
    positionSizeUsd: '',
    entry: '',
    stopLoss: '',
    takeProfit: '', // Only one take profit
    riskPercentage: '',
  });

  const [results, setResults] = useState({
    stopLossInUsdt: '',
    takeProfitInUsdt: '',
    riskRewardRatio: '',
    percentageGainLoss: '',
    riskAmount: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateResults = () => {
    const { balance, leverage, positionSizeUsd, entry, stopLoss, takeProfit, riskPercentage } = form;
    const entryPrice = parseFloat(entry);
    const stopLossPrice = parseFloat(stopLoss);
    const takeProfitPrice = parseFloat(takeProfit);
    const positionSizeInUsdt = parseFloat(positionSizeUsd) * parseFloat(leverage);
    const riskAmount = (parseFloat(riskPercentage) / 100) * parseFloat(balance);

    const stopLossInUsdt = Math.abs(((entryPrice - stopLossPrice) / entryPrice) * positionSizeInUsdt);
    const takeProfitInUsdt = ((takeProfitPrice - entryPrice) / entryPrice) * positionSizeInUsdt;

    const riskRewardRatio = (takeProfitInUsdt / stopLossInUsdt).toFixed(2);
    const percentageGainLoss = ((takeProfitInUsdt / positionSizeInUsdt) * 100).toFixed(2);

    setResults({
      stopLossInUsdt: stopLossInUsdt.toFixed(2),
      takeProfitInUsdt: takeProfitInUsdt.toFixed(2),
      riskRewardRatio,
      percentageGainLoss,
      riskAmount: riskAmount.toFixed(2),
    });
  };

  return (
    <div className="container mx-auto p-4 bg-black text-white"> {/* Background and text color updated */}
      <h2 className="text-xl font-bold mb-4">Trading Calculator</h2>
      {/* Form fields */}
      <div className="grid grid-cols-2 gap-4 text-black">
        {/* Input fields */}
        {/* Simplified to include only one take profit input */}
        <input type="number" name="balance" value={form.balance} onChange={handleChange} placeholder="Balance in USDT" className="input input-bordered w-full max-w-xs" />
        <input type="number" name="leverage" value={form.leverage} onChange={handleChange} placeholder="Leverage" className="input input-bordered w-full max-w-xs" />
        <input type="number" name="positionSizeUsd" value={form.positionSizeUsd} onChange={handleChange} placeholder="Position Size in USDT" className="input input-bordered w-full max-w-xs" />
        <input type="number" name="entry" value={form.entry} onChange={handleChange} placeholder="Entry Price" className="input input-bordered w-full max-w-xs" />
        <input type="number" name="stopLoss" value={form.stopLoss} onChange={handleChange} placeholder="Stop Loss Price" className="input input-bordered w-full max-w-xs" />
        <input type="number" name="takeProfit" value={form.takeProfit} onChange={handleChange} placeholder="Take Profit Price" className="input input-bordered w-full max-w-xs" />
        <input type="number" name="riskPercentage" value={form.riskPercentage} onChange={handleChange} placeholder="Risk Percentage of Balance" className="input input-bordered w-full max-w-xs" />
      </div>
      <button onClick={calculateResults} className="btn btn-primary mt-4">Calculate</button>
      {/* Results */}
      <div className="mt-4">
        <p>Stop Loss in USDT: {results.stopLossInUsdt}</p>
        <p>Risk Amount: {results.riskAmount} USDT</p>
        <p>Take Profit in USDT: {results.takeProfitInUsdt}</p>
        <p>Risk/Reward Ratio: {results.riskRewardRatio}</p>
        <p>Percentage Gain/Loss: {results.percentageGainLoss}%</p>
      </div>
    </div>
  );
};

export default TradingCalculator;
