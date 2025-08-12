import ReviewsVerseCase from "@/content/case/reviewsverse";
import { notFound } from "next/navigation";

const MAP: Record<string, React.ComponentType> = {
  reviewsverse: ReviewsVerseCase,
};

export function generateStaticParams() {
  return Object.keys(MAP).map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const Comp = MAP[slug];
  if (!Comp) notFound();
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Comp />
    </main>
  );
}