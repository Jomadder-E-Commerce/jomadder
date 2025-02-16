"use client";

import { usePostcontactMutation } from "@/components/Redux/services/contactApi/contactApi";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import { toast } from "react-toastify"; // Add the toast library for notifications

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postcontact] = usePostcontactMutation(); // Mutation hook
  const formRef = useRef(null); // Reference to the form element

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setIsSubmitting(true);
  
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };
  
    // Validation
    if (!data.name || !data.email || !data.message) {
      toast.error("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }
  
    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(data.email)) {
      toast.error("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }
  
    // Message length validation (you can adjust the min length based on your preference)
    if (data.message.length < 10) {
      toast.error("Your message must be at least 10 characters long.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      await postcontact(data).unwrap(); // API call with data
      toast.success("Message sent successfully!"); // Success toast
      formRef.current.reset(); // Reset the form after success
    } catch (error) {
      toast.error("Failed to send message. Please try again."); // Error toast
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };
  

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3 pb-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2 md:col-span-1 col-span-2">
          <Label htmlFor="name">
            Name<span className="text-destructive">*</span>
          </Label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>
        <div className="flex flex-col gap-2 md:col-span-1 col-span-2">
          <Label htmlFor="email">
            Email Address<span className="text-destructive">*</span>
          </Label>
          <Input id="email" name="email" type="email" placeholder="Your email" required />
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" placeholder="Your topic" className="w-full" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">
          Your Message<span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Please describe in detail your request"
          className="min-h-[120px]"
          required
        />
      </div>

      <Button type="submit" className="w-full pb-3" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
