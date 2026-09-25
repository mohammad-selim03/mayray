"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { api } from "../../lib/api";
import { AnimateIn } from "../ui/AnimateIn";
import { useCmsGlobal } from "@/lib/cms/CmsGlobalsContext";
import type { DocumentContent, LinkValue } from "@/lib/cms/schema";

type FooterContent = DocumentContent<"footer">;
type ShowcaseLogo = FooterContent["showcase"]["logos"][number];

const CHIP_CLASS =
  "rounded-full bg-white px-5 py-2.5 text-[16px] font-medium leading-[19.4px] text-[#18181b] shadow-[0_4px_8px_rgba(0,0,0,0.12)]";

const linkTarget = (link: LinkValue) => (link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {});

function NewsletterForm({ copy }: { copy: FooterContent["newsletter"] }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await api.newsletter.subscribe(email);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return <p className="text-[14px] font-medium text-[#13a0e7]">✓ {copy.success}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[502px]">
      <div className="flex h-12 items-center rounded-full border border-[#d1d1d6] pl-[21px] pr-[3px]">
        <label htmlFor="footer-newsletter-email" className="sr-only">{copy.placeholder}</label>
        <input
          id="footer-newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={copy.placeholder}
          className="min-w-0 flex-1 bg-transparent text-[16px] leading-6 tracking-[-0.01em] text-[#18181b] outline-none placeholder:text-[#70707b]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-[42px] shrink-0 cursor-pointer rounded-full bg-[#18181b] px-4 text-[16px] leading-[19.4px] text-white transition-colors hover:bg-black disabled:opacity-70"
        >
          {status === "loading" ? "…" : copy.button}
        </button>
      </div>
      {status === "error" && <p className="mt-2 pl-2 text-[13px] text-red-500">Something went wrong. Try again.</p>}
    </form>
  );
}

