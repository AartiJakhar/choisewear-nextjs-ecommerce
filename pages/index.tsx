import Head from "next/head";
import Banner from "../components/Banner";
import Content from "../components/Content";

export default function Home() {

  return (
    <>
    <Head>
       <title>ChoiceWear.com - Wear the code</title>
       <meta  name="description" content="ChoiceWear.com - Wear the code"/>
       <link rel="icon" href="/fevicon.png"/>
    </Head>
    <Banner/>
    <Content/>

  </>
  )
}
