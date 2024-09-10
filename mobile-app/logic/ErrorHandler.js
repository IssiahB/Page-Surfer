/**
 * This function simply prints out more information about the error
 * for troubleshooting purposes.
 * @param {Error} error The error thown by an api request.
 */
export function handleApiError(error) {
    if (!error.response) {
        // Network Error
        console.error("Network Error: ", error.message);
    } else if (error.code === "ECONNABORTED") {
        // Request Timeout
        console.error("Request timed out:", error.message);
    } else if (error.response) {
        // Server responded with a status outside the 2xx range
        console.error("Server responded with incorrect code: ", error.message);
    } else if (error.request) {
        // Request was made, but no response was received
        console.error("No response received:", error.request);
    } else {
        // Unexpected Error
        console.error("Unexpected Error: ", error.message);
    }
}
