import '@/src/index.css'
import '@/src/theme.css'
import '@/src/App.css'
import Layout from './components/Layout'

export const metadata = {
  title: 'مكتب زيدان',
  description: 'Finance Smart Tools',
  icons: {
    icon: 'https://d3egla0dyi6qxn.cloudfront.net/public/logo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Hide Next.js development overlay */
            [data-nextjs-dialog],
            [data-nextjs-dialog-overlay],
            nextjs-portal,
            #__next-build-watcher,
            [data-nextjs-toast],
            [data-nextjs-toast-list] {
              display: none !important;
            }
          `
        }} />
      </head>
      <body style={{ margin: 0, padding: 0, textAlign: 'center' }}>
        <div style={{ margin: 0, padding: 0, width: '100%' }}>
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  )
}

