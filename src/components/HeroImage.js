import React from "react";
import hero from "./heroSmall2.jpg";

const HeroImage = () => {
    return (
        <div
            style={{ backgroundImage: `url(${hero})` }}
            className="hidden md:block md:h-[400px] md:bg-center md:bg-fixed md:bg-cover"
        ></div>
    );
};

export default HeroImage;
