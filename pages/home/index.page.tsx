import React from "react";
import Head from "next/head";
import Link from "next/link";

import Main from "../../designSystem/Main";
import { ContinueButton } from "../../designSystem/input/Button";

const Home = () => {
  return (
    <>
      <Head>
        <title>{"Accueil"}</title>
      </Head>
      <Main>
        <h2>Strangers</h2>
        <p>Three carefully crafted levels of questions and wildcards that allow you to deepen your existing relationships and create new ones.</p>
        <p>Ready?</p>
        <ContinueButton transparent noPadding>
          <Link href="/players">
            Continue ►
          </Link>
        </ContinueButton>
      </Main>
    </>
  );
}

export default Home;
