const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// const test = asyncHandler((req, res, next) => {
//   if (req % 2 == 0) return req;
//   return Promise.reject("Odd values are not allowed");
// });

// test(7, 10, (err) => console.log(err));

export default asyncHandler;
