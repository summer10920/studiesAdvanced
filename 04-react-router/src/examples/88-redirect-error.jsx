import {
  data,
  Form,
  isRouteErrorResponse,
  Link,
  redirect,
  useLoaderData,
  useRouteError,
} from 'react-router';
import { addNote, getNote, listNotes } from './notes-db.js';

/** 列表新增後 redirect 到明細；明細找不到時丟 404，由 errorElement 接住。 */
export const loader = ({ params }) => {
  if (!params.id) return { notes: listNotes() };
  const note = getNote(params.id);
  if (!note) throw data('找不到這則筆記', { status: 404 });
  return { note };
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = String(form.get('title') ?? '').trim();
  if (!title) return { error: '請填標題' };
  const note = addNote(title);
  return redirect(`/demos/88/${note.id}`);
};

export default function RedirectDemo() {
  const { notes } = useLoaderData();
  return (
    <section>
      <h1 className="text-2xl font-bold">88 redirect 與錯誤</h1>
      <Form method="post" className="mt-4 grid max-w-sm gap-3">
        <input
          name="title"
          className="rounded border px-2 py-1"
          placeholder="新的筆記標題"
        />
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white"
        >
          新增並前往
        </button>
      </Form>
      <p className="mt-4">
        <Link className="text-teal-800 underline" to="/demos/88/missing">
          打開一筆不存在的筆記
        </Link>
      </p>
      <ul className="mt-4 grid gap-2">
        {notes.map((note) => (
          <li key={note.id}>
            <Link
              className="text-teal-800 underline"
              to={`/demos/88/${note.id}`}
            >
              {note.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function NoteDetail() {
  const { note } = useLoaderData();
  return (
    <section>
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <p className="mt-2">{note.done ? '已完成' : '未完成'}</p>
      <p className="mt-4">
        <Link className="text-teal-800 underline" to="/demos/88">
          回列表
        </Link>
      </p>
    </section>
  );
}

export function NoteMissing() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error) ? error.data : '找不到';
  return (
    <section>
      <h1 className="text-2xl font-bold">找不到</h1>
      <p className="mt-2">{String(message)}</p>
      <p className="mt-4">
        <Link className="text-teal-800 underline" to="/demos/88">
          回列表
        </Link>
      </p>
    </section>
  );
}
