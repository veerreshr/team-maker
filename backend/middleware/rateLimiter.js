import rateLimit from "express-rate-limit";

// set up rate limiter: maximum of five requests per minute
export const limiter = new rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30,
  message: "You have exceeded the 5 requests in 1 minute limit!",
  headers: true,
});
