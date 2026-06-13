"use client";

import css from "./NotesPage.module.css";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";

interface NotesClientProps {
  tag?: string;
}
const PER_PAGE = 12;

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ["notes", search, page, PER_PAGE, tag],
    queryFn: () => fetchNotes(search, page, PER_PAGE, tag),
    placeholderData: keepPreviousData,
  });

  if (isError) {
    throw error;
  }

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    if (!data || search === "" || isFetching || isError) {
      return;
    }

    if (data.notes.length === 0) {
      toast.error("No notes found for your request.");
    }
  }, [data, search, isFetching, isError]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const handleSearch = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  const handleNoteCreated = () => {
    setInputValue("");
    setSearch("");
    setPage(1);
    closeModal();
  };

  return (
    <main>
      <div className={css["app"]}>
        <header className={css["toolbar"]}>
          <SearchBox onSearch={handleSearch} value={inputValue} />

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              handlePage={setPage}
            />
          )}

          <button className={css["button"]} type="button" onClick={openModal}>
            Create note +
          </button>
        </header>

        {isLoading && <p>Loading, please wait...</p>}
        {notes.length > 0 && <NoteList notes={notes} />}

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onCancel={closeModal} onCreated={handleNoteCreated} />
          </Modal>
        )}
      </div>
    </main>
  );
}
