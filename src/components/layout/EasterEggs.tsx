export function EasterEggs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-[5%] animate-bounce" style={{ animationDuration: '3s' }}>
        <span className="text-3xl">🥚</span>
      </div>
      <div className="absolute top-32 right-[8%] animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
        <span className="text-4xl">🐣</span>
      </div>
      <div className="absolute top-48 left-[10%] animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
        <span className="text-3xl">🥚</span>
      </div>
      <div className="absolute top-24 right-[15%] animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '0.3s' }}>
        <span className="text-3xl">🐰</span>
      </div>
      <div className="absolute top-56 right-[5%] animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.8s' }}>
        <span className="text-4xl">🥚</span>
      </div>
      <div className="absolute top-40 left-[3%] animate-bounce" style={{ animationDuration: '2.7s', animationDelay: '1.2s' }}>
        <span className="text-3xl">🌷</span>
      </div>
    </div>
  )
}
