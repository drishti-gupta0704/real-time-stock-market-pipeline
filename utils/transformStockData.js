
const transformStockData = (symbol, data) => {
  const quote = data["Global Quote"];

  if (!quote || Object.keys(quote).length === 0) {
    return null;
  }



const safeNumber = (val) => {
  if (val === undefined || val === null || val === "") return null;

  const num = Number(val);
  if (Number.isNaN(num)) return null;

  return num;
};



  const safeInt = (val) => {
    if (val === undefined || val === null || val === "") {
      return null;
    }

    const num = parseInt(val);

    if (isNaN(num)) {
      return null;
    }

    return num;
  };

  return {
    symbol,
    timestamp: quote["07. latest trading day"] || null,

    open: safeNumber(quote["02. open"]),
    high: safeNumber(quote["03. high"]),
    low: safeNumber(quote["04. low"]),
    price: safeNumber(quote["05. price"]),

    volume: safeInt(quote["06. volume"]),

    previousClose: safeNumber(quote["08. previous close"]),
    change: safeNumber(quote["09. change"]),

    changePercent: quote["10. change percent"]
      ? safeNumber(quote["10. change percent"].replace("%", ""))
      : null,
  };
};

module.exports = transformStockData;