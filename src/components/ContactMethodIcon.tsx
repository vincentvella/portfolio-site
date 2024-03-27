import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";

type ContactMethodProps = {
  method: string;
  size: number;
};

export const ContactMethodIcon: React.FC<ContactMethodProps> = ({
  method,
  size = 14,
}) => {
  switch (method) {
    case "email":
      return <EnvelopeClosedIcon width={size + 1} height={size + 1} />;
    case "github":
      return <GitHubLogoIcon width={size + 1} height={size + 1} />;
    case "linkedin":
      return <LinkedInLogoIcon width={size + 1} height={size + 1} />;
    case "vellapps":
      return (
        <Image
          src="/images/vellapps.svg"
          alt="Vellapps Icon"
          className="dark:invert"
          width={size + 6}
          height={size + 6}
          priority
        />
      );
    case "x":
      return (
        <Image
          src="/images/x.svg"
          alt="X (Twitter) Icon"
          className="dark:invert"
          width={size}
          height={size}
          priority
        />
      );
    case "phone":
      return (
        <Image
          src="/images/phone.svg"
          alt="Phone Icon"
          className="dark:invert"
          width={size}
          height={size}
          priority
        />
      );
  }
  return null;
};
