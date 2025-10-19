import AddTransaction from "@/components/Transactions/AddTransaction/AddTransaction";
interface Props {
  params: { id: number };
}

export default function EditTransaction({ params }: Props) {
  const { id } = params;

  return <AddTransaction id={id} />;
}
