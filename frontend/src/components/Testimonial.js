import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import { Container } from "reactstrap";

function Testi() {
    const testimonials = [
        {
            text: "Incredible service from start to finish. I hired them to fix a leaky faucet and ended up booking them again to install shelving in my laundry room. Super responsive, on time, and left the space spotless. Highly recommend!",
            author: "Julia M. – East York, Toronto",
        },
        {
            text: "Had a few odd jobs piling up around the condo—curtain rods, caulking the tub, and fixing a squeaky door. The handyman was professional, fast, and friendly. Will definitely use this service again.",
            author: "Derrick P. – Liberty Village, Toronto",
        },
        {
            text: "I needed someone to assemble some IKEA furniture and hang a large mirror safely. They were able to fit me in within 48 hours and did a great job. Great value and very trustworthy.",
            author: "Sonia R. – North York, Toronto",
        },
        {
            text: "We had drywall damage in the hallway and a broken cabinet door in the kitchen. Everything was repaired within a few hours, and it looks like new. Very impressed with the attention to detail.",
            author: "Mohammed A. – Scarborough, Toronto",
        },
        {
            text: "We were prepping our house for sale and needed a few quick touch-ups—paint touch-ups, baseboard repairs, and light fixture replacements. The handyman was courteous, tidy, and efficient. The place looked fantastic afterwards!",
            author: "Claire B. – The Beaches, Toronto",
        },
        {
            text: "Reached out for help installing a basketball net on our driveway and couldn’t be happier. The post was level, the backboard is sturdy, and it looks like a pro setup. They even cleaned up after and gave tips on maintaining it through winter. My kids were playing within the hour! Highly recommend for any outdoor installs.",
            author: "Tyrese J. – Etobicoke, Toronto",
        },
    ];

    return (
        <div style={{ backgroundColor: "#00084c", color: "white", padding: "3rem 1.5rem", marginTop: "3rem" }}>
            <div className="text-center mb-2" style={{ color: "#f1593a", fontSize: "0.82rem", fontWeight: "700", letterSpacing: "2.5px", textTransform: "uppercase" }}>
                Testimonials
            </div>
            <h2 className="text-center mb-3" style={{ color: "#ffffff", fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)", fontWeight: "800", letterSpacing: "-0.02em" }}>
                What Our Clients Say
            </h2>
            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={50}
                slidesPerView={1}
                style={{ padding: "2.5rem 0 3rem 0" }}
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index} style={{ textAlign: "center" }}>
                        <Container style={{ maxWidth: "820px" }}>
                            <div style={{ fontSize: "2.5rem", color: "#f1593a", lineHeight: 1, marginBottom: "0.75rem" }}>&ldquo;</div>
                            <p style={{ fontSize: "clamp(1.02rem, 1.6vw, 1.22rem)", fontStyle: "italic", lineHeight: "1.8", color: "#f8fafc", margin: "0 auto", maxWidth: "720px" }}>
                                {testimonial.text}
                            </p>
                            <p style={{ marginTop: "1.25rem", fontWeight: "600", fontSize: "clamp(0.92rem, 1.1vw, 1rem)", letterSpacing: "0.4px", color: "#cbd5e1" }}>
                                — {testimonial.author}
                            </p>
                            <div style={{ fontSize: "2.5rem", color: "#f1593a", lineHeight: 1, marginTop: "0.75rem" }}>&rdquo;</div>
                        </Container>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Testi;


/* Color Code : 
Main: #00084c
Secondary: #d8d9da
Third (Small): #b61414 */