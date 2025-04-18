// src/pages/Home.js
import React, { useState, useMemo } from 'react'
import {
  Container, Typography, TextField, Button, Box,
  Stepper, Step, StepLabel, StepIconProps, Select, MenuItem, Paper,
  IconButton, Snackbar, Tooltip
} from '@mui/material'
import { jsPDF } from 'jspdf'
import { FaPencilAlt, FaCopy, FaCheck, FaFileAlt, FaBriefcase, FaSmile, FaPaperPlane } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const steps = ['Resume', 'Job Description', 'Tone', 'Generate']

const StepIcons = {
  1: <FaFileAlt />,         // Resume
  2: <FaBriefcase />,       // Job Description
  3: <FaSmile />,           // Tone
  4: <FaPaperPlane />       // Generate
}



function Home({ darkMode }) {
  const [activeStep, setActiveStep] = useState(0)
  const [resume, setResume] = useState('')
  const [jobPost, setJobPost] = useState('')
  const [tone, setTone] = useState('professional')
  const [letter, setLetter] = useState('')
  const [company, setCompany] = useState('')
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedLetter, setEditedLetter] = useState('')
  const [copied, setCopied] = useState(false)

  const handleNext = () => setActiveStep((prev) => prev + 1)
  const handleBack = () => setActiveStep((prev) => prev - 1)

  const handleGenerate = async () => {
    setLoading(true)
    const response = await fetch('http://localhost:8000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume, jobPost, tone })
    })
    const data = await response.json()
    setLetter(data.letter)
    setEditedLetter(data.letter)
    setCompany(data.company)
    setIsEditing(false)
    setLoading(false)
    handleNext()
  }

  function CustomStepIcon({ active, completed, icon, darkMode }) {
    const isActiveOrCompleted = active || completed
  
    const bgColor = isActiveOrCompleted
      ? darkMode ? '#64ffda' : '#000'
      : darkMode ? '#555' : '#ccc'
  
    const iconColor = darkMode ? '#000' : '#fff'
  
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 30,
          height: 30,
          borderRadius: '50%',
          backgroundColor: bgColor
        }}
      >
        <Box sx={{
          color: iconColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14, // adjust for better fit
        }}>
          {StepIcons[icon]}
        </Box>
      </Box>
    )
  }

  const handleDownloadPDF = () => {
    const doc = new jsPDF()
    doc.setFont('Times', 'Normal')
    doc.setFontSize(12)
    doc.text(editedLetter, 10, 10, { maxWidth: 190 })
    const filename = `cover_letter_${company || 'company'}.pdf`
    doc.save(filename)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(editedLetter)
    setCopied(true)
  }

  const wordCount = useMemo(() => editedLetter.trim().split(/\s+/).length, [editedLetter])

  const toneDescriptions = {
    professional: 'Confident, formal, and straightforward',
    friendly: 'Warm, conversational, and easygoing',
    enthusiastic: 'High-energy, passionate, and bold'
  }

  const fadeVariant = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  }
  const inputStyle = {
    input: { color: darkMode ? '#fff' : '#000' },
    '& label': { color: darkMode ? '#aaa' : '#000' },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: darkMode ? '#aaa' : '#000' },
      '&:hover fieldset': { borderColor: darkMode ? '#fff' : '#000' },
      '&.Mui-focused fieldset': { borderColor: darkMode ? '#fff' : '#000' , color:darkMode?"primary":"#000" },
    },
    '& .MuiSelect-select': {
      color: darkMode ? '#fff' : '#000',
      backgroundColor: darkMode ? '#112240' : '#fff'
    },
    '& .MuiSelect-icon': {
      color: darkMode ? '#fff' : '#000'
    },
    '& .Mui-focused': {
      color: darkMode ? '#fff' : '#000'
    }}

  const buttonStyle = {
    color: darkMode?"#000":'#fff',
    bgcolor: darkMode ? 'primary.main' : '#000',
    '&:hover': {
      bgcolor: darkMode ? 'primary.dark' : '#333'
    },
    '&.Mui-disabled': {
      bgcolor: darkMode ? '#444' : '#ccc',
      color: darkMode ? '#999' : '#666'
    }
  }

  const CustomIconWrapper = (props) => <CustomStepIcon {...props} darkMode={darkMode} />

  return (
    <Container maxWidth="md" sx={{ pt: 6, pb: 6 }}>
      <Typography variant="h5" align="center" gutterBottom>
        AutoCover – AI Cover Letter Generator
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
  {steps.map((label, index) => (
    <Step key={label}>
      <StepLabel StepIconComponent={CustomIconWrapper}>
        {label}
      </StepLabel>
    </Step>
  ))}
</Stepper>



      <AnimatePresence mode="wait">
        {activeStep === 0 && (
          <motion.div key="step-0" variants={fadeVariant} initial="initial" animate="animate" exit="exit">
            <TextField
              label="Paste your resume here"
              placeholder="e.g. Experienced backend engineer skilled in Go and Python..."
              multiline fullWidth rows={6} margin="normal" sx={inputStyle}
              value={resume} onChange={(e) => setResume(e.target.value)}
            />
          </motion.div>
        )}

        {activeStep === 1 && (
          <motion.div key="step-1" variants={fadeVariant} initial="initial" animate="animate" exit="exit">
            <TextField
              label="Paste the job description"
              placeholder="e.g. We're hiring a Site Reliability Engineer to..."
              multiline fullWidth rows={6} margin="normal" sx={inputStyle}
              value={jobPost} onChange={(e) => setJobPost(e.target.value)}
            />
          </motion.div>
        )}

{activeStep === 2 && (
          <motion.div key="step-2" variants={fadeVariant} initial="initial" animate="animate" exit="exit">
            <Box>
              <Typography gutterBottom>Select the tone of the letter:</Typography>
              <Select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                fullWidth
                sx={{backgroundColor:darkMode ? "#0a192f":"#fff"}}
              >
                {Object.entries(toneDescriptions).map(([toneKey, description]) => (
                  <MenuItem
                    key={toneKey}
                    value={toneKey}
                    sx={{ backgroundColor: darkMode ? '#0a192f' : '#fff', color: darkMode ? '#fff' : '#000'  }}
                  >
                    <Tooltip title={description} arrow placement="right">
                      <span>{toneKey.charAt(0).toUpperCase() + toneKey.slice(1)}</span>
                    </Tooltip>
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </motion.div>
        )}

        {activeStep === 3 && (
          <motion.div key="step-3" variants={fadeVariant} initial="initial" animate="animate" exit="exit">
            <Paper elevation={4} sx={{ mt: 3, p: 3, position: 'relative', bgcolor: darkMode ? '#112240' : '#f9f9f9' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Your Cover Letter</Typography>
                <IconButton onClick={() => setIsEditing(!isEditing)} color={darkMode?'primary':'#000'}>
                  <FaPencilAlt />
                </IconButton>
              </Box>

              {isEditing ? (
                <TextField
                  multiline fullWidth rows={12} sx={{ mt: 2, ...inputStyle }}
                  value={editedLetter} onChange={(e) => setEditedLetter(e.target.value)}
                />
              ) : (
                <Typography sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>{editedLetter}</Typography>
              )}

              <Typography variant="caption" color={wordCount < 250 || wordCount > 300 ? 'error' : 'textSecondary'} sx={{ mt: 1, display: 'block' }}>
                Word Count: {wordCount} {wordCount < 250 || wordCount > 300 ? '(try to stay between 250–300)' : ''}
              </Typography>

              <Box mt={2} display="flex" gap={2}>
                <Button variant="contained" onClick={handleDownloadPDF} sx={buttonStyle}>Download PDF</Button>
                <Button variant="contained" onClick={handleCopy} startIcon={<FaCopy />} sx={buttonStyle}>Copy</Button>
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>

      {activeStep === 3 && (
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button disabled={activeStep === 0} onClick={handleBack} sx={buttonStyle}>Back</Button>
        </Box>
      )}

      {activeStep < 3 && (
        <Box display="flex" justifyContent="space-between" mt={4}>
          <Button disabled={activeStep === 0} onClick={handleBack} sx={{color:darkMode?"#000":"#fff",...buttonStyle}}>Back</Button>
          <Button
            variant="contained" onClick={activeStep === 2 ? handleGenerate : handleNext}
            disabled={(activeStep === 0 && !resume) || (activeStep === 1 && !jobPost)}
            sx={{color:darkMode?"#000":"#fff",...buttonStyle}}
          >
            {activeStep === 2 ? 'Generate' : 'Next'}
          </Button>
        </Box>
      )}

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message={<span style={{ display: 'flex', alignItems: 'center' }}><FaCheck style={{ marginRight: 8 }} /> Copied!</span>}
      />
    </Container>
  )
}

export default Home
