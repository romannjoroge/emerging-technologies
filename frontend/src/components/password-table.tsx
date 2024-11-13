import { GetPasswordData } from "@/services";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import Loader from "./loader";
const PasswordTable = () => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["PasswordData"],
    queryFn: GetPasswordData,
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
    <Table>
      <TableCaption className="mt-12">Page 1 out of ....</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Email</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Service</TableHead>
          <TableHead className="text-right">Password</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((entry, index) => {
          return (
            <TableRow key={index}>
              <TableCell className="font-medium">{entry.email}</TableCell>
              <TableCell>{entry.username}</TableCell>
              <TableCell>{entry.service}</TableCell>
              <TableCell className="text-right">{entry.password}</TableCell>
            </TableRow>
          );
        })}
        <TableRow>
          <TableCell className="font-medium">antonymbeka@gmail.com</TableCell>
          <TableCell>mbeka02</TableCell>
          <TableCell>Netflix</TableCell>
          <TableCell className="text-right">......</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default PasswordTable;
