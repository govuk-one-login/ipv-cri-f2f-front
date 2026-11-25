function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sleep(ms) {
  await timeout(ms);
}
