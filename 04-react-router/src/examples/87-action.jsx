import { Form, useActionData, useLoaderData } from 'react-router';
import { addNote, listNotes } from './notes-db.js';

/** Form 送到這條路由的 action，寫進同一份筆記後 loader 會自己重跑。 */
export const loader = () => ({ notes: listNotes() });

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = String(form.get('title') ?? '').trim();
  if (!title) return { error: '請填標題' };
  addNote(title);
  return { error: '' };
};

export default function ActionDemo() {
  const { notes } = useLoaderData();
  const result = useActionData();
  return (
    <section>
      <h1 className="text-2xl font-bold">87 action 與 Form</h1>
      <Form method="post" className="mt-4 grid max-w-sm gap-3">
        <input
          name="title"
          className="rounded border px-2 py-1"
          placeholder="新的筆記標題"
        />
        {result?.error ? <p className="text-red-700">{result.error}</p> : null}
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white"
        >
          新增
        </button>
      </Form>
      <ul className="mt-4 grid gap-2">
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </section>
  );
}
