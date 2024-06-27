import { Feature } from "@/types/feature";
import Image from 'next/image'

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <Image
        src="/icons/ai3.png"
        alt="logout"
        width={50}
        height={50}
      />
    ),
    title: "AI-Powered Prescription Analysis",
    paragraph:
      "Upload your prescription image, and our advanced AI will accurately extract and list the medicine names for seamless and efficient prescription management.",
  },
  {
    id: 1,
    icon: (
      <Image
        src="/icons/pres1.png"
        alt="logout"
        width={50}
        height={50}
      />
    ),
    title: "Comprehensive Medicine Information",
    paragraph:
    "Gain detailed insights into your medications such as uses, dosages and working mechanisms, and side effects, ensuring you are fully informed about their effects"
  },
  {
    id: 1,
    icon: (
      <Image
        src="/icons/history.png"
        alt="logout"
        width={50}
        height={50}
      />
    ),
    title: "AI powered Medical History Management ",
    paragraph:
    "Manage and share your medical history globally: AI-powered summaries track prescriptions and medicines for easy access and informed healthcare decisions."
  },
  {
    id: 1,
    icon: (
      <Image
      src="/icons/shopping.png"
      alt="logout"
      width={50}
      height={50}
    />
    ),
    title: "Convenient Medicine Purchase",
    paragraph:
    "Purchase medicines directly on our website from trusted sources, eliminating the need to search online. Receive recommendations conveniently provided on-site for a streamlined shopping experience"
    },
  {
    id: 1,
    icon: (
      <Image
      src="/icons/consult.png"
      alt="logout"
      width={50}
      height={50}
    />
    ),
    title: "Online Consultancy",
    paragraph:
    "Utilize our secure chat functionality to consult doctors and pharmacists, ensuring reliable information on medications and peace of mind about treatment decisions."
  },
  {
    id: 1,
    icon: (
      <Image
        src="/icons/article.png"
        alt="logout"
        width={50}
        height={50}
      />
    ),
    title: "AI-Enhanced Health Articles",
    paragraph:
    "Access curated health articles recommended by AI based on searched medicines, offering insights into disease treatment, general health tips, and personalized suggestions for improved well-being."
  },
];
export default featuresData;
