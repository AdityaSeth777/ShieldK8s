/**
 * Safely get a number from environment variables with a default value
 */
export const getEnvNumber = (key: string, defaultValue: number): number => {
    const value = process.env[key];
    if (!value) return defaultValue;
    
    const parsed = Number(value);
    return isNaN(parsed) ? defaultValue : parsed;
  };
  
  /**
   * Safely get a string from environment variables with a default value
   */
  export const getEnvString = (key: string, defaultValue: string): string => {
    return process.env[key] || defaultValue;
  };