import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg px-3 py-1 text-sm">
              Get in Touch
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Contact Us
            </h2>
            <p className="max-w-[900px]md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have any questions or need assistance? Our team is here to help.
            </p>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
            </div>
            <Input placeholder="Email" type="email" />
            <Textarea placeholder="Message" />
            <Button>Submit</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;