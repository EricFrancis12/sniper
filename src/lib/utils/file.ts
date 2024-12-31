export async function utf8StringFromFile(file: File): Promise<string | null> {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            const arrayBuffer = e.target?.result;
            if (arrayBuffer instanceof ArrayBuffer) {
                const bytes = new Uint8Array(arrayBuffer);
                const decoder = new TextDecoder("utf-8");
                resolve(decoder.decode(bytes));
            }
            resolve(null);
        };

        reader.onerror = () => resolve(null);

        reader.readAsArrayBuffer(file);
    });
}
