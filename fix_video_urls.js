const fs = require('fs');

// Read the file
let content = fs.readFileSync('src/assets/data/courseMock.js', 'utf8');

// Replace course 1 video URLs (those with מאזנים.mp4 that should be YouTube)
// We need to replace the ones that come before course 2 (מאזנים ביקורת והכנה)

// For homePageCourses
content = content.replace(
  /({\s*id: 1,\s*title: "שבשבת",[\s\S]*?videoUrl: )"\/מאזנים\.mp4"([\s\S]*?courseLink: "https:\/\/my\.schooler\.biz\/s\/94061)/g,
  '$1"https://www.youtube.com/embed/JCDvBOJpjJY"$2'
);

// For courses array
content = content.replace(
  /({\s*id: 1,\s*title: "שבשבת",[\s\S]*?videoUrl: )"\/מאזנים\.mp4"([\s\S]*?courseLink: "https:\/\/my\.schooler\.biz\/s\/94061)/g,
  '$1"https://www.youtube.com/embed/JCDvBOJpjJY"$2'
);

// Write back
fs.writeFileSync('src/assets/data/courseMock.js', content, 'utf8');
console.log('Fixed course 1 video URLs');

