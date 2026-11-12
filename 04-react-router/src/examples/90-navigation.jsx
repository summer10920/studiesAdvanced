import {
  Form,
  Link,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from 'react-router';
import { addNote, listNotes } from './notes-db.js';

/** 故意等 400ms，讓 useNavigation 的讀取中與送出中看得到。 */
export const loader = async () => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { notes: listNotes() };
};

export const action = async ({ request }) => {
  const form = await request.formData();
  await new Promise((resolve) => setTimeout(resolve, 400));
  const title = String(form.get('title') ?? '').trim();
  if (title) addNote(title);
  return null;
};

export default function NavigationDemo() {
  const { notes } = useLoaderData();
  const navigation = useNavigation();
  const [params] = useSearchParams();
  const nonce = Number(params.get('n') ?? '0');
  const pending =
    navigation.state === 'loading' || navigation.state === 'submitting';
  return (
    <section>
      <h1 className="text-2xl font-bold">90 useNavigation</h1>
      {pending ? <p className="mt-3">讀取中</p> : null}
      <p className="mt-3">
        <Link
          className="text-teal-800 underline"
          to={`/demos/90?n=${nonce + 1}`}
        >
          重新讀取
        </Link>
      </p>
      <Form method="post" className="mt-4 grid max-w-sm gap-3">
        <input
          name="title"
          className="rounded border px-2 py-1"
          placeholder="新的筆記標題"
        />
        <button
          type="submit"
          className="rounded bg-teal-800 px-3 py-1 text-white disabled:opacity-40"
          disabled={navigation.state === 'submitting'}
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
