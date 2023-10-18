import React, { useState, useRef } from "react";

function CodeEditor() {
    // State to hold the code content
    const [code, setCode] = useState("");

    // State to determine if the editor is locked or unlocked
    const [isLocked, setIsLocked] = useState(false);

    // Reference to the textarea for direct DOM manipulation
    const textareaRef = useRef(null);

    /**
     * Handles the copy functionality.
     * Copies the content of the editor to the clipboard.
     */
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        alert("Code copied to clipboard!");
    };

    /**
     * Handles the save functionality.
     * Saves the content of the editor as a .txt file.
     */
    const handleSave = () => {
        const blob = new Blob([code], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "code.txt";
        a.click();
    };

    /**
     * Toggles the lock/unlock state of the editor.
     */
    const toggleLock = () => {
        setIsLocked(!isLocked);
    };

    /**
     * Handles the Tab key press for indentation.
     * Inserts 4 spaces at the current cursor position.
     * @param {Object} e - The event object.
     */
    const handleTabKey = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
            const start = textareaRef.current.selectionStart;
            const end = textareaRef.current.selectionEnd;

            // Insert 4 spaces for indentation
            setCode(
                (prevCode) =>
                    prevCode.substring(0, start) +
                    "    " +
                    prevCode.substring(end)
            );

            // Move the cursor to the right by 4 positions
            setTimeout(() => {
                textareaRef.current.selectionStart = start + 4;
                textareaRef.current.selectionEnd = start + 4;
            }, 0);
        }
    };

    return (
        <div className="editor">
            <textarea
                ref={textareaRef}
                className="editor__textarea"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleTabKey}
                readOnly={isLocked}
            />
            <div className="editor__buttons">
                <button
                    className="editor__button editor__button--copy"
                    onClick={handleCopy}
                >
                    Copy
                </button>
                <button
                    className="editor__button editor__button--save"
                    onClick={handleSave}
                >
                    Save
                </button>
                <button
                    className="editor__button editor__button--lock"
                    onClick={toggleLock}
                >
                    {isLocked ? "Unlock" : "Lock"}
                </button>
            </div>
        </div>
    );
}

export default CodeEditor;
