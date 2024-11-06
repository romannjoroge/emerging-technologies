import { Toaster } from "@/components/ui/toaster";
import FormDrawer from "@/components/form-drawer";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <main className="min-h-screen w-screen relative bg-white flex-col p-2 px-4">
      <FormDrawer>
        <Button className="text-lg absolute right-6 h-10 top-1 font-semibold  w-28 rounded-md">
          <Plus className="w-4 h-4"></Plus>
          <div>Add</div>
        </Button>
      </FormDrawer>
      <Toaster />
    </main>
  );
}

export default App;
