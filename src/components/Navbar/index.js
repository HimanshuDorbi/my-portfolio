import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Nav,
  NavLink,
  NavbarContainer,
  Span,
  NavLogo,
  NavItems,
  GitHubButton,
  ButtonContainer,
  MobileIcon,
  MobileMenu,
  MobileNavLogo,
  MobileLink,
} from "./NavbarStyledComponent";
import { DiCssdeck } from "react-icons/di";
import { FaBars } from "react-icons/fa";
import { Bio } from "../../data/constants";
import { Close, CloseRounded } from "@mui/icons-material";
import { useTheme } from "styled-components";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const theme = useTheme();
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleBodyOverflow = () => {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    };

    handleBodyOverflow();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleMobileMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Nav style={{ backdropFilter: isScrolled || isOpen ? "blur(10px)" : "none" }}>
      <NavbarContainer>
        <NavLogo as={Link} to="/" onClick={scrollToTop}>
          <a
            style={{
              display: "flex",
              alignItems: "center",
              color: "black",
              marginBottom: "20px",
              cursor: "pointer",
            }}
          >
            <DiCssdeck size="3rem" /> <Span>Portfolio</Span>
          </a>
        </NavLogo>
        <MobileIcon>
          <FaBars onClick={handleMobileMenuToggle} />
        </MobileIcon>
        <NavItems>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#education">Experience</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </NavItems>
        <ButtonContainer>
          <GitHubButton href={Bio.github} target="_blank">
            Github Profile
          </GitHubButton>
        </ButtonContainer>
      </NavbarContainer>
      <MobileMenu isOpen={isOpen} ref={mobileMenuRef}>
        <MobileLink as={Link} to="/" onClick={scrollToTop}>
          About
        </MobileLink>
        <MobileLink href="#skills" onClick={handleMobileMenuToggle}>
          Skills
        </MobileLink>
        <MobileLink href="#education" onClick={handleMobileMenuToggle}>
          Experience
        </MobileLink>
        <MobileLink href="#projects" onClick={handleMobileMenuToggle}>
          Projects
        </MobileLink>
        <MobileLink href="#contact" onClick={handleMobileMenuToggle}>
          Contact
        </MobileLink>
        <GitHubButton
          style={{
            padding: "10px 16px",
            background: `${theme.primary}`,
            color: "white",
            width: "max-content",
          }}
          href={Bio.github}
          target="_blank"
        >
          Github Profile
        </GitHubButton>
      </MobileMenu>
    </Nav>
  );
};

export default Navbar;
