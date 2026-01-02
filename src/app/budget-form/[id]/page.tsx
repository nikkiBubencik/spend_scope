import AddBudget from "@/components/Budget/AddBudget/AddBudget";

interface Props {
  params: Promise<{
    id: number;
  }>;
}

export default async function EditBudget({ params }: Props) {
  const { id } = await params;

  return <AddBudget id={id} />;
}
