export function injectJSCode(code: string) {
    const scriptEle = document.createElement("script");
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.textContent = code;

    scriptEle.onload = () => scriptEle.remove();
    document.documentElement.appendChild(scriptEle);
}

export function downloadAsJsonFile<T>(data: T, fileName: string) {
    const content = JSON.stringify(data, null, 4);
    const blob = new Blob([content], { type: "application/json" });

    const aEle = document.createElement("a");
    aEle.download = fileName;
    aEle.href = URL.createObjectURL(blob);

    document.documentElement.appendChild(aEle);
    aEle.click();
    aEle.remove();
}
