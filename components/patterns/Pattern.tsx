import PatternCreator from "./patternModule"

export default function Pattern ({ h,w }:{h: number, w: number}) {
  return PatternCreator(h, w).createPattern()
}
