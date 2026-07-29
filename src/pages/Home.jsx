import { lazy } from "react";
import Section1 from "../components/homeComponentes/Section1";
import Section2 from "../components/homeComponentes/Section2";

import { PreloadOnScroll } from "../components/PreloadOnScroll";

const Section3 = lazy(() => import("../components/homeComponentes/Section3"));
const Section4 = lazy(() => import("../components/homeComponentes/Section4"));
const Section5 = lazy(() => import("../components/homeComponentes/Section5"));
const Section6 = lazy(() => import("../components/homeComponentes/Section6"));
const Section7 = lazy(() => import("../components/homeComponentes/Section7"));

export default function Home() {
  return (
    <>
      <Section1 />
      <Section2 />

      <PreloadOnScroll offset="800px">
        <Section3 />
      </PreloadOnScroll>

      <PreloadOnScroll offset="800px">
        <Section4 />
      </PreloadOnScroll>

      <PreloadOnScroll offset="800px">
        <Section5 />
      </PreloadOnScroll>

      <PreloadOnScroll offset="800px">
        <Section6 />
      </PreloadOnScroll>

      <PreloadOnScroll offset="800px">
        <Section7 />
      </PreloadOnScroll>
    </>
  );
}