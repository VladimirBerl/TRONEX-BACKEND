export const setWithdrawBalance = (invest: string, farm: string, amount: string) => {
  const amountNum = parseFloat(amount);
  const newFarmBalance = parseFloat(farm) - amountNum;
  const newInvestmentBalance = parseFloat(invest);

  if (Math.sign(newFarmBalance) === 1 || Math.sign(newFarmBalance) === 0) {
    return { newInvestmentBalance, newFarmBalance };
  } else {
    return { newInvestmentBalance: newInvestmentBalance - Math.abs(newFarmBalance), newFarmBalance: 0 };
  }
};
