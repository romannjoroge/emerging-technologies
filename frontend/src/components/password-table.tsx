import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PasswordTable = () => {
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
