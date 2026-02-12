import { ContactMethodLoader } from "@/lib/data-loaders/contact-method-loader";
import { Button } from "./Button";
import { ContactMethodIcon } from "./ContactMethodIcon";
import { load } from "@/lib/load";
import { cn } from "@/lib/classname";

export type FooterProps = {
  className?: string;
};

const Footer: React.FC<FooterProps> = async ({ className }) => {
  const db = await load();
  const contactMethods = await new ContactMethodLoader(db).load();
  return (
    <footer className={cn(className)}>
      <div className="mx-auto p-4 text-end md:flex md:flex-row dark:bg-black dark:text-zinc-200">
        <div className="flex flex-1" />
        <div className="flex min-w-80 flex-1 justify-center gap-x-1 pt-1 text-sm">
          {contactMethods.map((method) => (
            <Button
              name={method.title.toLowerCase()}
              key={method.title.toLowerCase()}
              aria-label={method.title.toLowerCase()}
              variant="ghost"
              size="sm"
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
        <div className="flex flex-1 items-center justify-center md:justify-end">
          <h3 className="text-sm font-semibold">
            Powered by{" "}
            <a className="underline" href="https://nextjs.org/">
              Vellapps LLC
            </a>
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
