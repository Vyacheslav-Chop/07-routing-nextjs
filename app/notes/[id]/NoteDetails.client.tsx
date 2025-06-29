"use client";
import { useQuery } from "@tanstack/react-query";
import css from "./NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import ErrorText from "@/components/Error/ErrorText";

export default function NoteDetailsClient() {
  const { id } = useParams();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(Number(id)),
    refetchOnMount: false,
  });

  return (
    <>
      {isLoading && <Loader />}
      {isError && <ErrorText message="Something went wrong." />}
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note?.title}</h2>
              <button className={css.editBtn}>Edit note</button>
            </div>
            <p className={css.content}>{note?.content}</p>
            <p className={css.date}>{note?.createdAt}</p>
          </div>
        </div>
      )}
    </>
  );
}
