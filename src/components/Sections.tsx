import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import apiClient from '../spotify';

type Props = { type: "show" | "playlist"};

type Data = {
    images: {url: string}[];
    name: string;
    publisher: string;
}

type State = {
    data: Data[];
}

function Sections({type}: Props) {
    
    const [state, setState] = useState<State>({
        data: [],
    })

    useEffect(() => {
        apiClient.get("search", {params: {q: `genre:${type === 'show' ? 'podcast' : 'pop'}`, type: type, limit: 20}}).then((response) => {
            setState((prev) => ({...prev, data: response.data[type + 's'].items}));
        });
      }, []);

      const trim = (value: string, truncate: number) => {
        if(value.length > truncate) {
            return `${value.slice(0, truncate)}...`;
        }
        return value;
    }
  return (
    <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  width: "92%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography color="white" variant="h5">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </Typography>
                <Box sx={{gap: 2, display: 'flex'}}>
                  <IconButton size="small">
                    <FontAwesomeIcon size="sm" icon={faChevronLeft} color="lightgray"/>
                  </IconButton>
                  <IconButton size="small">
                    <FontAwesomeIcon size="sm" icon={faChevronRight} color="lightgray"/>
                  </IconButton>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                  overflowX: "scroll",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  gap: 2.7,
                  paddingLeft: 3,
                }}
              >
                {state.data.map((item, index) => (
                <Box
                key={index}
                  sx={{
                    minWidth: "10em",
                    minHeight: "15em",
                    borderRadius: "4px",
                    backgroundColor: "rgba(225, 225, 225, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 1,
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                    cursor: "pointer",
                    transition: "all 0.5s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: "8em",
                      height: "8em",
                      borderRadius: "4px",
                      overflow: "hidden",
                      marginTop: 1.5,
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <img
                      src={item.images[0].url}
                      alt="Image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box sx={{ width: "8em" }}>
                    <Typography color={"white"} variant="subtitle1">
                      {trim(item.name, type === 'show' ? 20 : 40)}
                    </Typography>
                    {type === 'show' && <Typography color={"lightgray"} variant="caption">
                      {trim(item.publisher, 15)}
                    </Typography>}
                  </Box>
                </Box>
                ))}
              </Box>
            </Box>
  )
}

export default Sections