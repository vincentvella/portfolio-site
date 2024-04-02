import { ContactMethodLoader } from "@/lib/data-loaders/contact-method-loader";
import { Button } from "./Button";
import { ContactMethodIcon } from "./ContactMethodIcon";
import { load } from "@/lib/load";

const Footer = async () => {
  const db = await load();
  const contactMethods = await new ContactMethodLoader(db).load();
  return (
    <footer>
      <div className="dark:bg-black dark:text-zinc-200 mx-auto p-2 text-end md:flex md:flex-row">
        <div className="flex flex-1" />
        <div className="flex flex-1 gap-x-1 pt-1 text-sm justify-center">
          {contactMethods.map((method) => (
            <Button
              key={method.title.toLowerCase()}
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
          <h3 className="font-semibold text-sm">
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
