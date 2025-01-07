import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiGithub, FiChevronDown } from 'react-icons/fi';
import {
  PortfolioContainer,
  HeroSection,
  HeroContent,
  Name,
  Title,
  SocialLinks,
  SocialLink,
  QuoteCard,
  QuoteText,
  SectionTitle,
  SearchContainer,
  SearchInput,
  RepositorySection,
  RepositoryGrid,
  RepositoryCard,
  RepoTitle,
  RepoLanguage,
  RepoStats,
  LeftContent,
  FeaturedProject,
  ProjectDots,
  Dot,
  ScrollButton,
  ScrollText,
  ViewProjectLink,
  OrganizationHeader,
  OrganizationName,
  RoleTitle,
  QuoteContent,
  CardFooter,
  ProjectDescription
} from './Portfolio.styles';
import PDFViewer from './PDFViewer';
import projectsData from '../static/projects_static.json';

const Portfolio = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showPDF, setShowPDF] = useState(false);
  const sections = useRef([
    { id: 'hero', label: 'Home' },
    { id: 'repositories', label: 'Repositories' }
  ]);
  const [gridHeight, setGridHeight] = useState(0);
  const [initialHeight, setInitialHeight] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const professionalExperience = [
    {
      organization: "University of California San Diego",
      role: "Software Engineer Intern",
      description: <>
        Developed a full-stack website using <span className="tech">JavaScript</span>, <span className="tech">HTML</span>, and <span className="tech">CSS</span> for researchers at the Scripps Institution of Oceanography. <em>Increased efficiency by over 1,000%</em>, transforming an hours-long manual process into an automated workflow, <strong>saving researchers hundreds of hours annually</strong>.
      </>,
      link: "https://cchdo.github.io/submission-validator/"
    },
    {
      organization: "Crunch Digital",
      role: "Software Engineer Intern",
      description: (
        <>
          Improved testing efficiency by 50% by contributing to the development and testing of RESTful API integrations for client-server music applications using <span className="tech">Python</span>, <span className="tech">FastAPI</span>, and <span className="tech">AWS</span>, reducing API response time by 30%.
        </>
      ),
      link: "https://tempo.crunchdigital.biz/login"
    },
  ];

  useEffect(() => {
    setProjects(projectsData);
    setFilteredProjects(projectsData);
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = projects.filter(project => {
      return (
        project.name.toLowerCase().includes(term) ||
        (project.description && project.description.toLowerCase().includes(term)) ||
        (project.language && project.language.toLowerCase().includes(term))
      );
    });
    
    setFilteredProjects(filtered);
  };

  useEffect(() => {
    const handleScroll = () => {
      const pageYOffset = window.pageYOffset;
      let newActiveSection = sections.current[0].id;

      sections.current.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop - 100;
          if (pageYOffset >= offsetTop) {
            newActiveSection = section.id;
          }
        }
      });

      setActiveSection(newActiveSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      const cardHeight = 200; // Height of each card including gap
      const containerWidth = window.innerWidth - 8 * 16; // Container width minus padding
      const cardsPerRow = Math.floor(containerWidth / 340); // 300px card + 40px gap
      const rows = Math.ceil(projects.length / cardsPerRow);
      const height = rows * cardHeight;
      setGridHeight(height);
    }
  }, [projects]); // Only run when projects are loaded

  // Calculate initial height once when projects are first loaded
  useEffect(() => {
    if (projects.length > 0) {
      // Get the actual rendered height of the repository section
      const repoSection = document.getElementById('repositories');
      if (repoSection) {
        const height = repoSection.getBoundingClientRect().height;
        setInitialHeight(height);
      }
    }
  }, [projects]); // Only run when projects are first loaded

  const scrollToProjects = () => {
    const element = document.getElementById('repositories');
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      // Wait for transition animation before changing slide
      setTimeout(() => {
        setCurrentProject((prev) => (prev === professionalExperience.length - 1 ? 0 : prev + 1));
        setIsTransitioning(false);
      }, 500);
    }, 8000); // Wait 8 seconds before transitioning

    return () => clearTimeout(timer);
  }, [currentProject]);

  return (
    <PortfolioContainer>
      <HeroSection id="hero">
        <HeroContent>
          <LeftContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Name>Alden Bernstein</Name>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            >
              <Title>Software Engineer</Title>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              <SocialLinks>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 }}
                >
                  <SocialLink onClick={() => setShowPDF(true)}>Resume</SocialLink>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.55 }}
                >
                  <SocialLink 
                    href="https://www.linkedin.com/in/alden-bernstein-31b1a22b0/" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </SocialLink>
                </motion.div>
              </SocialLinks>
            </motion.div>
          </LeftContent>
          
          <FeaturedProject>
            <QuoteCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isTransitioning ? 0.3 : 1,
                y: isTransitioning ? 10 : 0,
              }}
              transition={{ 
                duration: 0.5,
                ease: "easeInOut"
              }}
            >
              <OrganizationHeader>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85, duration: 0.4 }}
                >
                  <OrganizationName>{professionalExperience[currentProject].organization}</OrganizationName>
                  <RoleTitle>{professionalExperience[currentProject].role}</RoleTitle>
                </motion.div>
              </OrganizationHeader>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.4 }}
              >
                <QuoteContent>
                  <QuoteText>
                    {professionalExperience[currentProject].description}
                  </QuoteText>
                </QuoteContent>
              </motion.div>
              
              <CardFooter>
                <ProjectDots>
                  {professionalExperience.map((_, index) => (
                    <Dot
                      key={index}
                      active={currentProject === index}
                      onClick={() => setCurrentProject(index)}
                    >
                      <motion.div
                        initial={{ scale: 1 }}
                        animate={{ 
                          scale: currentProject === index ? [1, 1.2, 1] : 1,
                          opacity: isTransitioning && currentProject === index ? 0.5 : 1
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "currentColor",
                          borderRadius: "50%"
                        }}
                      />
                    </Dot>
                  ))}
                </ProjectDots>
                {currentProject === 0 && (
                  <ViewProjectLink
                    href={professionalExperience[currentProject].link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </ViewProjectLink>
                )}
              </CardFooter>
            </QuoteCard>
          </FeaturedProject>
        </HeroContent>
        
        <ScrollButton
          onClick={scrollToProjects}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <ScrollText>View My Projects</ScrollText>
          <motion.div
            animate={{ 
              y: [0, 5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          >
            <FiChevronDown size={28} />
          </motion.div>
        </ScrollButton>
      </HeroSection>

      <RepositorySection 
        id="repositories" 
        style={{ height: initialHeight || 'auto' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ minHeight: gridHeight }}
        >
          <SectionTitle>
            My Projects
          </SectionTitle>
          
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search projects by name, description, or language..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <motion.a
              href="https://github.com/aldenbernsteinn"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                color: '#b429ff',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.8rem 1.5rem',
                border: '2px solid rgba(180, 41, 255, 0.5)',
                borderRadius: '30px',
                background: 'rgba(180, 41, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                marginLeft: '1rem'
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(180, 41, 255, 0.2)',
                borderColor: 'rgba(180, 41, 255, 0.8)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub Repository <FiGithub style={{ marginLeft: '8px' }} />
            </motion.a>
          </SearchContainer>

          <RepositoryGrid>
            {filteredProjects.map((project, index) => (
              <RepositoryCard
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <RepoTitle>
                  <a 
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {project.name}
                  </a>
                </RepoTitle>
                
                <ProjectDescription>
                  {project.description || 'No description available'}
                </ProjectDescription>
                
                <RepoLanguage language={project.language}>
                  {project.language || 'N/A'}
                </RepoLanguage>
                
                <RepoStats>
                  <span>
                    <FiStar style={{ verticalAlign: 'middle' }} /> {project.stargazers_count || 0}
                  </span>
                  <span>
                    Last updated: {project.last_commit ? new Date(project.last_commit).toLocaleDateString() : 'N/A'}
                  </span>
                </RepoStats>
              </RepositoryCard>
            ))}
          </RepositoryGrid>
        </motion.div>
      </RepositorySection>

      <AnimatePresence>
        {showPDF && (
          <PDFViewer 
            onClose={() => setShowPDF(false)} 
          />
        )}
      </AnimatePresence>
    </PortfolioContainer>
  );
};

export default Portfolio; 
