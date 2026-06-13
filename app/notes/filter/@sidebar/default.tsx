import Link from "next/link";
import css from "./SidebarNotes.module.css";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function Default() {
  return (
    <aside className={css.sidebar}>
      <Link href="/notes/filter/all" className={css.link}>
        All notes
      </Link>

      {tags.map((tag) => (
        <Link key={tag} href={`/notes/filter/${tag}`} className={css.link}>
          {tag}
        </Link>
      ))}
    </aside>
  );
}