import { Loader2 } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-full w-full min-h-screen">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );
};

export default Spinner;
