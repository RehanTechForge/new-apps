export const generateUniqueUrl = (name: string): string => {
  const username = name.toLowerCase().replace(/\s+/g, "-");
  return `${window.location.origin}/${username}/resume`;
};
