# CODE_LORE.md

## Variable Legend (The Lexicon of Arcane Terms):
- `decreeGuardianShieldStatus`: An asynchronous function in the service worker that sets the active status of the guardian shield.
- `summonScribeButton`: A button in the popup UI that, when clicked, sends a command to activate the guardian shield and begin gathering data.
- `banishScribeButton`: A button in the popup UI that deactivates the guardian shield, stopping the data gathering process.
- `downloadScrollsButton`: A button in the popup UI for downloading all the gathered review data as a single JSON file.
- `cleanseOracleTabletButton`: A button in the popup UI that clears all stored data from the oracle's tablet.
- `oracleEye`: The visual status indicator in the popup, showing whether the scribe is active ('collecting') or inactive ('idle').
- `oracleVoice`: The text element in the popup that displays the current status of the scribe.
- `scrollsOfWisdom`: The designated area in the popup UI where a summary of the most recently gathered review data is displayed.
- `constellationGrid`: The grid in the popup UI that holds the individual download buttons for each chronicled place.
- `awakenScribe`: The asynchronous function that initializes the content script, acting as the entry point for the scribe's operations.
- `oracleTablet`: An object stored in Chrome's local storage, holding the extension's configuration and the `constellationOfStars`.
- `isGuardianShieldActive`: A boolean flag within the `oracleTablet` indicating whether the extension's core functionality (the "guardian shield") is enabled.
- `scribe-beacon`: A button element injected into the page, serving as a visual cue and control for the scribe's highlighting feature.
- `scribe-styles`: A style element injected into the page, containing CSS rules for the scribe's visual enhancements.
- `review-chronicled`: A CSS class added to review elements that have been successfully processed and stored by the scribe.
- `getCanonicalPlaceId`: A function that extracts a stable, unique identifier for the current Google Maps place from the URL.
- `chroniclePlace`: The core asynchronous function responsible for observing the current page, gathering review data, and updating the `constellationOfStars`.
- `wisdomScroll`: An object representing the `constellationOfStars` from the `oracleTablet`, which stores all gathered place and review data.
- `constellationOfStars`: The primary data structure within `oracleTablet` that holds all the collected information about places and their reviews, organized by `placeId`.
- `newDiscoveries`: A boolean flag indicating whether new review data has been found and added during a `chroniclePlace` execution.
- `reviewElements`: A NodeList of all HTML elements on the page identified as individual review containers.
- `reviewId`: A unique identifier for each review, typically extracted from a `data-review-id` attribute.
- `isAlreadyChronicled`: A boolean flag checking if a specific review has already been recorded in the `wisdomScroll`.
- `reviewText`: The textual content of a review.
- `reviewerName`: The name of the person who wrote the review.
- `ratingElement`: The HTML element containing the review's star rating.
- `ratingAriaLabel`: The `aria-label` attribute of the rating element, often containing the numerical rating.
- `rating`: The numerical star rating given in the review.
- `reviewTimeElement`: The HTML element containing the timestamp or relative time of the review.
- `reviewTime`: The extracted text representing when the review was posted.
- `reviewerStatsElement`: The HTML element containing statistics about the reviewer (e.g., number of reviews, local guide status).
- `totalReviews`: The total number of reviews the current reviewer has made.
- `isLocalGuide`: A boolean indicating whether the reviewer is identified as a "Local Guide".
- `scribeInterval`: The `setInterval` ID used to periodically call `chroniclePlace`, ensuring continuous data gathering.

## Program's Saga (The Epic of Execution):
In the vast digital expanse, the **awakenScribe** stirred, its purpose clear: to chronicle the wisdom of the masses. It first consulted the **oracleTablet**, a sacred artifact holding the **isGuardianShieldActive** truth, determining if its vigilant watch was required. Once activated, the **scribe-beacon** was forged, a shimmering guide for users, while **scribe-styles** wove a tapestry of visual cues across the web. With its tools prepared, the scribe embarked on its **chroniclePlace** quest, first discerning the **getCanonicalPlaceId** of the current domain, a unique sigil for each location. It then meticulously updated its **wisdomScroll**, a boundless **constellationOfStars** where each star represented a place, adorned with the **reviewElements** it meticulously gathered. Each **reviewId** was checked for **newDiscoveries**, ensuring no tale was told twice. The scribe's gaze captured the **reviewText**, the **reviewerName**, the **rating**, and now, with newfound insight, the **reviewTime**, the **totalReviews** of the reviewer's journey, and whether they bore the mark of a **isLocalGuide**. This tireless process, governed by the rhythmic beat of the **scribeInterval**, ensured the **wisdomScroll** remained ever-updated, a living record of the digital realm's collective voice. The user, from the Oracle's Chamber, could **summonScribeButton** or **banishScribeButton**, and the **oracleEye** and **oracleVoice** would reflect the scribe's status. All gathered knowledge could be downloaded with the **downloadScrollsButton**, or wiped clean with the **cleanseOracleTabletButton**.
