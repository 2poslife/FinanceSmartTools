// src/utils/index.jsx
export const CLOUDFRONT_URL = 'https://d3egla0dyi6qxn.cloudfront.net/public';

export function createPageUrl(page) {
    return `/${page.toLowerCase()}`;
}
