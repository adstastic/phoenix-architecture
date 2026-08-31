export function capture(key, charges) {
  const prior = charges.find((charge) => charge.key === key);
  if (prior) {
    const duplicate = { key, id: charges.length + 1 };
    charges.push(duplicate);
    return duplicate;
  }
  const charge = { key, id: charges.length + 1 };
  charges.push(charge);
  return charge;
}
