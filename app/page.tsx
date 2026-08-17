import { Clock } from "./components/Clock";
import { ListenerCount } from "./components/ListenerCount";
import { SocialLinks } from "./components/SocialLinks";
import { Player } from "./components/Player";

export default function Home() {
  return (
    <main className="relative isolate flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      {/* Background image, orientation-aware */}
      <div className="hero-bg fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/60" />
      </div>

      {/* Film grain */}
      <div className="grain-overlay pointer-events-none fixed inset-0 -z-10" />

      {/* Top row: clock left, listener count centre, social links right */}
      <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(1rem,env(safe-area-inset-top))]">
        <Clock />
        <div className="absolute left-1/2 -translate-x-1/2">
          <ListenerCount />
        </div>
        <SocialLinks />
      </div>

      {/* Player, bottom-anchored */}
      <div className="fixed inset-x-0 bottom-0 z-10 flex justify-center pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Player />
      </div>
    </main>
  );
}
