export const UNIXTimestampToDate = (timestamp: number): Date => {
  const d = new Date(0);

  d.setUTCSeconds(timestamp);

  return d;
};
