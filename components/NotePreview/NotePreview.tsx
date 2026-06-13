"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/notesApi";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError) {
    return <p>Something went wrong.</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className={css["container"]}>
      <div className={css["item"]}>
        <div className={css["header"]}>
          <h2>{data.title}</h2>
          <span className={css["tag"]}>{data.tag}</span>
        </div>

        <p className={css["content"]}>{data.content}</p>

        <p className={css["date"]}>
          {new Date(data.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
