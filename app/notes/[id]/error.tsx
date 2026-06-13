"use client";
import css from "../error.module.css";

interface ErrorProps {
  error: Error;
}

export default function NoteDetailsError({ error }: ErrorProps) {
  return (
    <p className={css["text"]}>Could not fetch note details. {error.message}</p>
  );
}
