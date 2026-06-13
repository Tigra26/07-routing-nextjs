"use client";

import css from "./NoteDetails.module.css";
import type { Note } from "@/types/note";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

export default function NoteDetailsClient() {
  const params = useParams<{ id: string }>();
  const id = params.id as Note["id"];

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  const formattedDate = new Date(note.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={css["container"]}>
      <div className={css["item"]}>
        <div className={css["header"]}>
          <h2>{note.title}</h2>
        </div>

        <p className={css["tag"]}>{note.tag}</p>
        <p className={css["content"]}>{note.content}</p>
        <p className={css["date"]}>{formattedDate}</p>
      </div>
    </div>
  );
}
