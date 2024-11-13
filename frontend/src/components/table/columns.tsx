import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { passwordEntrySchema } from "@/schema/zod";
import { MoreHorizontal, Trash, ArrowUpDown } from "lucide-react";
import z from "zod";
import { toast } from "sonner";

export const columns: ColumnDef<z.infer<typeof passwordEntrySchema>>[] = [
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
    cell: ({ row }) => {
      const entry = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(entry.password);
                toast.success("copied!");
              }}
            >
              Copy password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Update entry</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 flex space-x-2">
              Delete entry
              <Trash className="w-2 h-2" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
