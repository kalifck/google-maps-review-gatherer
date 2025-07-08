// --- The Humble Scribe (The Resilient, All-Seeing Gaze) ---

(async function awakenScribe() {
    if (document.getElementById('scribe-beacon')) return;
    const { oracleTablet } = await chrome.storage.local.get('oracleTablet');
    if (!oracleTablet || !oracleTablet.isGuardianShieldActive) return;

    const getText = (element) => element?.textContent?.trim() || '';
    const getAttribute = (element, attr) => element?.getAttribute(attr) || '';

    const injectScribeStyles = () => {
        const style = document.createElement('style');
        style.id = 'scribe-styles';
        style.textContent = `
            #scribe-beacon { position: fixed; top: 150px; right: 20px; z-index: 9999; background-color: #1a73e8; color: white; padding: 10px 15px; border-radius: 8px; font-family: sans-serif; font-size: 14px; cursor: pointer; border: none; box-shadow: 0 4px 8px rgba(0,0,0,0.2); transition: all 0.3s ease; }
            #scribe-beacon.highlighting { background-color: #188038; }
            body.show-scribe-marks .review-chronicled { background-color: rgba(80, 250, 123, 0.15) !important; border-left: 4px solid rgba(80, 250, 123, 0.7) !important; padding-left: 8px !important; transition: background-color 0.5s ease; }
        `;
        document.head.appendChild(style);
    };

    const forgeTheBeacon = () => {
        const beacon = document.createElement('button');
        beacon.id = 'scribe-beacon';
        beacon.textContent = 'Highlight Gathered Reviews';
        document.body.appendChild(beacon);
        beacon.addEventListener('click', () => {
            document.body.classList.toggle('show-scribe-marks');
            beacon.textContent = document.body.classList.contains('show-scribe-marks') ? 'Stop Highlighting' : 'Highlight Gathered Reviews';
            beacon.classList.toggle('highlighting');
        });
    };

    function getCanonicalPlaceId(url) {
        const match = url.match(/!1s(0x[a-f0-9]+:[a-f0-9]+)!/);
        if (match && match[1]) return match[1];
        const gMatch = url.match(/16s%2F(g%2F[a-zA-Z0-9_]+)/);
        if (gMatch && gMatch[1]) return decodeURIComponent(gMatch[1]);
        return null; // Return null if no reliable ID can be found
    }

    async function chroniclePlace() {
        try {
            const { oracleTablet: currentTablet } = await chrome.storage.local.get('oracleTablet');
            if (!currentTablet || !currentTablet.isGuardianShieldActive) {
                if (window.scribeInterval) clearInterval(window.scribeInterval);
                document.getElementById('scribe-beacon')?.remove();
                document.getElementById('scribe-styles')?.remove();
                return;
            }

            const placeId = getCanonicalPlaceId(window.location.href);
            if (!placeId) return; // Can't do anything without a stable ID.

            let wisdomScroll = currentTablet.constellationOfStars || {};
            let placeName = wisdomScroll[placeId]?.name; // Get name from storage if we already have it.

            if (!placeName) {
                placeName = getText(document.querySelector('h1.DUwDvf')); // Try to get it from the page.
                if (!placeName) return; // If we can't find a name for a new place, we can't proceed.
            }

            if (!wisdomScroll[placeId]) {
                wisdomScroll[placeId] = {
                    name: placeName,
                    rating: getText(document.querySelector('div.F7nice span.MW4ekc')),
                    reviews: [],
                    photoLinks: []
                };
            }

            let newDiscoveries = false;
            const reviewElements = document.querySelectorAll('div.jftiEf[data-review-id]');

            reviewElements.forEach(reviewElement => {
                const reviewId = getAttribute(reviewElement, 'data-review-id');
                if (!reviewId) return;

                const isAlreadyChronicled = wisdomScroll[placeId].reviews.some(r => r.id === reviewId);
                if (!isAlreadyChronicled) {
                    const reviewText = getText(reviewElement.querySelector('span.wiI7pd'));
                    const reviewerName = getText(reviewElement.querySelector('div.d4r55'));
                    const ratingElement = reviewElement.querySelector('span.kvMYJc');
                    const ratingAriaLabel = getAttribute(ratingElement, 'aria-label');
                    const rating = ratingAriaLabel ? parseInt(ratingAriaLabel.match(/\d+/)[0], 10) : 0;

                    // The Scribe's new insights: time, reviewer's journey, and local wisdom
                    const reviewTimeElement = reviewElement.querySelector('span.rsqaWe'); // Common class for time
                    const reviewTime = getText(reviewTimeElement);

                    const reviewerStatsElement = reviewElement.querySelector('div.RfnDt'); // Common parent for reviewer stats
                    let totalReviews = '';
                    let isLocalGuide = false;

                    if (reviewerStatsElement) {
                        const statsText = getText(reviewerStatsElement);
                        const reviewsMatch = statsText.match(/(\d+)\s+reviews/);
                        if (reviewsMatch) {
                            totalReviews = reviewsMatch[1];
                        }
                        isLocalGuide = statsText.includes('Local Guide');
                    }

                    if (reviewerName && rating > 0) {
                        wisdomScroll[placeId].reviews.push({
                            id: reviewId,
                            text: reviewText,
                            rating: rating,
                            reviewer: {
                                name: reviewerName,
                                totalReviews: totalReviews,
                                isLocalGuide: isLocalGuide
                            },
                            time: reviewTime
                        });
                        newDiscoveries = true;
                    }
                }
                
                if (wisdomScroll[placeId].reviews.some(r => r.id === reviewId)) {
                    reviewElement.classList.add('review-chronicled');
                }
            });

            if (newDiscoveries) {
                await chrome.storage.local.set({ oracleTablet: { ...currentTablet, constellationOfStars: wisdomScroll } });
            }
        } catch (error) {
            console.error("The Scribe stumbled but his gaze is unbroken. Error:", error);
        }
    }

    injectScribeStyles();
    forgeTheBeacon();
    chroniclePlace();
    window.scribeInterval = setInterval(chroniclePlace, 1500);

})();