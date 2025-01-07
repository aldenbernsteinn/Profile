import styled from 'styled-components';
import { motion } from 'framer-motion';

// Base Container
export const PortfolioContainer = styled.div`
  background: linear-gradient(135deg, #0a0a0a 0%, #13131f 100%);
  color: #fff;
  min-height: 100vh;
  position: relative;
  width: 100%;
  overflow-y: auto;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(180, 41, 255, 0.05) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(100, 125, 238, 0.05) 0%, transparent 40%);
    pointer-events: none;
  }
`;

// Hero Section
export const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 8rem 8rem;
  position: relative;
  
  @media (max-width: 1200px) {
    padding: 4rem 4rem 8rem;
  }
  
  @media (max-width: 1024px) {
    padding: 2rem 2rem 6rem;
    text-align: center;
  }
`;

export const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 2rem;
  gap: 3rem;
  position: relative;
  
  @media (max-width: 968px) {
    flex-direction: column;
    align-items: center;
    gap: 2.5rem;
  }
`;

export const LeftContent = styled.div`
  flex: 1;
`;

export const FeaturedProject = styled.div`
  flex: 1;
  max-width: 500px;
`;

export const Name = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(45deg, #b429ff, #647dee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  letter-spacing: -0.5px;
  line-height: 1.1;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 500;
  margin: 0.5rem 0 1.5rem;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  opacity: 0.9;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: flex-start;
  align-items: center;
  width: fit-content;
`;

export const SocialLink = styled(motion.a)`
  color: #fff;
  text-decoration: none !important;
  padding: 0.6rem 1.8rem;
  border: 2px solid rgba(180, 41, 255, 0.5);
  border-radius: 25px;
  font-weight: 500;
  letter-spacing: 0.5px;
  background: rgba(180, 41, 255, 0.1);
  backdrop-filter: blur(10px);
  font-size: 0.95rem;
  min-width: 110px;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    background: rgba(180, 41, 255, 0.2);
    border-color: rgba(180, 41, 255, 0.8);
    box-shadow: 0 0 10px rgba(180, 41, 255, 0.5);
  }
`;

// Project Showcase
export const ProjectShowcase = styled(motion.div)`
  flex: 1;
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 400px;
  margin: 2rem;
  background: rgba(180, 41, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(180, 41, 255, 0.1);
  
  @media (max-width: 1024px) {
    margin-top: 4rem;
  }
`;

export const ProjectImage = styled(motion.img)`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

export const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 1rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

// Repository Section
export const RepositorySection = styled.section`
  padding: 2rem 4rem;
  position: relative;
  min-height: ${props => props.height || 'auto'};
  
  /* Ensure content stays within the fixed height */
  & > div {
    height: 100%;
    position: relative;
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #b429ff;
  text-shadow: 0 0 10px rgba(180, 41, 255, 0.3);
`;

export const SearchContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto 3rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 300px;
  padding: 1rem 1.5rem;
  border: 2px solid rgba(180, 41, 255, 0.3);
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 1.1rem;
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: rgba(180, 41, 255, 0.8);
    box-shadow: 0 0 15px rgba(180, 41, 255, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const RepositoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
  position: relative;
  align-content: start;
`;

export const AnimatePresenceContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
`;

export const RepositoryCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(180, 41, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    border-color: rgba(180, 41, 255, 0.5);
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const RepoTitle = styled.h3`
  font-size: 1.2rem;
  color: #b429ff;
  margin: 0 0 1rem 0;
`;

export const RepoLanguage = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  background: rgba(180, 41, 255, 0.1);
  color: #b429ff;
  margin: 1rem 0;
`;

export const RepoStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  
  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const NavigationDots = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin-top: 2rem;
`;

export const NavDot = styled(motion.button)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? '#b429ff' : 'rgba(180, 41, 255, 0.3)'};
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#b429ff' : 'rgba(180, 41, 255, 0.5)'};
  }
`;

// Projects Section
export const ProjectsSection = styled.section`
  padding: 6rem 4rem;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 4rem 2rem;
  }
`;

export const ProjectsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const QuoteCard = styled(motion.div)`
  background: rgba(180, 41, 255, 0.07);
  border: 1px solid rgba(180, 41, 255, 0.3);
  border-radius: 20px;
  padding: 1.5rem 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 750px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(45deg, rgba(180, 41, 255, 0.2), rgba(100, 125, 238, 0.2));
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

export const QuoteContent = styled.div`
  margin: 0;
`;

export const QuoteText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  
  strong {
    color: #ffffff;
    font-weight: 600;
  }
  
  em {
    color: #c85aff;
    font-style: normal;
    font-weight: 500;
  }

  .tech {
    color: #d17dff;
    font-weight: 500;
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(180, 41, 255, 0.1);
`;

export const ProjectIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

export const ProjectDots = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
  justify-content: center;
`;

export const Dot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative;
  background: transparent;
  color: ${props => props.active ? '#b429ff' : 'rgba(180, 41, 255, 0.3)'};
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.active ? '#b429ff' : 'rgba(180, 41, 255, 0.5)'};
  }
`;

export const ScrollButton = styled(motion.button)`
  position: absolute;
  bottom: 4rem;
  left: 0;
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: #c85aff;
  padding: 0;
  z-index: 10;
  text-shadow: 0 0 8px rgba(200, 90, 255, 0.8);

  &:hover {
    color: #d17dff;
    text-shadow: 0 0 12px rgba(209, 125, 255, 1);
  }
`;

export const ScrollText = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: inherit;
`;

export const ViewProjectLink = styled(motion.a)`
  padding: 0.5rem 1.2rem;
  background: rgba(180, 41, 255, 0.1);
  border: 2px solid rgba(180, 41, 255, 0.5);
  border-radius: 25px;
  color: #d17dff;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(180, 41, 255, 0.2);
    border-color: rgba(180, 41, 255, 0.8);
    box-shadow: 0 0 10px rgba(180, 41, 255, 0.5);
  }
`;

export const OrganizationHeader = styled.div`
  margin-bottom: 1rem;
`;

export const OrganizationName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #b429ff;
  margin: 0;
`;

export const RoleTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;