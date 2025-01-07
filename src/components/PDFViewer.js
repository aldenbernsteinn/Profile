import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiDownload, FiPrinter, FiMaximize } from 'react-icons/fi';

const PDFOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow: hidden;
`;

const PDFContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  background: rgba(20, 20, 30, 0.95);
  border: 1px solid rgba(180, 41, 255, 0.2);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 30px rgba(180, 41, 255, 0.1);
`;

const PDFHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(20, 20, 30, 0.95);
  border-bottom: 1px solid rgba(180, 41, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  backdrop-filter: blur(10px);
  z-index: 2;
`;

const PDFTitle = styled.h3`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
`;

const ControlsGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const IconButton = styled(motion.button)`
  background: rgba(180, 41, 255, 0.1);
  border: 1px solid rgba(180, 41, 255, 0.3);
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(180, 41, 255, 0.2);
    border-color: rgba(180, 41, 255, 0.8);
  }
`;

const CloseButton = styled(motion.button)`
  background: rgba(180, 41, 255, 0.1);
  border: 2px solid rgba(180, 41, 255, 0.5);
  color: #fff;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(180, 41, 255, 0.2);
    border-color: rgba(180, 41, 255, 0.8);
  }
`;

const PDFContent = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 60px;
  overflow: auto;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const PDFViewer = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Alden Bernstein-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const iframe = document.querySelector('#pdf-iframe');
    iframe.contentWindow.print();
  };

  const pdfUrl = `${process.env.PUBLIC_URL}/Alden Bernstein-Resume.pdf`;

  return (
    <PDFOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <PDFContainer
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <PDFHeader>
          <PDFTitle>Alden Bernstein-Resume.pdf</PDFTitle>
          <ControlsGroup>
            <IconButton
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload size={20} />
            </IconButton>
            <IconButton
              onClick={handlePrint}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPrinter size={20} />
            </IconButton>
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </CloseButton>
          </ControlsGroup>
        </PDFHeader>
        <PDFContent>
          <StyledIframe
            id="pdf-iframe"
            src={pdfUrl}
            title="Resume PDF"
          />
        </PDFContent>
      </PDFContainer>
    </PDFOverlay>
  );
};

export default PDFViewer; 