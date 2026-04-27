import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <Card className="w-full max-w-md shadow-none">
        <CardHeader className="text-center">
          <CardTitle>You&apos;re logged in</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          Welcome back to your dashboard.
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
