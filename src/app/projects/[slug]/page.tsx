import ReviewsVerseCase from "@/content/case/reviewsverse";

const MAP: Record<string, React.ComponentType> = {
  reviewsverse: ReviewsVerseCase,
};

export function generateStaticParams() {
  return Object.keys(MAP).map((slug) => ({ slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const Comp = MAP[params.slug];
  if (!Comp) return null;
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Comp />
    </main>
  );
}