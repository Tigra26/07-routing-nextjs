import { notFound } from "next/navigation";
import NotesClient from "../../Notes.client";

const allowedTags = ["all", "Todo", "Work", "Personal", "Meeting", "Shopping"];

interface NotesFilterPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function NotesFilterPage({
  params,
}: NotesFilterPageProps) {
  const { slug } = await params;

  if (slug.length !== 1) {
    notFound();
  }

  const tag = slug[0];

  if (!allowedTags.includes(tag)) {
    notFound();
  }

  const selectedTag = tag === "all" ? undefined : tag;

  return <NotesClient tag={selectedTag} />;
}
