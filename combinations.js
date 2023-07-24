function solve(a) {
  const noOfEvens = 10;
  const noOfOdds = 7;
  // (A+B)%m = (A%m + B%m)%m
  // (A*B)%m = (A%m * B%m)%m
  const m = 1e9 + 7;

  let evens = 1;
  for (let i = 0; i < noOfEvens; i++) {
    evens = ((evens % m) * 2) % m;
  }
  evens--;
  console.log(evens);

  let odds = 0;
  for (let i = 2; i < noOfOdds; i += 2) {
    let num = 1;
    for (let j = 0; j < i; j++) num = (((num % m) * (noOfOdds - j)) % m) % m;
    let den = 1;
    for (let j = 0; j < i; j++) den = (((den % m) * (j + 1)) % m) % m;
    const comb = num / den;
    console.log("*", comb);
    odds = ((odds % m) + (comb % m)) % m;
  }
  console.log(odds);

  let oddsEvens = ((evens % m) * (odds % m)) % m;
  console.log(oddsEvens);

  let total = ((evens % m) + (odds % m) + (oddsEvens % m)) % m;
  console.log(total);
  return total;
}

solve();
