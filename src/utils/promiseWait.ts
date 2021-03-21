export const promiseWait = async (time: number) => {
  return new Promise((r) => setTimeout(r, time))
}