import { redirect } from 'next/navigation';

export const metadata = {
  title: 'My Todo lists',
};

export default async function Page() {
  redirect('/lists');
}