/**
 * Asset resolution utility to handle local and remote PDF/Image paths.
 */
export const getAssetUrl = (path: string | undefined): string => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  // If the path already has a leading slash, treat it as a direct public asset
  if (path.startsWith('/')) return path;
  
  // Otherwise, fallback to the backend uploads endpoint
  return `/api/uploads/${path}`;
};
