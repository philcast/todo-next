import { PrismaClient } from "@prisma/client";
import { SideNav } from "../../components/SideNaw";
import { Header } from "../../components/Header";

const prisma = new PrismaClient();

export const metadata = {
  title: 'My Todo lists',
};

export default async function Page() {
  return (<span>"Select a list"</span>);
}