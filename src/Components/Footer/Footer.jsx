import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <p>© {currentYear} REACT24S. All rights reserved.</p>;
};

export default Footer;
