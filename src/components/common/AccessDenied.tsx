import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AccessDeniedProps {
  title?: string;
  message?: string;
  onBackClick?: () => void;
  moduleName?: string;
  isRtl?: boolean;
}

const AccessDenied = ({
  title = "Access Denied",
  message = "You don't have permission to access this module. Please contact your administrator if you believe this is an error.",
  onBackClick = () => window.history.back(),
  moduleName = "this module",
  isRtl = false,
}: AccessDeniedProps) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="border-destructive/30 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
                <ShieldAlert className="h-10 w-10 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl font-bold text-destructive">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground mb-4">
              {message.replace("this module", moduleName)}
            </p>
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <h3 className="font-medium mb-2">What you can do:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs mr-2 mt-0.5">
                    1
                  </span>
                  <span>Return to the dashboard and try another module</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs mr-2 mt-0.5">
                    2
                  </span>
                  <span>
                    Contact your system administrator to request access
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs mr-2 mt-0.5">
                    3
                  </span>
                  <span>
                    Check if you're logged in with the correct account
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={onBackClick} className="w-full" variant="outline">
              <ArrowLeft className={`h-4 w-4 ${isRtl ? "ml-2" : "mr-2"}`} />
              Return to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AccessDenied;
