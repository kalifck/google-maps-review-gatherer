# Google Maps Review Gatherer

This Chrome extension allows you to easily gather reviews from Google Maps listings. It provides a simple interface to extract review data and save it in a structured JSON format.

## How to Use

1.  **Navigate to a Google Maps Listing:** Open Google Maps in your Chrome browser and go to the page of the business or location you want to gather reviews from.
2.  **Open the Extension:** Click on the extension's icon in your browser's toolbar.
3.  **Start Gathering:** The extension will automatically detect the reviews on the page and begin gathering them. The gathered reviews will be displayed in the extension's popup.
4.  **Save the Data:** Once the extension has finished gathering the reviews, you can click the "Save" button to download the data as a JSON file.

## Data Structure

The gathered data is saved in a JSON file with the following structure:

```json
[
  {
    "review_text": "The review text...",
    "rating": 5,
    "user_name": "John Doe",
    "review_date": "2 weeks ago"
  },
  {
    "review_text": "Another review...",
    "rating": 4,
    "user_name": "Jane Smith",
    "review_date": "a month ago"
  }
]
```

Each object in the JSON array represents a single review and contains the following fields:

*   `review_text`: The full text of the review.
*   `rating`: The star rating given by the user (1-5).
*   `user_name`: The name of the user who wrote the review.
*   `review_date`: The date the review was posted.
