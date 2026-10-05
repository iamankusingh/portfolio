// Hero section if 3D Fails
export default function LandscapeFallback() {
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#748e96]"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="island-sky" x2="0" y2="1">
            <stop stopColor="#405c6b" />
            <stop offset="1" stopColor="#b7c4b8" />
          </linearGradient>
          <linearGradient id="island-water" x2="0" y2="1">
            <stop stopColor="#789a9a" />
            <stop offset="0.5" stopColor="#346572" />
            <stop offset="1" stopColor="#17323e" />
          </linearGradient>
        </defs>
        <path fill="url(#island-sky)" d="M0 0h1600v480H0z" />
        <path fill="url(#island-water)" d="M0 480h1600v520H0z" />
        <g fill="none" stroke="#b7c4c7" strokeOpacity="0.18">
          <path d="M0 540h250m900 10h450M70 700h340m760 25h400M0 880h500m550 10h550" />
        </g>
      </svg>
      <div className="absolute top-[18%] left-1/2 size-[clamp(2.5rem,6vw,5rem)] -translate-x-1/2 rounded-full bg-sun" />
      <svg
        className="absolute top-[24%] h-[65%] w-full px-6"
        viewBox="0 0 800 620"
        preserveAspectRatio="xMidYMid meet"
      >
        <ellipse
          cx="400"
          cy="445"
          rx="330"
          ry="110"
          fill="#78a799"
          opacity="0.22"
        />
        <path
          fill="none"
          stroke="#b7c4b8"
          strokeOpacity="0.55"
          strokeWidth="3"
          d="m90 426 48-45 114-32 149-10 143 18 116 53 42 54-65 57-182 37-187-18-138-52Z"
        />
        <path
          fill="#898b6a"
          d="m107 423 73-60 181-34 177 27 106 55 43 51-65 46-173 36-182-16-129-51Z"
        />
        <path
          fill="#668450"
          d="m124 416 81-56 147-36 171 31 110 53 34 44-85 37-129 35-160-18-132-41Z"
        />
        <path fill="#82945b" d="m124 416 188-41 141 149-160-18-132-41Z" />
        <path fill="#526f47" d="m312 375 211-20 110 53 34 44-85 37-129 35Z" />
        <path
          fill="#728078"
          d="m242 413 64-129 79-177 58 68 35 71 39-28 89 196-123 64Z"
        />
        <path fill="#a2aaa0" d="m306 284 79-177 16 111-45 40-23 75Z" />
        <path fill="#526460" d="m385 107 58 68 35 71-33 144-44-172Z" />
        <path fill="#87938a" d="m478 246 39-28 89 196-104-73Z" />
        <path fill="#405650" d="m445 390 33-144 24 95 104 73-123 64Z" />
        <path
          fill="#64814e"
          d="m242 413 91-80 23-75 45 108 44 24 38 88-83-33Z"
        />
        <g fill="none" stroke="#a1af73" strokeWidth="3" strokeLinecap="round">
          <path d="m220 445-4-15m4 15 7-11m311 29-3-17m3 17 7-12m-226 40-3-14m3 14 6-10m272-47 2-15m-2 15-7-10m-403-7-3-12" />
        </g>
      </svg>
    </div>
  );
}
