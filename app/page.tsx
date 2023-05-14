import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { redirect } from 'next/navigation';
import { Header } from "../components/Header";

const prisma = new PrismaClient();

export const metadata = {
  title: 'My Todo lists',
};

export default async function Page() {
  redirect('/lists');
}