import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import apiClient from "../spotify";

type Album = {
    artists: {name: string}[];
    images: {url: string}[];
    name: string;
}

type State = {
    albums: Album[];
}

function PopularAlbums() {

    const [state, setState] = useState<State>({
        albums: [],
    })

    useEffect(() => {
        apiClient.get("browse/new-releases").then((response) => {
          setState((prev) => ({...prev, albums: response.data.albums.items}))
        });
      }, []);

    const trim = (value: string) => {
        if(value.length > 10) {
            return `${value.slice(0, 13)}...`;
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
          Popular Albums
        </Typography>
        <Box sx={{ gap: 2, display: "flex" }}>
          <IconButton size="small">
            <FontAwesomeIcon size="sm" icon={faChevronLeft} color="lightgray" />
          </IconButton>
          <IconButton size="small">
            <FontAwesomeIcon
              size="sm"
              icon={faChevronRight}
              color="lightgray"
            />
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
          gap: 3,
          paddingLeft: 3,
          paddingY: 1
        }}
      >
        {state.albums.map((album, index) => (
        <Box
        key={`${album.name}${index}`}
          sx={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            cursor: "pointer",
            transition: "all 0.5s ease",
            "&:hover": {
              transform: "scale(1.03)",
            },
          }}
        >
          <Box
            sx={{
              minWidth: "8em",
              minHeight: "8em",
              borderRadius: "4px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              overflow: "hidden",
            }}
          >
            <Box sx={{ width: "8em", height: "8em" }}>
              <img
                src={album.images[0].url}
                alt={album.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
          <Typography variant="subtitle1">{trim(album.name)}</Typography>
          <Typography variant="caption" color={"lightgray"}>
            {album.artists[0].name}
          </Typography>
        </Box>
        ))}
      </Box>
    </Box>
  );
}

export default PopularAlbums;
