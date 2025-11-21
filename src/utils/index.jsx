// src/utils/index.jsx
export const CLOUDFRONT_URL = 'https://d3egla0dyi6qxn.cloudfront.net/public';
// Helper function to get image URL
export function getImageUrl(filename) {
    return `${CLOUDFRONT_URL}/${filename}`;
}

export function createPageUrl(page) {
    return `/${page.toLowerCase()}`;
}
