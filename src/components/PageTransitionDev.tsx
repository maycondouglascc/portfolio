/**
 * Dev-only: PageTransition that uses DialKit. Lazy-loaded so production bundle
 * never includes dialkit or this file.
 */

import { useDialKit } from "dialkit"
import type { Location } from "react-router-dom"
import {
  PageTransitionInner,
  DEFAULT_TIMING,
  CONTAINER,
  CHILD,
  EXIT,
} from "./PageTransition"

export function PageTransitionWithDialKit({
  children,
  routeLocation,
}: {
  children: React.ReactNode
  routeLocation: Location
}) {
  const params = useDialKit("Page Transition", {
    timing: {
      exitDuration: [DEFAULT_TIMING.exitDuration, 0.05, 0.8],
      enterDelay: [DEFAULT_TIMING.enterDelay, 0, 0.8],
      enterDuration: [DEFAULT_TIMING.enterDuration, 0.1, 1.6],
      childDelay: [DEFAULT_TIMING.childDelay, 0, 1],
      childStagger: [DEFAULT_TIMING.childStagger, 0, 0.5],
      childDuration: [DEFAULT_TIMING.childDuration, 0.05, 1.2],
    },
    offsets: {
      containerY: [CONTAINER.initialY, 0, 100],
      childY: [CHILD.initialY, 0, 80],
    },
    opacity: {
      exitTarget: [EXIT.targetOpacity, 0, 1],
      containerStart: [CONTAINER.initialOpacity, 0, 1],
      childStart: [CHILD.initialOpacity, 0, 1],
    },
    easing: {
      exit: {
        type: "select" as const,
        options: ["linear", "easeIn", "easeOut", "easeInOut"],
        default: EXIT.ease,
      },
      enter: {
        type: "select" as const,
        options: ["linear", "easeIn", "easeOut", "easeInOut"],
        default: CONTAINER.ease,
      },
      child: {
        type: "select" as const,
        options: ["linear", "easeIn", "easeOut", "easeInOut"],
        default: CHILD.ease,
      },
    },
  })

  return (
    <PageTransitionInner
      children={children}
      routeLocation={routeLocation}
      params={params}
    />
  )
}
