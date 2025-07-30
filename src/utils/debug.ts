/**
 * Debug logging utility that only logs in development or when explicitly enabled
 */
class DebugLogger {
  private enabled: boolean;

  constructor() {
    // Enable in development or when ?debug=true is in URL
    this.enabled = 
      import.meta.env.DEV || 
      new URLSearchParams(window.location.search).has('debug');
  }

  log(prefix: string, ...args: any[]) {
    if (this.enabled) {
      console.log(`[${prefix}]`, ...args);
    }
  }

  error(prefix: string, ...args: any[]) {
    if (this.enabled) {
      console.error(`[${prefix}]`, ...args);
    }
  }

  warn(prefix: string, ...args: any[]) {
    if (this.enabled) {
      console.warn(`[${prefix}]`, ...args);
    }
  }
}

export const debug = new DebugLogger();