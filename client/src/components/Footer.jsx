import { LiaShopware } from "react-icons/lia";
import { Link } from "react-router-dom";

const footerLinks = {
  About: ["Contact Us", "About Us", "Careers", "Press", "Cleantrip"],
  Help: ["Payments", "Shipping", "F A Q", "Report infringement"],
  ConsumerPolicy: [
    "Cancellation & Returns",
    "Terms of Use",
    "Security",
    "Privacy",
  ],
  Social: ["Facebook", "Twitter", "Youtube"],
  MailUs: [
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet recusandae minus facere voluptate magnam explicabo neque voluptatem cumque, eligendi ipsum?",
  ],
};
const footerLinksTitle = Object.keys(footerLinks);
const Footer = () => {
  return (
    <footer className=' px-8 py-4 w-full bg-slate-800 text-white'>
      <Link to={"/"}>
        <div className='text-2xl lg:text-3xl flex gap-2 items-center'>
          {/* left side */}
          <h1 className=' uppercase'>E-Com</h1>
          <LiaShopware />
        </div>
      </Link>

      <div className=' m-auto flex flex-col lg:flex-row lg:items-center lg:justify-evenly gap-5'>
        {/* part 2 */}
        <div>
          <h1 className=' text-gray-400 my-3'>{footerLinksTitle[0]}</h1>
          {footerLinks.About.map((item) => (
            <div className=' flex flex-col  gap-1 ' key={item}>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div>
          <h1 className=' text-gray-400 my-3'>{footerLinksTitle[1]}</h1>
          {footerLinks.Help.map((item) => (
            <div className=' flex flex-col gap-1  ' key={item}>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div>
          <h1 className=' text-gray-400 my-3'>{footerLinksTitle[2]}</h1>
          {footerLinks.ConsumerPolicy.map((item) => (
            <div className=' flex flex-col gap-1  ' key={item}>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div>
          <h1 className=' text-gray-400 my-3'>{footerLinksTitle[3]}</h1>
          {footerLinks.Social.map((item) => (
            <div className=' flex flex-col gap-1  ' key={item}>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div>
          <h1 className=' text-gray-400 my-3'>{footerLinksTitle[4]}</h1>
          {footerLinks.MailUs.map((item) => (
            <div
              className=' flex flex-col gap-1  mkey={item}ax-w-sm '
              key={item}
            >
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className=' mt-5 flex flex-col gap-3 items-center border-t-white'>
        {/* part 3 */}
        <p>All rights reserved @2023 E-com</p>
        <div>
          <img
            src='https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg'
            alt='payments'
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
