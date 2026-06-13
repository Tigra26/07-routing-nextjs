"use client";
import css from "../../error.module.css";

interface ErrorProps {
  error: Error;
}

export default function NotesError({ error }: ErrorProps) {
  return (
    <p className={css["text"]}>
      Could not fetch the list of notes. {error.message}
    </p>
  );
}
