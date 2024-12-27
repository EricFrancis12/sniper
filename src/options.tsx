import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function Options() {
    const [color, setColor] = useState("");
    const [status, setStatus] = useState("");
    const [like, setLike] = useState(false);

    useEffect(() => {
        // Restores select box and checkbox state using the preferences
        // stored in chrome.storage.
        chrome.storage.sync.get(
            {
                favoriteColor: "red",
                likesColor: true,
            },
            (items) => {
                setColor(items.favoriteColor);
                setLike(items.likesColor);
            },
        );
    }, []);

    const saveOptions = () => {
        // Saves options to chrome.storage.sync.
        chrome.storage.sync.set(
            {
                favoriteColor: color,
                likesColor: like,
            },
            () => {
                // Update status to let user know options were saved.
                setStatus("Options saved.");
                const id = setTimeout(() => {
                    setStatus("");
                }, 1000);
                return () => clearTimeout(id);
            }
        );
    };

    return (
        <>
            <div>
                Favorite color: <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                >
                    <option value="red">red</option>
                    <option value="green">green</option>
                    <option value="blue">blue</option>
                    <option value="yellow">yellow</option>
                </select>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={like}
                        onChange={(e) => setLike(e.target.checked)}
                    />
                    I like colors.
                </label>
            </div>
            <div>{status}</div>
            <button onClick={saveOptions}>Save</button>
        </>
    );
};

const root = createRoot(document.getElementById("root")!);

root.render(
    <React.StrictMode>
        <Options />
    </React.StrictMode>
);
