import { Suspense, lazy } from "react";
import { ClientOnly } from "@tanstack/react-router";

const HeroField = lazy(() => import("@/components/hero-field"));

export function HeroCanvas() {
  return (
    <div className="pointer-events-auto absolute inset-0" aria-hidden="true">
      <ClientOnly fallback={null}>
        <Suspense fallback={null}>
          <HeroField />
        </Suspense>
      </ClientOnly>
    </div>
  );
}
