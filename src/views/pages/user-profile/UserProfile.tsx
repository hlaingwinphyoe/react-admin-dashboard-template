import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserProfile = () => {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <Card className="w-full max-w-md shadow-none">
        <CardHeader className="text-center">
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          This is your profile page.
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
