const StayNestLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 230"
      fill="none"
      className="w-24 h-16"
      aria-label="StayNest logo"
      role="img"
    >
      <defs>
        <linearGradient id="staynest-pink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff385c" />
          <stop offset="100%" stopColor="#ff385c" />
        </linearGradient>

        <filter
          id="staynest-shadow"
          x="-30%"
          y="-30%"
          width="160%"
          height="170%"
        >
          <feDropShadow
            dx="1"
            dy="3"
            stdDeviation="2"
            floodColor="#000000"
            floodOpacity=".35"
          />
        </filter>

        <path id="staynest-text-arc" d="M 62 160 Q 160 264 258 160" />
      </defs>

      <g
        stroke="url(#staynest-pink)"
        strokeWidth="4.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d="M57 112 L57 81 L96 42 L135 81 L135 112" />
        <path d="M68 105 L68 85 L96 57 L124 85 L124 105" />
        <path d="M80 76 L96 60 L112 76" />
        <path d="M57 91 L96 52 L135 91" />

        <path d="M78 96 H89 V106 H78 Z" fill="#ff385c" stroke="none" />
        <path d="M101 96 H112 V106 H101 Z" fill="#ff385c" stroke="none" />
        <path d="M78 114 H89 V124 H78 Z" fill="#ff385c" stroke="none" />
        <path d="M101 114 H112 V124 H101 Z" fill="#ff385c" stroke="none" />

        <path d="M96 80 L160 19 L224 80" />
        <path d="M111 80 L160 34 L209 80" />
        <path d="M124 80 L160 48 L196 80" />

        <path d="M119 55 L134 40 M129 65 L149 45 M140 70 L155 56" />
        <path d="M201 55 L186 40 M191 65 L171 45 M180 70 L165 56" />

        <path d="M138 134 V82 Q160 53 182 82 V134 Z" />
        <path d="M160 82 V134 M139 105 H181" />

        <path d="M149 92 H156 V99 H149 Z" fill="#ff385c" stroke="none" />
        <path d="M164 92 H171 V99 H164 Z" fill="#ff385c" stroke="none" />
        <path d="M149 110 H156 V117 H149 Z" fill="#ff385c" stroke="none" />
        <path d="M164 110 H171 V117 H164 Z" fill="#ff385c" stroke="none" />

        <path d="M185 112 V81 L224 42 L263 81 V112" />
        <path d="M196 105 V85 L224 57 L252 85 V105" />
        <path d="M185 91 L224 52 L263 91" />

        <path d="M207 96 H218 V106 H207 Z" fill="#ff385c" stroke="none" />
        <path d="M230 96 H241 V106 H230 Z" fill="#ff385c" stroke="none" />
        <path d="M207 114 H218 V124 H207 Z" fill="#ff385c" stroke="none" />
        <path d="M230 114 H241 V124 H230 Z" fill="#ff385c" stroke="none" />
      </g>

      <g filter="url(#staynest-shadow)">
        <text
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="36"
          fontWeight="900"
          letterSpacing="6"
          fill="#ff385c"
          stroke="#ff385c"
          strokeWidth=".5"
          paintOrder="stroke fill"
        >
          <textPath
            href="#staynest-text-arc"
            startOffset="50%"
            textAnchor="middle"
          >
            STAYNEST
          </textPath>
        </text>
      </g>
    </svg>
  );
};

export default StayNestLogo;
