export default function ReviewsVerseCase() {
  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">ReviewsVerse — Topic-tagged reviews platform</h1>
        <p className="text-sm text-muted-foreground">Role: Full-Stack • Period: May–Sep 2024</p>
        <div className="flex flex-wrap gap-2 text-xs">
          {["Next.js","Node.js","MongoDB","Kafka","S3","Docker"].map(s=>(
            <span key={s} className="rounded-full bg-black/5 dark:bg-white/5 px-2 py-0.5">{s}</span>
          ))}
        </div>
      </header>

      <section>
        <h2 className="text-lg font-semibold">TL;DR</h2>
        <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
          <li>Problem: high write amplification + slow reads on denormalized reviews.</li>
          <li>Solution: Kafka ETL to materialize query-optimized views + caching.</li>
          <li>Result: <strong>↓ p95 latency 30%</strong>, smoother spikes.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Architecture</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Ingestion → Kafka topics → ETL workers → MongoDB views + S3 media. API layer
          does read-through cache with stale-while-revalidate.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Key decisions</h2>
        <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
          <li>Chose MongoDB for flexible tagging + compound indexes on (topic, created_at).</li>
          <li>Kept media in S3; presigned uploads to avoid hot backend paths.</li>
          <li>Backpressure via Kafka consumer groups; idempotent ETL.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">What I’d improve</h2>
        <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
          <li>Move cache keys to request-scoped hashes; add partial hydration to UI.</li>
          <li>Introduce e2e SLOs with RED metrics + synthetic checks.</li>
        </ul>
      </section>
    </article>
  );
}