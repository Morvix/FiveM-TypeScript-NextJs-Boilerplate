// Will return whether the current environment is in a regular browser
// and not CEF
export const isEnvBrowser = (): boolean => {
    if (typeof window === "undefined") {
        // Running on the server, so window is not available
        return false;
    }
    // Now safe to check for window-specific properties
    return !(window as any).invokeNative;
};

// Basic no operation function
export const noop = () => { };