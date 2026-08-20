// Simulates an API call that randomly succeeds or fails
export const fakeApiCall = async (shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("API Error: Network request failed. Rolling back..."));
      } else {
        resolve({ success: true });
      }
    }, 800); // 800ms network latency
  });
};
