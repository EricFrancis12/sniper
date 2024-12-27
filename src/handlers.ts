import { ActionEvent, HandlerName, Handler } from "./types";

export function doHandle(handlerName: HandlerName, actionEvent: ActionEvent): void {
    const record: Record<HandlerName, Handler> = {
        // TODO: ...
        [HandlerName.CHANGE_BACKGROUND_COLOR]: changeBackgroundColor,
    };

    return record[handlerName](actionEvent);
}

function changeBackgroundColor(_: ActionEvent) {
    document.body.style.backgroundColor = "red";
}
