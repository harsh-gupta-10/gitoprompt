import { StarIcon, SparkleIcon } from './Icons';

export function Sparkles() {
  return (
    <>
      {/* Top-left large star — slow float */}
      <div className="absolute top-[3%] left-[8%] pointer-events-none anim-float" style={{ opacity: 0.5 }}>
        <StarIcon color="#1A1A1A" size={38} />
      </div>

      {/* Top-right sparkle — shifted float */}
      <div className="absolute top-[12%] right-[6%] pointer-events-none anim-float-2" style={{ opacity: 0.35 }}>
        <SparkleIcon color="#E5342A" size={28} />
      </div>

      {/* Mid-left tiny — slow spin */}
      <div
        className="absolute top-[40%] left-[3%] pointer-events-none hidden md:block anim-spin-slow"
        style={{ opacity: 0.18 }}
      >
        <StarIcon color="#1A1A1A" size={20} />
      </div>

      {/* Bottom-right large, float-3 */}
      <div
        className="absolute bottom-[4%] right-[10%] pointer-events-none hidden md:block anim-float-3"
        style={{ opacity: 0.45 }}
      >
        <StarIcon color="#F5C842" size={44} />
      </div>

      {/* Bottom-left sparkle */}
      <div
        className="absolute bottom-[22%] left-[6%] pointer-events-none hidden md:block anim-float-2"
        style={{ opacity: 0.25 }}
      >
        <SparkleIcon color="#22c55e" size={22} />
      </div>
    </>
  );
}
