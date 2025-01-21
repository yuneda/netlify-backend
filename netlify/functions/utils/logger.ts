export const logAction = (action: string, details: any) => {
  console.log(`[${new Date().toISOString()}] ${action}:`, details);
};