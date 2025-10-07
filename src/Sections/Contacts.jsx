import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_t70ap5r",
        "template_6p316tq",
        {
          from_name: form.name,
          to_name: "Khachatryan Khachatur",
          from_email: form.email,
          to_email: "khachatryankhachatur57@gmail.com",
          message: form.message,
        },
        "ASR_kBTr2c-FVy_Ub"
      )
      .then(
        () => {
          setLoading(false);

          setTimeout(() => {}, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error(error);
        }
      );
  };

  return (
    <section
      className=" bg-gradient-to-b from-[#0f0f0f] via-[#5a0a10] to-[#69141F]"
      id="contact"
    >
      <div className="flex items-center flex-col justify-center min-h-screen">
        <div className="contact-container">
          <h3 className="head-text text-[#FFFCEE] text-2xl mt-10">
            Let s talk
          </h3>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col space-y-7"
          >
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="Type your Name"
              />
            </label>
            <label className="space-y-3">
              <span className="field-label">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="example@gmail.com"
              />
            </label>
            <label className="space-y-3">
              <span className="field-label">Your Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="Hi, I wanna give you a best offer..."
                rows={5}
              />
            </label>
            <button className="field-btn" type="submit" disable={loading}>
              {loading ? "Sending" : "Send message"}
              <img
                src="assets/arrow-up.png"
                alt="arrow"
                className="field-btn_arrow"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
