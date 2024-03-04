import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import apiClient from "../spotify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type Props = {
  query: string;
  clearQuery: () => void;
};

type Album = {
  name: string;
  images: { url: string }[];
  artists: { name: string }[];
};

type Show = {
  name: string;
  images: { url: string }[];
  publisher: string;
};

type Artist = {
  images: { url: string }[];
  name: string;
};

type Track = {
  album: Album;
};

type State = {
  playlist: boolean;
  artist: boolean;
  track: boolean;
  show: boolean;
  type: string;
  albumData: Album[];
  album: {
    checked: boolean;
    pageNo: number;
    currentAlbums: Album[];
    totalPages: number;
  };
  artistData: Artist[];
  playlistData: Artist[];
  showData: Show[];
  trackData: Track[];
};

function SearchScreen({ query, clearQuery }: Props) {
  const trim = (value: string, truncate: number) => {
    if(value.length > truncate) {
        return `${value.slice(0, truncate)}...`;
    }
    return value;}

  const [state, setState] = useState<State>({
    playlist: true,
    artist: true,
    track: true,
    show: true,
    type: "album,artist,playlist,track,show",
    albumData: [],
    album: {
      checked: true,
      pageNo: 1,
      currentAlbums: [],
      totalPages: 1,
    },
    artistData: [],
    playlistData: [],
    showData: [],
    trackData: [],
  });

  function getPageItems(array: Album[], pageNumber: number) {
    const startIndex = (pageNumber - 1) * 10;
    const endIndex = Math.min(startIndex + 10, array.length);
    return array.slice(startIndex, endIndex);
}

  useEffect(() => {
    if (
      state.track ||
      state.show ||
      state.playlist ||
      state.artist ||
      state.album.checked
    ) {
      apiClient
        .get("search", {
          params: {
            q: query,
            type: state.type,
            limit: 50,
          },
        })
        .then((response) => {
          if (state.album) {
            setState((prev) => ({
              ...prev,
              albumData: response.data.albums.items,
              album: {
                ...prev.album,
                pageNo: 1,
                currentAlbums: getPageItems(response.data.albums.items, 1),
                totalPages: response.data.albums.items.length /10 + 1,
              }
            }));
          }
          if (state.artist) {
            setState((prev) => ({
              ...prev,
              artistData: response.data.artists.items,
            }));
          }
          if (state.playlist) {
            setState((prev) => ({
              ...prev,
              playlistData: response.data.playlists.items,
            }));
          }
          if (state.show) {
            setState((prev) => ({
              ...prev,
              showData: response.data.shows.items,
            }));
          }
          if (state.track) {
            setState((prev) => ({
              ...prev,
              trackData: response.data.tracks.items,
            }));
          }
          console.log({ response });
        });
    }
  }, [query]);

  useEffect(() => {
    const type = `${state.artist ? "artist" : ""}${
      state.playlist ? ",playlist" : ""
    }${state.album ? ",album" : ""}${state.show ? ",show" : ""}${
      state.track ? ",track" : ""
    }`.replace(/,$/, "");
    setState((prev) => ({ ...prev, type: type }));
  }, [state.album, state.artist, state.playlist, state.show, state.track]);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      album: {
        ...prev.album,
        currentAlbums: getPageItems(state.albumData, state.album.pageNo),
      }
    }));
  }, [state.album.pageNo])

  const handleAlbumPage = (value: number) => {
    setState((prev) => ({...prev, album: {...prev.album, pageNo: value}}));
  }

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        zIndex: 20,
        position: "absolute",
      }}
    >
      <Box
        sx={{
          width: "78%",
          height: "87%",
          top: "11%",
          left: "21%",
          position: "absolute",
          borderRadius: "8px",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "8%",
            display: "flex",
            paddingLeft: 2,
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <FormControlLabel
            label="Album"
            control={
              <Checkbox
                checked={state.album.checked}
                onChange={() =>
                  setState(prev => ({
                    ...prev,
                    album: {
                      ...prev.album,
                      checked: !prev.album.checked
                    }
                  }))
                }
              />
            }
          />
          <FormControlLabel
            label="Artist"
            control={
              <Checkbox
                checked={state.artist}
                onChange={() =>
                  setState((prev) => ({ ...prev, artist: !state.artist }))
                }
              />
            }
          />
          <FormControlLabel
            label="Playlist"
            control={
              <Checkbox
                checked={state.playlist}
                onChange={() =>
                  setState((prev) => ({ ...prev, playlist: !state.playlist }))
                }
              />
            }
          />
          <FormControlLabel
            label="Track"
            control={
              <Checkbox
                checked={state.track}
                onChange={() =>
                  setState((prev) => ({ ...prev, track: !state.track }))
                }
              />
            }
          />
          <FormControlLabel
            label="Show"
            control={
              <Checkbox
                checked={state.show}
                onChange={() =>
                  setState((prev) => ({ ...prev, show: !state.show }))
                }
              />
            }
          />
          <Box sx={{flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end', paddingRight: 5, color: 'white'}}>
            <FontAwesomeIcon icon={faX} style={{cursor: 'pointer'}} onClick={clearQuery}/>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "92%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            overflowY: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', gap: 2, color: 'white'}}>
            <Box sx={{borderRadius: '4px', backgroundColor: 'rgba(0, 0, 0, 0.5)', boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", margin: 2, overflow: 'hidden'}}>
            <Typography variant="h5" sx={{marginY: 2, marginLeft: 3}}>Albums</Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{paddingLeft: 3}}>
  {state.album.currentAlbums.map((album, index) => (
    <Grid item key={index} xs={6} md={6} lg={6}>
      <Box sx={{ width: '70%', padding: 1, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 1)', borderRadius: '4px', gap: 2, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", cursor: 'pointer'}}>
        <Box sx={{ width: '4em', height: '4em', borderRadius: '4px', overflow: 'hidden' }}>
          <img src={album.images[0].url} alt="image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
        <Box sx={{ flex: 1, height: '4em', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start' }}>
          <Typography variant="subtitle1">{trim(album.name, 35)}</Typography>
          <Typography variant="caption">{album.artists[0].name}</Typography>
        </Box>
      </Box>
    </Grid>
  ))}
</Grid>
<Box sx={{width: '98%', paddingY: 1, paddingX: 1.5, display: 'flex', justifyContent: 'end', backgroundColor: 'rgba(225, 225, 225, 1)', marginTop: 2}}>
<Pagination count={state.album.totalPages} defaultValue={1}  onChange={(_event, page) => handleAlbumPage(page)} color="primary" />
</Box>
</Box>
<Box sx={{padding: 1, borderRadius: '4px', backgroundColor: 'rgba(0, 0, 0, 0.5)', boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", margin: 2, paddingLeft: 3, paddingBottom: 2}}>
            <Typography variant="h5" sx={{marginBottom: 2}}>Artists</Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  {state.artistData.map((artist, index) => (
    <Grid item key={index} xs={2} sm={2} md={2} lg={2}>
      <Box sx={{height: '8em', width: '6em', padding: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 1)', borderRadius: '4px', gap: 2, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", cursor: 'pointer' }}>
        <Box sx={{ width: '5em', height: '5em', borderRadius: '4px', overflow: 'hidden' }}>
          <img src={artist.images[0]?.url} alt="image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start' }}>
          <Typography variant="caption">{artist.name}</Typography>
        </Box>
      </Box>
    </Grid>
  ))}
</Grid>
</Box>
<Box sx={{padding: 1, borderRadius: '4px', backgroundColor: 'rgba(0, 0, 0, 0.5)', boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", margin: 2, paddingLeft: 3, paddingBottom: 2}}>
            <Typography variant="h5" sx={{marginBottom: 2}}>Playlists</Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {state.playlistData.map((playlist, index) => (
              <Grid item key={index} xs={2} sm={2} md={2} lg={2}>
            <Box key={index} sx={{height: '8em', width: '6em', padding: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 1)', borderRadius: '4px', gap: 2, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", cursor: 'pointer'}}>
            <Box sx={{width: '5em', height: '5em', borderRadius: '4px', overflow: 'hidden'}}>
              <img src={playlist.images[0].url} alt="image" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start'}}>
              <Typography variant="caption">{trim(playlist.name, 20)}</Typography>
            </Box>
          </Box>
          </Grid>
            ))}
            </Grid>
            </Box>
            <Box sx={{padding: 1, borderRadius: '4px', backgroundColor: 'rgba(0, 0, 0, 0.5)', boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", margin: 2, paddingLeft: 3, paddingBottom: 2}}>
             <Typography variant="h5" sx={{marginBottom: 2}}>Tracks</Typography>
             <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {state.trackData.map((track, index) => (
              <Grid item key={index} xs={6} md={6} lg={6}>
            <Box key={index} sx={{width: '70%', padding: 1, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 1)', borderRadius: '4px', gap: 2, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", cursor: 'pointer'}}>
              <Box sx={{width: '4em', height: '4em', borderRadius: '4px', overflow: 'hidden'}}>
                <img src={track.album.images[0].url} alt="image" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
              </Box>
              <Box sx={{flex: 1, height: '4em', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start'}}>
                <Typography variant="subtitle1">{trim(track.album.name, 30)}</Typography>
                <Typography variant="caption">{track.album.artists[0].name}</Typography>
              </Box>
            </Box>
            </Grid>
            ))}
            </Grid>
            </Box>
            <Box sx={{padding: 1, borderRadius: '4px', backgroundColor: 'rgba(0, 0, 0, 0.5)', boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", margin: 2, paddingLeft: 3, paddingBottom: 2}}>
            <Typography variant="h5" sx={{marginBottom: 2}}>Shows</Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {state.showData.map((show, index) => (
              <Grid item key={index} xs={6} md={6} lg={6}>
            <Box key={index} sx={{width: '70%', padding: 1, display: 'flex', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 1)', borderRadius: '4px', gap: 2, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", cursor: 'pointer'}}>
              <Box sx={{width: '4em', height: '4em', borderRadius: '4px', overflow: 'hidden'}}>
                <img src={show.images[0].url} alt="image" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
              </Box>
              <Box sx={{flex: 1, height: '4em', display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start'}}>
                <Typography variant="subtitle1">{trim(show.name, 30)}</Typography>
                <Typography variant="caption">{show.publisher}</Typography>
              </Box>
            </Box>
            </Grid>
            ))}
            </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SearchScreen;
