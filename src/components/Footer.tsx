import { ContactMethodLoader } from "@/lib/data-loaders/contact-method-loader";
import { Button } from "./Button";
import { ContactMethodIcon } from "./ContactMethodIcon";
import { cn } from "@/lib/classname";
import { load } from "outstatic/server";

export type FooterProps = {
  className?: string;
};

const Footer: React.FC<FooterProps> = async ({ className }) => {
  const db = await load();
  const contactMethods = await new ContactMethodLoader(db).load();
  return (
    <footer className={cn("border-t-2 border-foreground mt-6", className)}>
      <div className="mx-auto flex flex-col items-center gap-6 p-4 md:flex-row md:justify-between md:gap-4">
        <p className="text-sm font-medium order-3 md:order-1">
          © {new Date().getFullYear()} Vince Vella ·{" "}
          <a
            href="/privacy"
            className="underline decoration-2 underline-offset-2 hover:decoration-primary"
          >
            Privacy
          </a>
        </p>
        <div className="flex gap-x-2 order-1 md:order-2">
          {contactMethods.map((method) => (
            <Button
              name={method.title.toLowerCase()}
              key={method.title.toLowerCase()}
              aria-label={method.title.toLowerCase()}
              variant="outline"
              size="icon"
              asChild
            >
              <a href={method.content}>
                <ContactMethodIcon
                  size={18}
                  method={method.title.toLowerCase()}
                />
              </a>
            </Button>
          ))}
        </div>
        <p className="text-sm font-semibold order-2 md:order-3">
          Powered by{" "}
          <a
            className="underline decoration-2 underline-offset-2 hover:decoration-primary"
            href="https://vellapps.com"
          >
            Vellapps LLC
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
