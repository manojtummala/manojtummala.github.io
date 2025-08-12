export default function SchoolTalkzCase() {
  return (
    <article className="prose prose-invert max-w-none">
      <h1>SchoolTalkz — Analytics pipelines & React features</h1>
      <p><strong>Role:</strong> Data Engineer & React Developer • <strong>Period:</strong> Feb–Jun 2023</p>
      <p><strong>Stack:</strong> Python, React, PostgreSQL, Airflow/cron, AWS</p>

      <h2>TL;DR</h2>
      <ul>
        <li>Problem: ad-hoc analytics; fragile pipelines.</li>
        <li>Solution: incremental ETL with schema checks + alerts; React dashboards.</li>
        <li>Result: reliable daily jobs; faster UI loads via code-splitting.</li>
      </ul>

      <h2>Pipelines</h2>
      <ul>
        <li>Staging tables with constraints and data contracts.</li>
        <li>Idempotent loads with bookmark columns + retries.</li>
      </ul>

      <h2>Frontend</h2>
      <ul>
        <li>Chart pages with suspense + lazy routes.</li>
        <li>Reduced bundle by ~30% using dynamic imports.</li>
      </ul>

      <h2>Next steps</h2>
      <ul>
        <li>Backfill orchestration with better lineage.</li>
        <li>Feature store for reuse across models.</li>
      </ul>
    </article>
  );
}