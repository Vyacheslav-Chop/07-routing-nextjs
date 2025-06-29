import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type PreviewProps = {
  params: Promise<{ id: string }>;
};

export default async function Preview({ params }: PreviewProps) {
  const { id } = await params;

  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(Number(id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={Number(id)} />
    </HydrationBoundary>
  );
}
