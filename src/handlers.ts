import { ActionEvent, HandlerName, Handler } from "./types";

export function doHandle(handlerName: HandlerName, actionEvent: ActionEvent): void {
    const record: Record<HandlerName, Handler> = {
        // TODO: ...
        [HandlerName.LOG]: logHandler,
    };

    return record[handlerName](actionEvent);
}

function logHandler(actionEvent: ActionEvent) {
    console.log("new action event:", actionEvent);
}
