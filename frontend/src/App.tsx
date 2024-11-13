import { Toaster } from "sonner";
import FormDrawer from "@/components/form-drawer";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MyDataTable } from "./components/my-data-table";
import { DataTableDemo } from "./components/data-table";
function App() {
  return (
    <main className="min-h-screen w-screen relative bg-gray-50 flex-col p-2 px-4">
      <FormDrawer>
        <Button className=" absolute right-6  top-1 font-semibold  rounded-md">
          <Plus className="w-3 h-3"></Plus>
          <div>Add</div>
        </Button>
      </FormDrawer>
      <div className="md:ml-2 mt-12 ">
        <MyDataTable />
        <DataTableDemo />
      </div>
      <Toaster />
    </main>
  );
}

export default App;
