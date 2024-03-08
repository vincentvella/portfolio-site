import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";

type ContactMethodProps = {
  method: string;
};

export const ContactMethodIcon: React.FC<ContactMethodProps> = ({ method }) => {
  switch (method) {
    case "email":
      return <EnvelopeClosedIcon />;
    case "github":
      return <GitHubLogoIcon />;
    case "linkedin":
      return <LinkedInLogoIcon />;
    case "vellapps":
      return (
        <Image
          src="/images/vellapps.svg"
          alt="Vellapps Icon"
          className="dark"
          width={20}
          height={20}
          priority
        />
      );
    case "x":
      return (
        <Image
          src="/images/x.svg"
          alt="X (Twitter) Icon"
          className="dark"
          width={14}
          height={14}
          priority
        />
      );
    case "phone":
      return (
        <Image
          src="/images/phone.svg"
          alt="Phone Icon"
          className="dark"
          width={14}
          height={14}
          priority
        />
      );
  }
  return null;
};
