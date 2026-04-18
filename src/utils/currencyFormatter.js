/**
 * Format a number as FCFA currency
 * @param {number} amount - The amount to format
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} - Formatted string like "50,000 FCFA"
 */
export const formatCurrency = (amount, decimals = 0) => {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(amount);
};

/**
 * Format a number with thousand separators and show text "FCFA"
 * @param {number} amount - The amount to format
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} - Formatted string
 */
export const formatFCFA = (amount, decimals = 0) => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  return `${formatter.format(amount)} FCFA`;
};
