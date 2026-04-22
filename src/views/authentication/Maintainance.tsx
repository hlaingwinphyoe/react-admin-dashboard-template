import { Link } from "react-router";
import ErrorImg from "@/assets/images/backgrounds/maintenance.svg";
import { Button } from "@/components/ui/button";

const Maintainance = () => {
  return (
    <>
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-lg mx-auto">
          <img src={ErrorImg} alt="error" className="mb-4" />
          <h1 className="mb-6 text-4xl text-foreground">Maintenance Mode!!!</h1>
          <h6 className="text-xl text-foreground">
            Website is Under Construction. Check back later!
          </h6>
          <Button variant={"default"} className="w-fit mt-6 mx-auto rounded-md">
            <Link to={"/"}>Go Back to Home</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Maintainance;
