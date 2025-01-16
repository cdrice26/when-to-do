/**
 * A configurable rate limiter that controls the number of requests per second
 */
export class RateLimiter {
  private lastRequestTime: number;
  private minTimeBetweenRequests: number; // in milliseconds

  /**
   * Create a new RateLimiter
   * @param requestsPerSecond Number of requests allowed per second
   */
  constructor(requestsPerSecond: number = 1) {
    this.lastRequestTime = 0;
    this.minTimeBetweenRequests = 1000 / requestsPerSecond; // convert to milliseconds
  }

  /**
   * Wait for the appropriate time between requests
   */
  async waitForToken(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;

    if (timeSinceLastRequest < this.minTimeBetweenRequests) {
      // Calculate how long we need to wait
      const waitTime = this.minTimeBetweenRequests - timeSinceLastRequest;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    this.lastRequestTime = Date.now();
  }
}
