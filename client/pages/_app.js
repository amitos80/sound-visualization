import '../styles.css'
import React from "react";
// import Head from 'next/head';
//
// <Head>
//     <script src="https://cdn.jsdelivr.net/gh/foobar404/wave.js/dist/bundle.iife.js" />
// </Head>


function App({Component, pageProps}) {
  return (
    <div>
        {typeof window !== 'undefined' && <script src="https://cdn.jsdelivr.net/gh/foobar404/wave.js/dist/bundle.iife.js"></script>}
        <Component {...pageProps} />
    </div>
  )
}

export default App
