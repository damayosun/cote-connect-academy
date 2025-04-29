
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const generalFormSchema = z.object({
  platformName: z.string().min(2, {
    message: "Platform name must be at least 2 characters.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  supportPhone: z.string().optional(),
  aboutText: z.string().optional(),
});

const notificationFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  newTutorAlert: z.boolean().default(true),
  sessionBookingAlert: z.boolean().default(true),
  weeklyReports: z.boolean().default(false),
});

type GeneralFormValues = z.infer<typeof generalFormSchema>;
type NotificationFormValues = z.infer<typeof notificationFormSchema>;

const AdminSettings: React.FC = () => {
  const { toast } = useToast();
  
  // General settings form
  const generalForm = useForm<GeneralFormValues>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      platformName: "COTE Tutoring Platform",
      contactEmail: "admin@cotetutor.com",
      supportPhone: "+1 (555) 123-4567",
      aboutText: "COTE is a leading online tutoring platform connecting students with professional tutors across various subjects.",
    },
  });

  // Notification settings form
  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      newTutorAlert: true,
      sessionBookingAlert: true,
      weeklyReports: false,
    },
  });

  // Handle general settings submission
  function onGeneralSubmit(data: GeneralFormValues) {
    toast({
      title: "General settings updated",
      description: "Your platform settings have been saved successfully.",
    });
  }

  // Handle notification settings submission
  function onNotificationSubmit(data: NotificationFormValues) {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved successfully.",
    });
  }

  // Handle API key regeneration
  const handleRegenerateApiKey = () => {
    toast({
      title: "API key regenerated",
      description: "Your new API key has been generated. Make sure to update any applications using the old key.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground">Configure platform settings and preferences</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3 h-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic platform settings and information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-6">
                  <FormField
                    control={generalForm.control}
                    name="platformName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Platform Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          This name will appear across the platform.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={generalForm.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormDescription>
                          Primary contact email for admin notifications.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={generalForm.control}
                    name="supportPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Support Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={generalForm.control}
                    name="aboutText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About Platform</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-[120px]"
                          />
                        </FormControl>
                        <FormDescription>
                          Brief description of your tutoring platform.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">Save Changes</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure which events trigger admin notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                  <FormField
                    control={notificationForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Email Notifications
                          </FormLabel>
                          <FormDescription>
                            Receive notifications via email.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={notificationForm.control}
                    name="newTutorAlert"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            New Tutor Registrations
                          </FormLabel>
                          <FormDescription>
                            Alert when a new tutor registers on the platform.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={notificationForm.control}
                    name="sessionBookingAlert"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Session Bookings
                          </FormLabel>
                          <FormDescription>
                            Alert when a new session is booked.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={notificationForm.control}
                    name="weeklyReports"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Weekly Reports
                          </FormLabel>
                          <FormDescription>
                            Receive weekly platform activity reports.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">Save Preferences</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* API Settings */}
        <TabsContent value="api" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>
                Manage API keys and access for integrations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="api-key"
                    type="password"
                    value="sk_live_51NXyuQEbTdN7rndNgQ2XkJEkZs53"
                    readOnly
                    className="font-mono"
                  />
                  <Button variant="outline" onClick={() => {
                    toast({
                      title: "API key copied",
                      description: "The API key has been copied to your clipboard.",
                    });
                  }}>
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  This key provides full access to your platform data. Keep it secure.
                </p>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium">API Usage Limits</h3>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground">Requests Today</div>
                      <div className="text-2xl font-bold">1,245</div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground">Monthly Limit</div>
                      <div className="text-2xl font-bold">50,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleRegenerateApiKey}>
                Regenerate API Key
              </Button>
              <Button variant="outline" onClick={() => {
                toast({
                  title: "API documentation opened",
                  description: "API documentation has been opened in a new tab.",
                });
              }}>
                View Documentation
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
