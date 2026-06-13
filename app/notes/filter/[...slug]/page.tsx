import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

const PER_PAGE = 12;
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

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, PER_PAGE, selectedTag],
    queryFn: () => fetchNotes("", 1, PER_PAGE, selectedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={selectedTag} />
    </HydrationBoundary>
  );
}