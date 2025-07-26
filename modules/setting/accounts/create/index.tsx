import { useGetFilterOptions } from "../hooks/use-get-filter-options";

export const CreateAccount = () => {
  const { data: dataOptions } = useGetFilterOptions();
  console.log("🚀 ~ CreateAccount ~ dataOptions:", dataOptions);
  return <div>create account</div>;
};
