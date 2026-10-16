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
        <div style={{ backgroundColor: "#00084c", color: "white", padding: "2rem", marginTop: "2rem" }}>
            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={50}
                slidesPerView={1}
                style={{ padding: "4rem 0" }}
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index} style={{ textAlign: "center" }}>
                        <Container>
                            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>&ldquo;</div>
                            <p style={{ fontSize: "1.25rem", fontStyle: "italic" }}>
                                {testimonial.text}
                            </p>
                            <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
                                - {testimonial.author}
                            </p>
                            <div className="pt-4" style={{ fontSize: "3rem", marginTop: "1rem" }}>&rdquo;</div>
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