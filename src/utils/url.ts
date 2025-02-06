export async function dataURLtoBlobAsync(dataurl: string): Promise<Blob> {
    try {
        const res = await fetch(dataurl);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.blob();
    } catch (error) {
        console.error('Error converting DataURL to Blob:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}