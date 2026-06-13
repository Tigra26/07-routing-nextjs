import type { NewNoteData, Note } from "@/types/note";
import { noteApi } from "./serverConfig";

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

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const { data } = await noteApi.get<Note>(`/notes/${id}`);

  return data;
};

export const createNote = async (newNoteData: NewNoteData): Promise<Note> => {
  const { data } = await noteApi.post<Note>("/notes", newNoteData);

  return data;
};

export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const { data } = await noteApi.delete<Note>(`/notes/${id}`);

  return data;
};