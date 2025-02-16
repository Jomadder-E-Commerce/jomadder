import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import LocationMap from "./LocationMap";

export default function Contact() {
  return (
    <div className=" md:p-8 sm:p-4 container p-3">
       <div className="grid gap-4 text-center">
              <h1 className="sm:text-2xl text-xl font-semibold md:text-3xl">Contact Us</h1>
              <p className="text-muted-foreground">Get in touch with our team</p>
            </div>
      <ContactInfo />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <LocationMap />
        <Card>
                <CardHeader>
                  <CardTitle>Need Assistance?</CardTitle>
                </CardHeader>
                <CardContent className="px-5">
                  <p className="text-muted-foreground mb-6">
                    If you have any questions, concerns, or require support, please don&apos;t hesitate to reach out. 
                  </p>
                  <ContactForm />
                </CardContent>
              </Card>
      </div>
    </div>
  );
}
