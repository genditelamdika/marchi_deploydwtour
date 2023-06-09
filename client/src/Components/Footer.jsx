import leaf from "../assets/images/leaf (1) 1.png";

const Footer = () => {
  return (
    <div style={{ position: "relative" }}>
      <img src={leaf} alt="" className="imageleaf" />
      <div className="footer">
        <h6 style={{ padding: "16px" }} className="text-center">
          Copyright @ 2020 Dewe Tour - Your Name - NIS. All Rights reserved
        </h6>
      </div>
    </div>
  );
};

export default Footer;
