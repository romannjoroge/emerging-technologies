import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { PasswordData } from "@/services";
import { ColumnActions } from "./column-actions";
export const columns: ColumnDef<PasswordData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    accessorKey: "service",

    header: ({ column }) => {
      return (
        <Button
          className=" p-0 "
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Service
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "password",
    header: "Password",
  },
  {
    accessorKey: "note",
    header: "Notes",
  },
  {
    id: "actions",
    cell: ({ row }) => <ColumnActions entry={row.original} />,
  },
];
