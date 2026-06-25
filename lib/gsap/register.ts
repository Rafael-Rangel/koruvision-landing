"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(
    ScrollTrigger,
    Observer,
    Flip,
    MotionPathPlugin,
    MorphSVGPlugin,
    DrawSVGPlugin,
    SplitText
  );
  registered = true;
}

export {
  gsap,
  ScrollTrigger,
  Observer,
  Flip,
  MotionPathPlugin,
  MorphSVGPlugin,
  DrawSVGPlugin,
  SplitText,
};
