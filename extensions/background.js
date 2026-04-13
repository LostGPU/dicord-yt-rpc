chrome.runtime.onMessage.addListener((data) => {
    fetch("http://localhost:3000/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).catch(() => {});
});