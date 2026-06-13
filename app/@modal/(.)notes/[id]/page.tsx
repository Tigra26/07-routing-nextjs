import NotePreviewModal from "./NotePreview.client";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewPage({ params }: Props) {
  const { id } = await params;

  return <NotePreviewModal id={id} />;
}
