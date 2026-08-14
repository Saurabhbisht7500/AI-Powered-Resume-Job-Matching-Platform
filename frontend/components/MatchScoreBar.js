export default function MatchScoreBar({ score }) {
  const color = score >= 70 ? "#1c8a4c" : score >= 40 ? "#d19b0b" : "#b3392f";

  return (
    <div className="bar-track">
      <div
        className="bar-fill"
        style={{ width: `${score}%`, background: color }}
      />
    </div>
  );
}
