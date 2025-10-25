import AddBudget from "@/components/Budget/AddBudget/AddBudget";

interface Props {
  params: { id: number };
}

export default function EditBudget({ params }: Props) {
  const { id } = params;

  return <AddBudget id={id} />;
}
