import Head from "next/head";
import { useRouter } from 'next/router';

export default function Word() {
  const router = useRouter();
  const { word } = router.query;
  return (
    <>
      <Head>
        <title>{word} | Xaitsnoo Community Dictionary Project</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      This is {word}'s page.
    </>
  );
}
