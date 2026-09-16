// Currency Utility for Salary Handling in INR and USD

export const INR_TO_USD_RATE = 0.012; // 1 INR = 0.012 USD (1 USD ≈ 83.33 INR)

/**
 * Formats a numeric value as INR (Indian Rupees)
 * @param {number} amount
 * @returns {string} e.g. "₹8,00,000"
 */
export const formatINR = (amount) => {
  if (!amount || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Converts INR to USD equivalent
 * @param {number} inrAmount
 * @returns {number}
 */
export const convertINRToUSD = (inrAmount) => {
  if (!inrAmount || isNaN(inrAmount)) return 0;
  return Math.round(inrAmount * INR_TO_USD_RATE);
};

/**
 * Formats a numeric value as USD
 * @param {number} amount
 * @returns {string} e.g. "$9,600"
 */
export const formatUSD = (amount) => {
  if (!amount || isNaN(amount)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Returns primary formatted INR string with secondary USD conversion
 * @param {number} inrMin 
 * @param {number} inrMax 
 * @returns {{ primary: string, secondary: string, combined: string }}
 */
export const formatSalaryDisplay = (inrMin, inrMax) => {
  if (!inrMin && !inrMax) {
    return {
      primary: 'Salary N/A',
      secondary: '',
      combined: 'Salary N/A'
    };
  }

  const minINR = Number(inrMin) || 0;
  const maxINR = Number(inrMax) || minINR;

  const minUSD = convertINRToUSD(minINR);
  const maxUSD = convertINRToUSD(maxINR);

  let primaryStr = '';
  let secondaryStr = '';

  if (minINR === maxINR || !maxINR) {
    primaryStr = `${formatINR(minINR)} / yr`;
    secondaryStr = `≈ ${formatUSD(minUSD)} / yr`;
  } else {
    primaryStr = `${formatINR(minINR)} - ${formatINR(maxINR)} / yr`;
    secondaryStr = `≈ ${formatUSD(minUSD)} - ${formatUSD(maxUSD)} / yr`;
  }

  return {
    primary: primaryStr,
    secondary: secondaryStr,
    combined: `${primaryStr} (${secondaryStr})`
  };
};
