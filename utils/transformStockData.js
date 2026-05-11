
const transformStockData = (symbol, data) => {
  const quote = data["Global Quote"];

  if (!quote) return null;

  const price = parseFloat(quote["05. price"]);

  const transformed = {
    symbol,
    timestamp: quote["07. latest trading day"],

    open: parseFloat(quote["01. open"]),
    high: parseFloat(quote["03. high"]),
    low: parseFloat(quote["04. low"]),
    price: price,
    volume: parseInt(quote["06. volume"]),

    previousClose: parseFloat(quote["08. previous close"]),
    change: parseFloat(quote["09. change"]),
    changePercent: parseFloat(
      quote["10. change percent"].replace("%", "")
    ),
  };

  return transformed;
};

module.exports = transformStockData;