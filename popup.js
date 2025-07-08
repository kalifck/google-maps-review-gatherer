// --- The Oracle's Chamber (Popup Script) ---

document.addEventListener('DOMContentLoaded', () => {
    const summonScribeButton = document.getElementById('start-gathering');
    const banishScribeButton = document.getElementById('stop-gathering');
    const downloadScrollsButton = document.getElementById('download-data');
    const cleanseOracleTabletButton = document.getElementById('clear-data');
    const oracleEye = document.getElementById('status-light');
    const oracleVoice = document.getElementById('status-text');
    const scrollsOfWisdom = document.getElementById('live-data-scroll');
    const constellationGrid = document.getElementById('place-buttons-grid');

    // A function to render the gathered data into a readable format and create individual download buttons
    function renderWisdomScroll(wisdomScroll) {
        if (!wisdomScroll || Object.keys(wisdomScroll).length === 0) {
            scrollsOfWisdom.textContent = 'No scrolls gathered yet.';
            constellationGrid.innerHTML = ''; // Clear any existing buttons
            return;
        }

        let displayText = '';
        const places = Object.values(wisdomScroll);
        places.forEach((place, index) => {
            displayText += `> ${place.name} (${place.reviews.length} reviews)\n`;
            place.reviews.slice(-5).forEach(review => { // Show last 5 reviews for brevity
                displayText += `  [${review.rating}★] ${review.reviewer.name}: \"${review.text.substring(0, 30)}...\"\n`;
            });
            if (index < places.length - 1) {
                displayText += '\n---\n\n'; // Separator
            }
        });
        scrollsOfWisdom.textContent = displayText;

        // Render individual download buttons
        constellationGrid.innerHTML = ''; // Clear previous buttons
        places.forEach(place => {
            const downloadButton = document.createElement('button');
            downloadButton.className = 'download-place-button';
            downloadButton.textContent = `${place.name.substring(0, 20)}...`;
            downloadButton.title = `Download all data for ${place.name}`;
            downloadButton.addEventListener('click', () => downloadIndividualPlaceData(place.name, place));
            constellationGrid.appendChild(downloadButton);
        });
    }

    // Function to download individual place data
    function downloadIndividualPlaceData(placeName, placeData) {
        const dataStr = JSON.stringify(placeData, null, 4);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const filename = `${placeName.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50)}_data_scroll.json`;
        chrome.downloads.download({
            url: url,
            filename: filename,
            saveAs: true
        });
    }

    // A function to consult the oracle's tablet for the current state
    async function reflectCurrentState() {
        const { oracleTablet } = await chrome.storage.local.get('oracleTablet');
        const isGathering = oracleTablet?.isGuardianShieldActive || false;
        const wisdomScroll = oracleTablet?.constellationOfStars;
        const hasData = wisdomScroll && Object.keys(wisdomScroll).length > 0;

        if (isGathering) {
            oracleEye.className = 'collecting';
            oracleVoice.textContent = 'Gathering...';
            summonScribeButton.classList.add('hidden');
            banishScribeButton.classList.remove('hidden');
        } else {
            oracleEye.className = 'idle';
            oracleVoice.textContent = 'Idle';
            summonScribeButton.classList.remove('hidden');
            banishScribeButton.classList.add('hidden');
        }
        downloadScrollsButton.disabled = !hasData;
        renderWisdomScroll(wisdomScroll);
    }

    // Send a command to the service worker
    function issueCommand(command) {
        chrome.runtime.sendMessage({ whisperedCommand: command });
    }

    // Event listeners for the user's actions
    summonScribeButton.addEventListener('click', () => issueCommand('activateGuardianShield'));
    banishScribeButton.addEventListener('click', () => issueCommand('deactivateGuardianShield'));
    cleanseOracleTabletButton.addEventListener('click', () => issueCommand('clearTheOracleTablet'));

    downloadScrollsButton.addEventListener('click', async () => {
        const { oracleTablet } = await chrome.storage.local.get('oracleTablet');
        if (oracleTablet?.constellationOfStars) {
            const dataStr = JSON.stringify(oracleTablet.constellationOfStars, null, 4);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            chrome.downloads.download({
                url: url,
                filename: 'google_maps_data_scrolls.json',
                saveAs: true
            });
        }
    });

    // Listen for state changes from the service worker
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local' && changes.oracleTablet) {
            reflectCurrentState();
        }
    });

    // Initial state reflection
    reflectCurrentState();
});