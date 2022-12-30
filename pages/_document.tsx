/* eslint-disable @next/next/no-sync-scripts */
import Document, { 
  DocumentContext, 
  DocumentInitialProps, 
  Html, 
  Main, 
  NextScript, 
  Head 
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
      const initialProps = await Document.getInitialProps(ctx);

      return initialProps;
  }

  render(): JSX.Element {
      return (
        <Html>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
            <link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap" rel="stylesheet" />
          </Head>

          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      )
  }
}

export default MyDocument;
