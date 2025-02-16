import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LocationMap = () => {
    return (
        <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Office</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-lg px-5 pb-5">
              H-2553, Sayednagar, Vatara, Gulshan-2, Dhaka-1212
            </p>
          </CardContent>
        </Card>
        <div className="aspect-video overflow-hidden rounded-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.3038433024454!2d90.3642!3d23.7758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ2JzMyLjgiTiA5MMKwMjEnNTEuMiJF!5e0!3m2!1sen!2sbd!4v1639580000000!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    );
};

export default LocationMap;

