import axios from "axios";
import type { NewNoteData, Note } from "@/types/note";

// axios instance

const noteApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

// GET request 

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search: string,
  page: number,
  perPage: number, 
  tag?: string
): Promise<FetchNotesResponse> => {
  const params = {
    search,
    page,
    perPage,
    tag,
  };

  const { data } = await noteApi.get<FetchNotesResponse>("/notes", {
    params,
  });

  return data;
};

// GET request for one note by id

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const { data } = await noteApi.get<Note>(`/notes/${id}`);

  return data;
};

// POST request

export const createNote = async (newNoteData: NewNoteData): Promise<Note> => {
  const { data } = await noteApi.post<Note>("/notes", newNoteData);

  return data;
};

// DELETE request

export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const { data } = await noteApi.delete<Note>(`/notes/${id}`);

  return data;
};