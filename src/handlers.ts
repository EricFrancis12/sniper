import { injectJSCode } from "./utils";
import { Handler } from "./types";

export function doHandle({ script, disabled }: Handler): void {
    if (!disabled) injectJSCode(script);
}
