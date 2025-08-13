export default function ReviewsVerseCase() {
  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">ReviewsVerse — Topic-tagged reviews platform</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">Role: Full-Stack • Period: May–Sep 2024</p>
        <div className="flex flex-wrap gap-2 text-xs">
          {["Next.js","Node.js","MongoDB","Kafka","S3","Docker"].map(s=>(
            <span key={s} className="rounded-full bg-slate-100 dark:bg-slate-700/50 px-2 py-0.5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">{s}</span>
          ))}
        </div>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">TL;DR</h2>
        <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li>Problem: high write amplification + slow reads on denormalized reviews.</li>
          <li>Solution: Kafka ETL to materialize query-optimized views + caching.</li>
          <li>Result: <strong>↓ p95 latency 30%</strong>, smoother spikes.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Architecture</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Ingestion → Kafka topics → ETL workers → MongoDB views + S3 media. API layer
          does read-through cache with stale-while-revalidate.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Key decisions</h2>
        <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li>Chose MongoDB for flexible tagging + compound indexes on (topic, created_at).</li>
          <li>Kept media in S3; presigned uploads to avoid hot backend paths.</li>
          <li>Backpressure via Kafka consumer groups; idempotent ETL.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">What I&#39;d improve</h2>
        <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li>Move cache keys to request-scoped hashes; add partial hydration to UI.</li>
          <li>Introduce e2e SLOs with RED metrics + synthetic checks.</li>
        </ul>
      </section>
    </article>
  );
}