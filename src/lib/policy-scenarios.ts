export function fuelScenario(cents: number, excludeT15: boolean) {
  const price = cents / 100;
  // Fictional annual volume: 200 million L. Excluded share pays RM3.40.
  const excludedShare = excludeT15 ? 0.15 : 0;
  const effectivePrice = price * (1 - excludedShare) + 3.4 * excludedShare;
  return {
    price,
    savingsM: (effectivePrice - 2.05) * 200,
    cpi: ((price / 2.05 - 1) * 100) * 0.03,
    burdenB40: price * 120 / 2500 * 100,
    burdenM40: price * 180 / 5500 * 100,
    critical: cents > 280,
  };
}

export function capacityScenario(density: number, fundingM: number) {
  // Fictional network: 100,000 annual visits; RM1M buys 1,000 visit slots.
  const demand = 100000 * density / 100;
  const capacity = 60000 + fundingM * 1000;
  const saturation = demand / capacity * 100;
  return { demand, capacity, saturation, critical: demand * 100 > capacity * 55 };
}

