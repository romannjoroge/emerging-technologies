import { useQuery } from "@tanstack/react-query";
import { columns } from "./table/columns";
import Loader from "./loader";
import { samplePasswordData } from "@/constants";
import { DataTable } from "./table/data-table";

const MyDataTable = () => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["dummyData"],
    queryFn: async function getData() {
      return samplePasswordData;
    },
  });
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <div className="flex my-4 justify-center items-center  w-full h-96 text-red-600  text-sm font-semibold ">
        {error.message}
      </div>
    );
  }
  return (
    <div className="container  py-10">
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
};

export { MyDataTable };
