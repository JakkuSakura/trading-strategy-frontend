export function throttle<T extends (...args: any) => unknown>(
  func: T,
  delay: number
) {
  let previousCall = 0;
  return function (...args: any) {
    const currentCall = new Date().getTime();
    if (currentCall - previousCall > delay) {
      previousCall = currentCall;
      // @ts-ignore
      func.apply(this, args);
    }
  };
}
