import { isEnvBrowser } from "./misc";

/**
 * Simple wrapper around fetch API tailored for CEF/NUI use. This abstraction
 * can be extended to include AbortController if needed or if the response isn't
 * JSON. Tailor it to your needs.
 *
 * @param eventName - The endpoint eventname to target
 * @param data - Data you wish to send in the NUI Callback
 * @param mockData - Mock data to be returned if in the browser
 *
 * @return returnData - A promise for the data sent back by the NuiCallbacks CB argument
 */

export async function fetchNui(component: string, event: string, data: any = null) {
    const resourceName = (window as any).GetParentResourceName ? (window as any).GetParentResourceName() : 'nui-frame-app';
    return new Promise((resolve, reject) => {
        fetch(`https://${resourceName}/uiMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                component: component,
                event: event,
                data: data,
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to POST event ${component}.${event} to backend`);
                }
                return response.json();
            })
            .then(resolve)
            .catch(error => {
                reject(error);
                console.warn(error.message);
                // Just never resolve (this should never fail on prod anyway)
            });
    });
}