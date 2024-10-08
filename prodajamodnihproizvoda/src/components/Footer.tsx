"use client";

import {
  BsYoutube,
  BsGithub,
  BsLinkedin,
  BsFacebook,
  BsReddit,
} from "react-icons/bs";
import payment from "@/images/payment.png";
import Container from "./Container";
import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="w-full bg-darkText text-slate-100">
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="flex flex-col gap-y-4">
          <Logo />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa in
            sint incidunt, minima quos voluptates, nobis autem laborum earum est
            pariatur aperiam. Delectus consectetur maxime quidem veniam,
            corporis.
          </p>
          <div className="flex items-center gap-x-4">
            <a href="https://www.youtube.com" target="_blank">
              <span className="socialLink">
                <BsYoutube />
              </span>
            </a>
            <a href="https://www.github.com" target="_blank">
              <span className="socialLink">
                <BsGithub />
              </span>
            </a>
            <a href="https://www.linkedin.com" target="_blank">
              <span className="socialLink">
                <BsLinkedin />
              </span>
            </a>
            <a href="https://www.facebook.com" target="_blank">
              <span className="socialLink">
                <BsFacebook />
              </span>
            </a>
            <a href="https://www.reddit.com" target="_blank">
              <span className="socialLink">
                <BsReddit />
              </span>
            </a>
          </div>
        </div>
        <div>
          <p className="text-lg">Latest posts</p>
          <ul className="text-sm font-light mt-2 flex flex-col gap-y-2">
            <li className="flex flex-col">
              <span className="text-slate hover:text-orange-600 cursor-pointer duration-200">
                Best fashion trends for women
              </span>
              <span className="text-orange-600">September 11, 2024</span>
            </li>
            <li className="flex flex-col">
              <span className="text-slate hover:text-orange-600 cursor-pointer duration-200">
              Best fashion trends for men
              </span>
              <span className="text-orange-600">September 10, 2024</span>
            </li>
            <li className="flex flex-col">
              <span className="text-slate hover:text-orange-600 cursor-pointer duration-200">
                Best fashion trends for children
              </span>
              <span className="text-orange-600">September 9, 2024</span>
            </li>
            <li className="flex flex-col">
              <span className="text-slate hover:text-orange-600 cursor-pointer duration-200">
                Best fashion trends for summer
              </span>
              <span className="text-orange-600">September 8, 2024</span>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-lg">Links</p>
          <ul className="text-base font-medium mt-2 flex flex-col gap-y-2">
            <Link href={"/"}>
              <li className="hover:text-orange-500 cursor-pointer duration-200">
                Home
              </li>
            </Link>
            <Link href={"/cart"}>
              <li className="hover:text-orange-500 cursor-pointer duration-200">
                Cart
              </li>
            </Link>
            <Link href={"/about"}>
              <li className="hover:text-orange-500 cursor-pointer duration-200">
                About
              </li>
            </Link>
            <Link href={"/products"}>
              <li className="hover:text-orange-500 cursor-pointer duration-200">
                Products
              </li>
            </Link>
          </ul>
        </div>
        <div>
          <p className="text-lg mb-2">Pay us with your trusted services</p>
          <Image
            src={payment}
            alt="payment banner image"
            className="w-full h-10 object-cover"
          />
        </div>
      </Container>
    </div>
  );
};

export default Footer;