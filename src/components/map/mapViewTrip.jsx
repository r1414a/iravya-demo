import { useRef, useState, useEffect } from "react";

export default function MapView({ tripData }) {
  const { path, actualPath, onRoute, trip } = tripData;
  const [animOffset, setAnimOffset] = useState(0);
  const animRef = useRef();
 
  useEffect(() => {
    animRef.current = setInterval(() => setAnimOffset(p => (p + 1) % 20), 80);
    return () => clearInterval(animRef.current);
  }, []);
 
  const plannedD = path.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const actualD = actualPath.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const cur = actualPath[actualPath.length - 1];
  const isDelivered = trip.status === "delivered";
 
  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-200">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-emerald-50" />
      <svg width="100%" viewBox="0 0 570 400" className="block relative">
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8"/>
          </marker>
        </defs>
        {[...Array(12)].map((_, i) => (
          <line key={`h${i}`} x1="20" y1={30 + i * 30} x2="550" y2={30 + i * 30} stroke="#e2e8f0" strokeWidth="0.5"/>
        ))}
        {[...Array(18)].map((_, i) => (
          <line key={`v${i}`} x1={20 + i * 30} y1="10" x2={20 + i * 30} y2="390" stroke="#e2e8f0" strokeWidth="0.5"/>
        ))}
        <path d={plannedD} fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="8,5" markerEnd="url(#arr)"/>
        <path d={actualD} fill="none"
          stroke={onRoute ? "#0ea5e9" : "#f59e0b"}
          strokeWidth="3.5" strokeLinecap="round"
          strokeDasharray={isDelivered ? "none" : "200"}
          strokeDashoffset={isDelivered ? 0 : -animOffset * 2}
        />
        {path.map((p, i) => (
          <g key={i}>
            {(i === 0 || i === path.length - 1) && (
              <>
                <rect x={p.x - 30} y={p.y - 32} width={60} height={18} rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
                <text x={p.x} y={p.y - 19} textAnchor="middle" fontSize="9" fill="#475569" fontFamily="system-ui">{p.label}</text>
              </>
            )}
            <circle cx={p.x} cy={p.y} r={i === 0 || i === path.length - 1 ? 7 : 4}
              fill={i === 0 ? "#10b981" : i === path.length - 1 ? "#ef4444" : "#cbd5e1"}
              stroke="white" strokeWidth="2"/>
          </g>
        ))}
        {!isDelivered && cur && (
          <g transform={`translate(${cur.x},${cur.y})`}>
            <circle r="18" fill={onRoute ? "#0ea5e910" : "#f59e0b10"} stroke={onRoute ? "#0ea5e9" : "#f59e0b"} strokeWidth="1" strokeDasharray="3,2">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite"/>
            </circle>
            <circle r="11" fill={onRoute ? "#0284c7" : "#d97706"} stroke="white" strokeWidth="2"/>
            <text textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="white">🚛</text>
          </g>
        )}
        {isDelivered && cur && (
          <g transform={`translate(${cur.x},${cur.y})`}>
            <circle r="13" fill="#10b981" stroke="white" strokeWidth="2"/>
            <text textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="white">✓</text>
          </g>
        )}
        {!onRoute && actualPath.length > 2 && (() => {
          const dev = actualPath[Math.floor(actualPath.length / 2)];
          return (
            <g>
              <rect x={dev.x - 58} y={dev.y - 30} width={116} height={22} rx="5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1"/>
              <text x={dev.x} y={dev.y - 15} textAnchor="middle" fontSize="9" fill="#92400e" fontFamily="system-ui">⚠ Route deviation detected</text>
            </g>
          );
        })()}
        <g>
          <rect x="388" y="12" width="172" height="60" rx="7" fill="white" stroke="#e2e8f0" strokeWidth="1"/>
          <circle cx="403" cy="28" r="5" fill="#94a3b8"/>
          <line x1="410" y1="28" x2="434" y2="28" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,3"/>
          <text x="440" y="32" fontSize="9" fill="#64748b" fontFamily="system-ui">Planned route</text>
          <circle cx="403" cy="48" r="5" fill={onRoute ? "#0ea5e9" : "#f59e0b"}/>
          <line x1="410" y1="48" x2="434" y2="48" stroke={onRoute ? "#0ea5e9" : "#f59e0b"} strokeWidth="2.5"/>
          <text x="440" y="52" fontSize="9" fill="#64748b" fontFamily="system-ui">Actual path</text>
        </g>
      </svg>
      <div className="absolute bottom-3 left-3 flex gap-2">
        <span className="text-white text-xs px-3 py-1 rounded-full font-medium" style={{background:"#10b981"}}>● Start</span>
        <span className="text-white text-xs px-3 py-1 rounded-full font-medium" style={{background:"#ef4444"}}>● End</span>
        {onRoute
          ? <span className="text-xs px-3 py-1 rounded-full font-medium" style={{background:"#0ea5e9",color:"white"}}>✓ On Correct Path</span>
          : <span className="text-xs px-3 py-1 rounded-full font-medium" style={{background:"#f59e0b",color:"white"}}>⚠ Off Route</span>
        }
      </div>
    </div>
  );
}