'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

// import { api } from "./libs/api";

const gitRepo = 'git clone git@github.com:altinthaqi/next-elysia-template.git';

export default function Home() {
  const [showNotification, setShowNotification] = useState(false);

  const handleClick = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  useEffect(() => {
    // api["sign-up"].post({
    //   username: "epsilono@elysia-template.com",
    //   password: "supersecret",
    // });
    // api.posts.index.get().then(console.log);
    // api["sign-in"]
    //   .post({
    //     username: "epsilono@elysia-template.com",
    //     password: "supersecret",
    //   });
  }, []);

  return (
    <main className={styles.main}>
      {showNotification && (
        <div className={styles.notification}>Copied to clipboard</div>
      )}
      <div className={styles.description}>
        <p
          style={{
            display: 'flex',
            gap: '10px',
            flexDirection: 'column',
            textAlign: 'start',
          }}
        >
          Get started by cloning the repo:&nbsp;
          <br />
          <br />
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <code className={styles.code}>{gitRepo}</code>
            <Image
              src='/copy-icon.png'
              alt='Next.js Logo'
              width={24}
              height={24}
              onClick={() => {
                navigator.clipboard.writeText(gitRepo);
                handleClick();
              }}
              style={{ cursor: 'pointer' }}
            />
          </span>
        </p>
        <div>
          <a href='https://elysiajs.com/' target='_blank'>
            <Image
              src='/elysia-logo.png'
              alt='ElysiaJS Logo'
              className={styles.vercelLogo}
              width={120}
              height={120}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <p style={{ textAlign: 'center' }}>
          <span className='title'>Next.js</span> &&nbsp;
          <span className='title'>ElysiaJS</span> template
        </p>
      </div>

      <div className={styles.grid}>
        <a
          href='https://github.com/elysiajs/eden'
          className={styles.card}
          target='_blank'
        >
          <h2>
            Eden <span>-&gt;</span>
          </h2>
          <p>
            Eden is a RPC-like client to connect Elysia end-to-end type safety
            using only TypeScript&apos;s type inference instead of code
            generation.
          </p>
        </a>

        <a
          href='https://www.prisma.io/'
          className={styles.card}
          target='_blank'
        >
          <h2>
            Prisma <span>-&gt;</span>
          </h2>
          <p>
            Prisma provides the best experience for your team to work and
            interact with databases. Build, optimize to make everything run
            smoothly, and grow.
          </p>
        </a>

        <a
          href='https://lucia-auth.com/'
          className={styles.card}
          target='_blank'
        >
          <h2>
            Lucia <span>-&gt;</span>
          </h2>
          <p>
            Lucia is a fully typed auth library for your server that abstracts
            away the complexity of handling sessions.
          </p>
        </a>

        <a href='https://swagger.io/' className={styles.card} target='_blank'>
          <h2>
            Swagger <span>-&gt;</span>
          </h2>
          <p>
            Write and visualize new API definitions to generate an interactive
            UI, fully-hosted in the cloud while simplifying API development.
          </p>
        </a>
      </div>
    </main>
  );
}
