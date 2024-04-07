// // I M P O R T:   F I L E S
// import "../styles/themeButton.scss";

// // I M P O R T:   P A C K A G E S

// // I M P O R T:   F U N C T I O N S

// // C O D E
// import React, { useState, useRef, useEffect, Fragment } from "react";
// import { gsap } from "gsap";

// const ThemeButton: React.FC = () => {
//   const [checked, setChecked] = useState<boolean>(false);
//   const [count, setCount] = useState<number>(1);
//   const bearRef = useRef<SVGSVGElement>(null);
//   const swearRef = useRef<HTMLDivElement>(null);
//   const armWrapRef = useRef<HTMLDivElement>(null);
//   const pawRef = useRef<HTMLDivElement>(null);
//   const armRef = useRef<SVGSVGElement>(null);
//   const bgRef = useRef<HTMLDivElement>(null);
//   const indicatorRef = useRef<HTMLDivElement>(null);

//   const armLimit: number = gsap.utils.random(0, 3);
//   const headLimit: number = gsap.utils.random(armLimit + 1, armLimit + 3);
//   const angerLimit: number = gsap.utils.random(headLimit + 1, headLimit + 3);
//   const armDuration: number = 0.2;
//   const bearDuration: number = 0.25;
//   const checkboxDuration: number = 0.25;
//   const pawDuration: number = 0.1;

//   const SOUNDS = {
//     ON: new Audio("https://assets.codepen.io/605876/switch-on.mp3"),
//     OFF: new Audio("https://assets.codepen.io/605876/switch-off.mp3"),
//     GROAN: new Audio("https://assets.codepen.io/605876/bear-groan.mp3"),
//   };
//   SOUNDS.GROAN.playbackRate = 2;

//   const onHover = () => {
//     if (Math.random() > 0.5 && count > armLimit) {
//       gsap.to(bearRef.current, bearDuration / 2, { y: "40%" });
//     }
//   };

//   const offHover = () => {
//     if (!checked) {
//       gsap.to(bearRef.current, bearDuration / 2, { y: "100%" });
//     }
//   };

//   const onChange = () => {
//     if (checked) return;
//     setChecked(true);
//   };

//   useEffect(() => {
//     const grabBearTL = () => {
//       // Animation timeline for grabbing the bear
//       let bearTranslation;
//       if (count > armLimit && count < headLimit) {
//         bearTranslation = "40%";
//       } else if (count >= headLimit) {
//         bearTranslation = "0%";
//       }
//       const onComplete = () => {
//         setChecked(false);
//         setCount(count + 1);
//       };
//       let onBearComplete = () => {};
//       if (Math.random() > 0.5 && count > angerLimit)
//         onBearComplete = () => {
//           SOUNDS.GROAN.play();
//           gsap.set(swearRef.current, { display: "block" });
//         };
//       const base = armDuration + armDuration + pawDuration;
//       const preDelay = Math.random();
//       const delay = count > armLimit ? base + bearDuration + preDelay : base;
//       const bearTL = gsap.timeline({ delay: Math.random(), onComplete });
//       bearTL
//         .add(
//           count > armLimit
//             ? gsap.to(bearRef.current, {
//                 duration: bearDuration,
//                 onComplete: onBearComplete,
//                 y: bearTranslation,
//               })
//             : () => {}
//         )
//         .to(
//           armWrapRef.current,
//           { x: 50, duration: armDuration },
//           count > armLimit ? preDelay : 0
//         )
//         .to(armRef.current, { scaleX: 0.7, duration: armDuration })
//         .to(pawRef.current, {
//           duration: pawDuration,
//           scaleX: 0.8,
//           onComplete: () => gsap.set(swearRef.current, { display: "none" }),
//         })
//         .to(
//           bgRef.current,
//           {
//             onStart: () => {
//               SOUNDS.OFF.play();
//             },
//             duration: checkboxDuration,
//             backgroundColor: "#aaa",
//           },
//           delay
//         )
//         .to(
//           indicatorRef.current,
//           { duration: checkboxDuration, x: "0%" },
//           delay
//         )
//         .to(pawRef.current, { duration: pawDuration, scaleX: 0 }, delay)
//         .to(
//           armRef.current,
//           { duration: pawDuration, scaleX: 1 },
//           delay + pawDuration
//         )
//         .to(
//           armWrapRef.current,
//           { duration: armDuration, x: 0 },
//           delay + pawDuration
//         )
//         .to(
//           bearRef.current,
//           { duration: bearDuration, y: "100%" },
//           delay + pawDuration
//         );
//       return bearTL;
//     };
//     const showTimeline = () => {
//       gsap
//         .timeline({
//           onStart: () => SOUNDS.ON.play(),
//         })
//         .to(
//           bgRef.current,
//           { duration: checkboxDuration, backgroundColor: "#2eec71" },
//           0
//         )
//         .to(indicatorRef.current, { duration: checkboxDuration, x: "100%" }, 0)
//         .add(grabBearTL(), checkboxDuration);
//     };
//     if (checked) showTimeline();
//   }, [checked, count, armLimit, headLimit, angerLimit]);

//   return (
//     <Fragment>
//       <div className="bear__wrap">
//         <div ref={swearRef} className="bear__swear">
//           #@$%*!
//         </div>
//         <svg
//           ref={bearRef}
//           className="bear"
//           viewBox="0 0 284.94574 359.73706"
//           preserveAspectRatio="xMinYMin"
//         >
//           {/* SVG bear image */}
//           <g id="layer1" transform="translate(-7.5271369,-761.38595)">
//             {/* SVG paths and elements */}
//           </g>
//         </svg>
//       </div>
//       <div ref={armWrapRef} className="bear__arm-wrap">
//         <svg
//           ref={armRef}
//           className="bear__arm"
//           viewBox="0 0 250.00001 99.999997"
//           preserveAspectRatio="xMinYMin"
//         >
//           {/* SVG arm image */}
//           <g transform="translate(868.57141,-900.93359)" id="layer1">
//             {/* SVG paths and elements */}
//           </g>
//         </svg>
//       </div>
//       <div ref={pawRef} className="bear__paw" />
//       <div className="mask" />
//       <div
//         className="checkbox"
//         onMouseOver={onHover}
//         onMouseOut={offHover}
//         onClick={onChange}
//       >
//         <input type="checkbox" checked={checked} />
//         <div ref={bgRef} className="checkbox__bg" />
//         <div ref={indicatorRef} className="checkbox__indicator" />
//       </div>
//     </Fragment>
//   );
// };

// export default ThemeButton;
