import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Physical AI Concepts',
    Svg: require('../../static/img/ai-icon.svg').default,
    description: (
      <>
        Learn the fundamental concepts of Physical AI - where artificial intelligence meets the physical world.
      </>
    ),
  },
  {
    title: 'Humanoid Robotics',
    Svg: require('../../static/img/robot-icon.svg').default,
    description: (
      <>
        Explore the fascinating world of humanoid robots and their applications in real-world scenarios.
      </>
    ),
  },
  {
    title: 'Hands-On Learning',
    Svg: require('../../static/img/hands-on-icon.svg').default,
    description: (
      <>
        Engage with practical exercises and simulations to reinforce theoretical concepts.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}