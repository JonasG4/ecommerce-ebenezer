export function formatPhoneNumber(number) {
  let phoneNumberString = number;
  let newText = "";
  let cleaned = ("" + phoneNumberString).replace(/\D/g, "");

  for (let i = 0; i < cleaned.length; i++) {
    if (i == 4) {
      newText = newText + "-";
    }

    if (i < 8) {
      newText = newText + cleaned[i];
    }
  }
  return newText;
}

export function formatPrice(price) {

  const prices = (price).toString().split(".");
  let integer = parseInt(prices[0].replace(/\D/g, ""));
  let decimal = prices[1] ? prices[1].replace(/\D/g, "") : "";

  if (!isNaN(integer)) {
    integer = integer.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
  }

  if (prices.length >= 2) {
    decimal = decimal.slice(0, 2);
    return `${integer}.${decimal}`;
  }

  const newPrice = integer ? integer : "";
  return newPrice;
}

export function pricePercent(price, percent) {
  if(!price) return 0;
  const formarterPrice = price.toString().replace(",", "");
  if (!price) return 0;
  if (!percent || isNaN(percent) || percent > 100) return price;
  const newPrice = (formarterPrice * (100 - percent)) / 100;
  return newPrice.toFixed(2);
}

export function currencyFormatter(value) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency: 'USD'
  })
  return formatter.format(value)
}