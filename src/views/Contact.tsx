// I M P O R T:   F I L E S
import "../styles/contact.scss";

// I M P O R T:   P A C K A G E S

// I M P O R T:   F U N C T I O N S
import Footer from "../components/Footer";

// C O D E
const Contact = () => {
  return (
    <div>
      <section className="contact" id="contact">
        <h2>Contact</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor
          velit nec nunc dignissim, ac ultricies felis congue. Donec nec purus
          vitae elit ultricies tempus. Nullam nec tortor nec nunc luctus
          tincidunt. Sed in odio sit amet libero lacinia venenatis. Nullam
          eleifend, risus sed mollis convallis, purus nunc ultricies nunc, nec
          ultricies purus erat nec odio. Nullam nec tortor nec nunc luctus
          tincidunt. Sed in odio sit amet libero lacinia venenatis. Nullam
          eleifend, risus sed mollis convallis, purus nunc ultricies nunc, nec
          ultricies purus erat nec odio.
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
