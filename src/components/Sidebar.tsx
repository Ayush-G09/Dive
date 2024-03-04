import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faBackward, faCirclePause, faForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton, Slider, Typography } from '@mui/material'
import React from 'react'

function Sidebar() {
  return (
    <Box
          sx={{
            width: "20%",
            height: "100%",
            boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Box sx={{width: '100%', height: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}> 
          <Box sx={{width: '90%', height: '90%', backgroundColor: 'rgba(225, 225, 225, 0.05)', display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', justifyContent: 'center', borderRadius: '4px', boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)"}}>
            <Box sx={{width: '10em', height: '10em', overflow: 'hidden', borderRadius: '4px', boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",}}>
              <img src="https://img.freepik.com/premium-photo/human-skull-low-poly-style-3d-illustration-polygonal-design_856795-3051.jpg"
                        alt="Image"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}/>
            </Box>
            <Box sx={{width: '80%', display: 'flex', flexDirection: 'column'}}>
              <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="subtitle1">Song name</Typography>
                <FontAwesomeIcon icon={faHeart} style={{cursor: 'pointer'}}/>
              </Box>
              <Typography variant="caption">Ayush Gokhle</Typography>
            </Box>
            <Box sx={{width: '80%', display: 'flex', flexDirection: 'column'}}>
            <Slider size="small"
          value={50}
          min={0}
          step={1}
          max={120}
          onChange={(_, value) => console.log(value)}
          sx={{
            color: '#fff',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&::before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: '0px 0px 0px 8px rgb(255 255 255 / 16%)'
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}/>
          <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
             <Typography variant="caption">0:20</Typography>
             <Typography variant="caption">2:00</Typography>
          </Box>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1}}>
            <IconButton size='medium' sx={{color: 'white'}}>
            <FontAwesomeIcon icon={faBackward} size='1x'/>
            </IconButton>
            <IconButton size='medium' sx={{color: 'white'}}>
            <FontAwesomeIcon icon={faCirclePause} size='1x'/>
            </IconButton>
            <IconButton size='medium' sx={{color: 'white'}}>
            <FontAwesomeIcon icon={faForward} size='1x'/>
            </IconButton>
          </Box>
            </Box>
          </Box>
        </Box>
  )
}

export default Sidebar