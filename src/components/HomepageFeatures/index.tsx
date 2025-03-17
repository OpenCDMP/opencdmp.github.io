// import clsx from 'clsx';
// import Heading from '@theme/Heading';
// import styles from './styles.module.css';

// type FeatureItem = {
//   title: string;
//   Svg: React.ComponentType<React.ComponentProps<'svg'>>;
//   description: JSX.Element;
// };

// const FeatureList: FeatureItem[] = [
//   {
//     title: 'Produce Plan outputs',
//     Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
//     description: (
//       <>
//         Close the data management planning lifecycle by publishing your Plans in a FAIR manner. Assign licenses, PIDs and publish Plans in a repository of your choice.
//       </>
//     ),
//   },
//   {
//     title: 'Update Plans',
//     Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
//     description: (
//       <>
//         Treat Plans as living documents. Secure their provenance and continue work in new versions (new DOIs assigned).
//       </>
//     ),
//   },
//   {
//     title: 'Re-use desriptions & templates',
//     Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
//     description: (
//       <>
//         Identify descriptions to be re-used in your Plan. Copy or clone descriptions to other Plans.
//       </>
//     ),
//   },
// ];

// function Feature({title, Svg, description}: FeatureItem) {
//   return (
//     <div className={clsx('col col--4')}>
//       <div className="text--center">
//         <Svg className={styles.featureSvg} role="img" />
//       </div>
//       <div className="text--center padding-horiz--md">
//         <Heading as="h3">{title}</Heading>
//         <p>{description}</p>
//       </div>
//     </div>
//   );
// }

// export default function HomepageFeatures(): JSX.Element {
//   return (
//     <section className={styles.features}>
//       <div className="container">
//         <div className="row">
//           {FeatureList.map((props, idx) => (
//             <Feature key={idx} {...props} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
