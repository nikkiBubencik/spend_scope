import AddTransaction from "@/components/Transactions/AddTransaction/AddTransaction";
interface Props {
  params: Promise<{
    id: number;
  }>;
}

export default async function EditTransaction({ params }: Props) {
  const { id } = await params;

  return <AddTransaction id={id} />;
}
