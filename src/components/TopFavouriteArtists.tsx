import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import apiClient from '../spotify';

type Artist = {
    images: {url: string}[];
    name: string;
}

type State = {
    artists: Artist[];
}

function TopFavouriteArtists() {

    const [state, setState] = useState<State>({
        artists: [],
    })

    useEffect(() => {
        apiClient.get("me/top/artists", {params: {time_range: 'long_term', limit: 20}}).then((response) => {
            setState((prev) => ({...prev, artists: response.data.items}))
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
                  Top Favourite Artists
                </Typography>
                <Box sx={{gap: 2, display: 'flex'}}>
                  <IconButton size="small">
                    <FontAwesomeIcon size='sm' icon={faChevronLeft} color="lightgray"/>
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
                {state.artists.map((artist, index) => (
                <Box
                key={`${artist.name}${index}`}
                  sx={{
                    width: "7em",
                    minHeight: "8em",
                    display: "flex",
                    flexDirection: "column",
                    color: "white",
                    cursor: "pointer",
                    transition: "all 0.5s ease",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      minWidth: "6em",
                      minHeight: "6em",
                      borderRadius: "50%",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                      overflow: "hidden",
                    }}
                  >
                    <Box sx={{ width: "6em", height: "6em" }}>
                      <img
                        src={artist.images[0].url}
                        alt={artist.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </Box>
                  <Typography variant="caption">{trim(artist.name, 12)}</Typography>
                </Box>
                ))}
              </Box>
            </Box>
            
  )
}

export default TopFavouriteArtists