const IntegrationShowcase = ({ logos, className, chipClassName }: { logos: ShowcaseLogo[]; className: string; chipClassName: string }) => {
  const [s0, s1, s2, s3, s4, s5] = logos;
  return (
  <section className={className}>
        <AnimateIn>
          <div  className="relative flex flex-wrap items-center justify-between gap-5">
            {/* logo */}
            <div className="relative group">
              <motion.div 
                className="opacity-20"
                animate={{ 
                  scale: [1, 1.02, 1],
                  rotate: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="266" height="311" viewBox="0 0 266 311" fill="none">
              <path d="M265.283 132.622C265.283 161.771 255.685 190.109 237.971 213.258C220.257 236.406 195.413 253.078 167.277 260.696V260.316C219.376 245.077 257.481 196.301 257.481 138.478C257.481 68.4605 201.59 11.6915 132.656 11.6915C63.7224 11.6915 7.83176 68.4605 7.83176 138.478C7.83176 195.203 44.5164 243.232 95.1079 259.423V259.862C71.4991 252.897 50.2942 239.499 33.8657 221.169C17.4373 202.839 6.43357 180.299 2.08568 156.071C-2.2622 131.843 0.217329 106.883 9.24683 83.9845C18.2763 61.0857 33.4996 41.151 53.2132 26.4111C72.9268 11.6713 96.3531 2.70771 120.871 0.523368C145.389 -1.66098 170.031 3.02008 192.039 14.0428C214.048 25.0655 232.556 41.9949 245.491 62.9369C258.427 83.8789 265.28 108.007 265.283 132.622ZM131.954 309.912C132.115 310.336 132.495 310.629 133.271 310.585C134.925 310.483 134.647 308.389 135.042 307.086C135.057 307.009 135.057 306.93 135.042 306.852C135.511 294.936 136.506 222.855 137.619 210.983C138.351 203.371 137.326 195.715 138.248 188.103C139.13 179.251 143.273 171.043 149.871 165.076C151.935 163.188 154.263 161.607 156.342 159.792C158.574 157.915 161.033 156.326 163.661 155.063C167.731 153.087 171.742 150.979 175.899 149.208C178.528 147.975 181.268 146.994 184.082 146.28C188.986 145.167 193.729 143.44 198.721 142.635C205.85 141.478 212.964 140.498 220.137 141.42C224.908 141.807 229.58 142.995 233.956 144.933C234.46 145.265 235.053 145.433 235.656 145.415C236.259 145.396 236.841 145.192 237.323 144.831C237.787 144.4 238.117 143.846 238.275 143.234C238.434 142.622 238.413 141.977 238.216 141.376C237.571 139.36 236.697 137.425 235.61 135.608C232.337 129.71 227.846 124.575 222.436 120.545C220.123 118.759 218.176 119.301 216.99 122.009C216.473 123.07 215.748 124.016 214.858 124.791C213.968 125.566 212.93 126.153 211.808 126.518C205.264 129.138 198.252 130.002 191.387 131.378C189.323 131.802 187.171 131.832 185.092 132.373C180.261 133.661 175.416 134.935 170.541 136.048C167.422 136.854 164.384 137.947 161.465 139.312C155.25 141.911 149.511 145.527 144.484 150.013C140.577 153.433 137.159 157.373 134.325 161.724C134.129 162.086 133.844 162.391 133.495 162.61C133.147 162.829 132.748 162.954 132.337 162.973C131.926 162.992 131.517 162.905 131.149 162.719C130.782 162.534 130.469 162.256 130.241 161.914C129.421 160.553 128.382 159.367 127.445 158.108C123.888 153.383 119.604 149.253 114.753 145.87C109.816 142.513 104.481 139.784 98.8701 137.746C91.4002 135.051 83.7035 133.032 75.8726 131.714C68.2897 130.251 60.6483 129.226 53.2997 126.752C52.0172 126.397 50.8219 125.781 49.789 124.942C48.7561 124.103 47.9079 123.06 47.2978 121.877C45.8339 118.949 44.1797 118.671 41.6619 120.618C36.9453 124.175 32.8877 128.53 29.6728 133.486C27.9686 135.764 26.7164 138.348 25.9838 141.098C25.5593 143.367 26.6279 145.285 28.692 145.27C29.2619 145.256 29.8237 145.132 30.3461 144.904C33.0397 143.147 36.2016 143.162 39.1294 142.298C45.6459 140.578 52.4576 140.288 59.0966 141.449C67.1453 142.436 75.0535 144.347 82.665 147.144C87.4373 148.919 92.1178 150.932 96.6889 153.175C102.58 156.167 108.097 159.842 113.128 164.125C116.918 167.334 120.097 171.203 122.512 175.543M77.9074 106.199C77.3804 105.145 76.2386 105.13 75.1846 104.896L74.3209 105.057C71.6444 105.68 69.0209 106.512 66.4745 107.546C62.5844 108.789 58.9141 110.637 55.598 113.021C53.9584 114.236 52.0554 115.612 52.436 118.174C52.6161 119.033 53.05 119.819 53.6815 120.43C54.3131 121.041 55.1132 121.448 55.9786 121.599C58.7911 122.634 61.6987 123.389 64.6593 123.853C70.7198 124.498 76.5167 126.562 82.6064 126.957C83.5521 127.05 84.4847 127.247 85.3878 127.542C91.7556 129.475 98.2991 130.836 104.418 133.544C108.196 135.097 111.831 136.978 115.28 139.166C120.924 142.749 125.972 147.195 130.241 152.34C130.509 152.634 130.838 152.864 131.205 153.016C131.572 153.168 131.967 153.237 132.364 153.219C132.761 153.201 133.149 153.096 133.5 152.911C133.852 152.726 134.158 152.467 134.398 152.15C134.867 151.623 135.218 150.979 135.701 150.481C141.569 144.228 148.51 139.077 156.195 135.272C162.082 132.531 168.22 130.364 174.523 128.801C181.711 126.957 189.001 125.639 196.305 124.498C200.478 123.853 204.445 122.609 208.5 121.643C212.554 120.677 213.081 117.251 210.417 114.411C207.991 112.061 205.099 110.245 201.927 109.083C198.048 107.158 193.926 105.77 189.674 104.955C189.017 104.798 188.328 104.856 187.706 105.119C187.085 105.382 186.564 105.838 186.219 106.419C184.256 109.32 181.298 111.403 177.905 112.274C172.049 114.25 165.989 115.729 160.133 117.749C156.267 119.049 152.54 120.731 149.008 122.77C143.499 125.762 138.409 129.468 133.871 133.793C132.495 135.257 131.017 135.067 129.597 133.5C126.033 129.752 121.904 126.585 117.359 124.117C113.749 122.055 110.008 120.231 106.16 118.657C102.943 117.195 99.5953 116.038 96.1619 115.202C92.563 114.353 89.0189 113.288 85.5488 112.011C82.3383 111.15 79.5942 109.063 77.9074 106.199ZM99.4702 94.0783C95.2076 96.7302 90.7551 99.0641 86.149 101.061C85.6714 101.257 85.2659 101.595 84.9882 102.03C84.7104 102.465 84.5739 102.975 84.5973 103.491C84.5737 103.958 84.7041 104.421 84.9685 104.807C85.233 105.193 85.6168 105.481 86.0612 105.628C87.3625 106.368 88.7298 106.986 90.1454 107.473C97.4758 109.24 104.645 111.619 111.576 114.587C117.227 117.12 122.62 120.194 127.679 123.766C129.143 124.761 130.007 126.693 132.071 126.606C132.705 126.689 133.347 126.532 133.871 126.166C138.325 122.299 143.291 119.063 148.627 116.549C154.061 113.923 159.683 111.706 165.447 109.917C169.458 108.629 173.762 108.146 177.524 105.98C178.651 105.321 179.866 104.984 179.793 103.374C179.72 101.764 178.49 101.31 177.246 100.666C173.325 98.8786 169.517 96.8547 165.842 94.6052C164.378 93.5952 162.49 92.2191 160.631 93.5513C157.703 95.63 154.673 97.3427 151.774 99.3335C145.381 103.599 139.459 108.531 134.105 114.045C133.867 114.314 133.573 114.529 133.245 114.676C132.917 114.823 132.562 114.9 132.202 114.9C131.843 114.9 131.487 114.823 131.159 114.676C130.831 114.529 130.538 114.314 130.299 114.045C128.426 112.391 126.771 110.488 124.898 108.834C121.604 105.906 118.076 103.301 114.519 100.724C111.401 98.4699 107.785 96.9767 104.945 94.3564C104.222 93.625 103.252 93.1908 102.225 93.1394C101.198 93.0879 100.189 93.4228 99.397 94.0783H99.4702ZM120.55 72.4276C119.518 72.5978 118.526 72.955 117.622 73.4816C114.373 75.3785 111.623 78.0233 109.6 81.1962C107.273 84.6948 107.551 89.2475 110.479 90.9017C112.133 91.8239 113.67 92.8925 115.251 93.8294C120.359 97.0637 125.205 100.696 129.743 104.691C131.617 106.316 133.037 106.302 134.808 104.53C138.115 101.437 141.692 98.6448 145.494 96.1862C148.181 94.1473 151.019 92.317 153.985 90.7113C154.638 90.3295 155.176 89.7784 155.542 89.1162C155.908 88.454 156.088 87.7053 156.064 86.9492C156.106 85.4493 155.849 83.956 155.309 82.5562C154.769 81.1564 153.955 79.878 152.916 78.7954C150.626 75.7558 147.426 73.5253 143.782 72.4276C141.835 71.9445 140.854 72.9253 141.308 74.843C141.642 76.3341 141.833 77.8536 141.879 79.381C141.718 81.2254 142.04 83.187 140.62 84.9144C139.312 86.6262 137.508 87.8923 135.454 88.5395C133.4 89.1867 131.195 89.1835 129.143 88.5302C126.215 87.5787 123.287 86.1441 122.76 82.6747C122.343 80.1722 122.448 77.6105 123.068 75.1504C123.595 72.9838 122.687 72.0616 120.55 72.4276Z" fill="url(#paint0_linear_3567_124)" />
              <defs>
                <linearGradient id="paint0_linear_3567_124" x1="0.0293214" y1="155.297" x2="265.283" y2="155.297" gradientUnits="userSpaceOnUse">
                  <stop offset="0.2" stopColor="#231F20" />
                  <stop offset="0.24" stopColor="#292526" />
                  <stop offset="0.29" stopColor="#3A3738" />
                  <stop offset="0.35" stopColor="#575455" />
                  <stop offset="0.42" stopColor="#7E7C7D" />
                  <stop offset="0.49" stopColor="#B3B3B3" />
                  <stop offset="0.53" stopColor="#949393" />
                  <stop offset="0.58" stopColor="#646162" />
                  <stop offset="0.63" stopColor="#403D3E" />
                  <stop offset="0.67" stopColor="#2B2728" />
                  <stop offset="0.7" stopColor="#231F20" />
                </linearGradient>
              </defs>
                </svg>
              </motion.div>
              {s0?.logo && (
              <motion.p
                className="absolute top-10 left-0 sm:-left-5 z-10 hidden sm:flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ 
                  duration: 0.8,
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" } 
                }}
              >
                <span className={chipClassName}>{s0.name} </span>
                <Image src={s0.logo.url} alt="" width={40} height={40} unoptimized={s0.logo.url.endsWith(".svg")} className="w-10" />
              </motion.p>
              )}
              {s1?.logo && (
              <motion.p
                className="absolute bottom-20 left-4 sm:left-11 z-10 hidden sm:flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                animate={{ y: [0, 8, 0] }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.2,
                  y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 } 
                }}
              >
                <span className={chipClassName}>{s1.name} </span>
                <Image src={s1.logo.url} alt="" width={40} height={40} unoptimized={s1.logo.url.endsWith(".svg")} className="w-10" />
              </motion.p>
              )}
            </div>
          <div className="relative group">
            <motion.p 
              className="flex items-end gap-2 opacity-20"
              animate={{ scale: [1, 1.01, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="85" height="78" viewBox="0 0 85 78" fill="none">
                <path d="M84.5826 0V77.5853H69.0216V27.1548L48.2346 77.5853H36.4504L15.561 27.1256V77.5853H0V0H17.669L42.3498 57.6912L67.0161 0H84.5826Z" fill="url(#paint0_linear_3567_113)" />
                <defs>
                  <linearGradient id="paint0_linear_3567_113" x1="0" y1="53.3874" x2="412.446" y2="53.3874" gradientUnits="userSpaceOnUse">
                    <stop />
                    <stop offset="0.39" />
                  </linearGradient>
                </defs>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64" fill="none">
                <path d="M3.72533 15.0105C5.99217 10.4341 9.49656 6.58489 13.8407 3.89971C18.1461 1.29309 23.0955 -0.0558146 28.1281 0.00579976C32.3176 -0.0840765 36.4633 0.871868 40.1904 2.78716C43.4321 4.47744 46.2573 6.86759 48.4613 9.78447V1.00123H64.1101V62.5571H48.4613V53.5543C46.3172 56.5682 43.4807 59.0231 40.1904 60.7126C36.4308 62.6596 32.244 63.6358 28.011 63.5525C23.0027 63.602 18.0851 62.2152 13.8407 59.5562C9.49903 56.7912 6.00002 52.8871 3.72533 48.2697C1.16765 43.0693 -0.107339 37.3319 0.00707364 31.5376C-0.0961601 25.8102 1.1791 20.1419 3.72533 15.0105ZM46.1777 22.0664C44.7964 19.4734 42.7175 17.3184 40.1758 15.8449C38.3381 14.7482 36.2971 14.0355 34.1762 13.7501C32.0553 13.4648 29.8985 13.6125 27.8363 14.1845C25.7741 14.7565 23.8494 15.7409 22.1785 17.078C20.5077 18.4151 19.1253 20.0773 18.1152 21.9639C16.5361 24.9129 15.754 28.223 15.8462 31.5669C15.763 34.9519 16.5439 38.3023 18.1152 41.3017C19.501 43.9333 21.5755 46.1393 24.1171 47.6842C26.5103 49.1458 29.2616 49.916 32.0659 49.9092C34.9141 49.9238 37.7143 49.1758 40.1758 47.7427C42.7204 46.273 44.8002 44.117 46.1777 41.5213C47.6416 38.4875 48.4019 35.1624 48.4019 31.7938C48.4019 28.4253 47.6416 25.1002 46.1777 22.0664Z" fill="url(#paint0_linear_3567_114)" />
                <defs>
                  <linearGradient id="paint0_linear_3567_114" x1="-95.906" y1="38.3593" x2="316.541" y2="38.3593" gradientUnits="userSpaceOnUse">
                    <stop />
                    <stop offset="0.39" />
                  </linearGradient>
                </defs>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="67" height="91" viewBox="0 0 67 91" fill="none">
                <path d="M66.0207 0L27.96 90.7601H11.3304L24.6663 60.0188L0 0H17.4494L33.347 43.0086L49.4496 0H66.0207Z" fill="url(#paint0_linear_3567_115)" />
                <defs>
                  <linearGradient id="paint0_linear_3567_115" x1="-168.155" y1="37.2849" x2="244.291" y2="37.2849" gradientUnits="userSpaceOnUse">
                    <stop />
                    <stop offset="0.39" />
                  </linearGradient>
                </defs>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="63" viewBox="0 0 30 63" fill="none">
                <path d="M17.669 2.93833C21.3533 0.89538 25.5204 -0.116054 29.7313 0.0105877V10.4627H27.067C15.7269 10.4627 10.0568 16.6109 10.0568 28.9074V62.0349H0V1.15242H10.1154V11.0482C11.7867 7.66486 14.4127 4.84541 17.669 2.93833Z" fill="url(#paint0_linear_3567_116)" />
                <defs>
                  <linearGradient id="paint0_linear_3567_116" x1="-243.457" y1="37.8371" x2="168.99" y2="37.8371" gradientUnits="userSpaceOnUse">
                    <stop />
                    <stop offset="0.39" />
                  </linearGradient>
                </defs>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="62" height="63" viewBox="0 0 62 63" fill="none">
                <path d="M3.74082 14.8375C6.11369 10.2878 9.71441 6.49433 14.1343 3.88768C18.6002 1.28212 23.691 -0.0588776 28.8609 0.00842809C33.7165 -0.11279 38.5151 1.07549 42.753 3.44853C46.4191 5.4784 49.4574 8.47612 51.5363 12.1147V1.00386H61.7834V61.8863H51.5363V50.5413C49.3932 54.2157 46.3047 57.2486 42.592 59.3246C38.3811 61.7179 33.6009 62.9269 28.7584 62.8232C23.6014 62.8837 18.5305 61.4994 14.1197 58.8268C9.70466 56.1095 6.12769 52.2235 3.78473 47.5989C1.20217 42.5046 -0.0944599 36.8556 0.0079582 31.145C-0.114047 25.4842 1.16844 19.8815 3.74082 14.8375ZM48.711 19.3462C46.9878 16.0821 44.3868 13.3644 41.2013 11.4998C38.034 9.72926 34.4658 8.79965 30.8371 8.79965C27.2085 8.79965 23.6403 9.72926 20.4729 11.4998C17.3057 13.3315 14.7262 16.0279 13.0364 19.273C11.1094 22.9747 10.1524 27.1047 10.2551 31.2767C10.1499 35.5052 11.1062 39.6926 13.0364 43.4562C14.7273 46.7309 17.304 49.4648 20.4729 51.3465C23.6101 53.1674 27.1806 54.1081 30.8078 54.0693C34.4528 54.1021 38.0406 53.1622 41.2013 51.3465C44.3983 49.4768 47.0016 46.7416 48.711 43.4562C50.6212 39.7278 51.5722 35.5821 51.4778 31.3939C51.5835 27.2092 50.6318 23.0655 48.711 19.3462Z" fill="url(#paint0_linear_3567_117)" />
                <defs>
                  <linearGradient id="paint0_linear_3567_117" x1="-281.114" y1="37.6885" x2="131.332" y2="37.6885" gradientUnits="userSpaceOnUse">
                    <stop />
                    <stop offset="0.39" />
                  </linearGradient>
                </defs>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="90" viewBox="0 0 60 90" fill="none">
                <path d="M59.6822 0L22.9975 89.589H12.5601L24.5638 60.2384L0 0H11.2133L30.3315 49.3471L49.2301 0H59.6822Z" fill="url(#paint0_linear_3567_118)" />
                <defs>
                  <linearGradient id="paint0_linear_3567_118" x1="-352.764" y1="36.6847" x2="59.6821" y2="36.6847" gradientUnits="userSpaceOnUse">
                    <stop />
                    <stop offset="0.39" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.p>
            <div>
              {s2?.logo && (
              <motion.p
                className="absolute -top-5 left-2 sm:-top-10 sm:left-5 z-10 hidden sm:flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.3,
                  y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" } 
                }}
              >
                <span className={chipClassName}>{s2.name} </span>
                <Image src={s2.logo.url} alt="" width={40} height={40} unoptimized={s2.logo.url.endsWith(".svg")} className="w-10" />
              </motion.p>
              )}
              {s3?.logo && (
              <motion.p
                className="absolute top-24 left-0 sm:-left-5 z-10 hidden sm:flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                animate={{ y: [0, 8, 0] }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.4,
                  y: { repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.5 } 
                }}
              >
                <span className={chipClassName}>{s3.name} </span>
                <Image src={s3.logo.url} alt="" width={40} height={40} unoptimized={s3.logo.url.endsWith(".svg")} className="w-10" />
              </motion.p>
              )}
              {s4?.logo && (
              <motion.p
                className="absolute -top-5 right-0 sm:-top-10 sm:-right-5 z-10 hidden sm:flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                animate={{ y: [0, -12, 0] }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.5,
                  y: { repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 1.2 } 
                }}
              >
                <span className={chipClassName}>{s4.name} </span>
                <Image src={s4.logo.url} alt="" width={40} height={40} unoptimized={s4.logo.url.endsWith(".svg")} className="w-10" />
              </motion.p>
              )}
              {s5?.logo && (
              <motion.p
                className="absolute -bottom-5 right-0 sm:-bottom-10 sm:right-5 z-10 hidden sm:flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                animate={{ y: [0, 10, 0] }}
                transition={{ 
                  duration: 0.8,
                  delay: 0.6,
                  y: { repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.8 } 
                }}
              >
                <span className={chipClassName}>{s5.name} </span>
                <Image src={s5.logo.url} alt="" width={40} height={40} unoptimized={s5.logo.url.endsWith(".svg")} className="w-10" />
              </motion.p>
              )}
            </div>
          </div>
        </div>
        </AnimateIn>
  </section>
  );
};
export const Footer = () => {
  const { about, columns, newsletter, showcase } = useCmsGlobal("footer");
  const photos = [about.photo1, about.photo2];

  return (
    <footer id="contact" className="relative scroll-mt-28">
      <div aria-hidden className="relative h-[160px]">
        <div className="absolute inset-x-[28px] top-0 h-[160px] rounded-t-[100px] bg-white/20 backdrop-blur-[50px]" />
        <div className="absolute inset-x-[14px] top-[30px] h-[130px] rounded-t-[100px] bg-white/50 backdrop-blur-[50px]" />
        <div className="absolute inset-x-0 top-[60px] h-[100px] rounded-t-[100px] bg-white" />
      </div>
      <div className="bg-white px-4 pb-[70px] pt-12 sm:px-6">
        <div className="mx-auto flex max-w-[1170px] flex-col gap-12 lg:flex-row lg:gap-[81px]">
          <div className="flex shrink-0 flex-col gap-8 sm:flex-row sm:gap-[21px] lg:w-[571px]">
            <div className="hidden w-[270px] shrink-0 flex-col gap-8 sm:flex">
              {photos.map((photo, i) =>
                photo ? (
                  <div key={i} className="relative h-[152px] w-full">
                    <Image alt={photo.alt} fill sizes="270px" className="rounded-3xl object-cover" src={photo.url} />
                  </div>
                ) : null
              )}
            </div>
            <div className="flex flex-col gap-[31px] sm:w-[280px]">
              <p className="whitespace-pre-line text-[24px] font-medium leading-[1.2] text-[#18181b]">{about.tagline}</p>
              {about.socials.length > 0 && (
                <ul className="flex flex-col gap-1 text-[14px] leading-[16.9px] text-[#70707b]">
                  {about.socials.map(({ link }) => (
                    <li key={link.label}>
                      {link.href ? (
                        <a href={link.href} {...linkTarget(link)} className="transition-colors hover:text-[#18181b]">
                          {link.label}
                        </a>
                      ) : (
                        link.label
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-16 lg:w-[518px]">
            <div className="grid grid-cols-2 gap-10 sm:flex">
              {columns.columns.map((column, index) => (
                <div key={column.title} className="flex flex-col gap-6 sm:w-[146px]">
                  <h3 className="text-[24px] font-medium leading-[1.2] text-[#18181b]">{column.title}</h3>
                  {/* The design spaces the first column's links a little wider. */}
                  <ul className={`flex flex-col ${index === 0 ? "gap-4" : "gap-3"} text-[14px] leading-[16.9px] text-[#70707b]`}>
                    {column.links.map(({ link }) => (
                      <li key={`${link.label}-${link.href}`}>
                        <Link href={link.href} {...linkTarget(link)} className="transition-colors hover:text-[#18181b]">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-[24px] font-medium leading-[1.2] text-[#18181b]">{newsletter.title}</h3>
                {newsletter.text && <p className="max-w-[502px] text-[16px] leading-[1.6] text-[#70707b]">{newsletter.text}</p>}
              </div>
              <NewsletterForm copy={newsletter} />
            </div>
          </div>
        </div>
        <div className="relative mx-auto mt-[61px] max-w-[743px]">
          <IntegrationShowcase logos={showcase.logos} className="hidden sm:block" chipClassName={CHIP_CLASS} />
          <p className="text-center text-[14px] leading-[16.9px] text-[#70707b] sm:absolute sm:bottom-0 sm:left-1/2 sm:-translate-x-1/2 sm:whitespace-nowrap">
            {showcase.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
