"use client";

import Lottie from "lottie-react";
import animationData from "../../../public/animations/garden-loader.json";

import "./Loader.css";


export default function Loader() {

    return (
        <div className="loader">

            <Lottie
                animationData={animationData}
                loop={true}
                className="loader-animation"
            />

        </div>
    );
}