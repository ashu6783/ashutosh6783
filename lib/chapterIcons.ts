import {
  Atom,
  Calculator,
  Compass,
  Flask,
  Function,
  Gauge,
  Globe,
  Lightbulb,
  Magnet,
  ChartPie,
  RocketLaunch,
  Ruler,
  Crosshair,
  Timer,
  Lightning
} from "phosphor-react";

export const chapterIconMap: { [key: string]: any } = {
  "Gravitation": Globe,
  "Math in Physics": Calculator,
  "Units and Dimensions": Ruler,
  "Motion in One Dimension long name": Crosshair,
  "Motion in Two Dimensions": Compass,
  "Laws of Motion": RocketLaunch,
  "Centre of Mass Equilibrium and Momentum": ChartPie,
  "Solid State": Atom,
  "Solutions": Flask,
  "Electrochemistry": Lightning,
  "Sets": Function,
  "Relations and Functions": Gauge,
  "Trigonometric Functions": Calculator,
};


export const defaultIcons = [
  Atom,
  Calculator,
  Compass,
  Flask,
  Gauge,
  Gauge,
  Globe,
  Lightbulb,
  Magnet,
  ChartPie,
  RocketLaunch,
  Crosshair,
  Timer,
  Lightning,
];


export const getChapterIcon = (chapterName: string) => {
  return chapterIconMap[chapterName] || defaultIcons[Math.floor(Math.random() * defaultIcons.length)];
};
