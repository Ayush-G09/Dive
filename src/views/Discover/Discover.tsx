import { useEffect, useState } from 'react'
import {  faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import Sidebar from '../../components/Sidebar';
import apiClient from '../../spotify';
import PopularAlbums from '../../components/PopularAlbums';
import TopFavouriteArtists from '../../components/TopFavouriteArtists';
import Sections from '../../components/Sections';
import SearchScreen from '../../components/SearchScreen';

type State = {
  userImg: string;
  username: string;
  banner: { images: {url: string}[], name: string, id: string};
  isSearching: boolean;
  query: string;
}

function Discover() {
  const [state, setState] = useState<State>({
    userImg: 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png',
    username: '',
    banner: {
      name: '', id: '',
      images: [{url: ''}]
    },
    isSearching: false,
    query: '',
  });

  useEffect(() => {
    apiClient.get("me").then((response) => {
      if(response.data.images[0].url){
      setState((prev) => ({
        ...prev,
        userImg: response.data.images[0].url,
      }));
      }
      setState((prev) => ({
        ...prev,
        username: response.data.display_name
      }))
    });
  }, []);

  useEffect(() => {
    apiClient.get("search", {params: {q: `indie`, type: 'track', limit: 1}}).then((response) => {
        setState((prev) => ({...prev, banner: response.data.tracks.items[0].album}));
        console.log(response.data.tracks.items[0].album)
    });
  }, []);

  const clearQuery = () => {
    setState((prev) => ({...prev, query: ''}))
  }

  return (
    <Container
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        margin: 0,
        flexDirection: "column",
        padding: "0 !important",
      }}
    >
      {state.query.trim().length > 0 && <SearchScreen query={state.query} clearQuery={clearQuery}/>}
      <Box sx={{ width: "100vw", height: "100%", display: "flex" }}>
        <Sidebar/>
        <Box
          sx={{
            width: "80%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            overflowY: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            position: "relative",
          }}
        >
          <Box sx={{ width: "100%", height: "75%", position: "relative" }}>
            <img
              src={state.banner.images[0].url}
              alt={state.banner.name}
              style={{ width: "100%", height: "100%", objectFit: "fill" }}
            />
            <Box
              sx={{
                width: "100%",
                height: "15%",
                position: "absolute",
                top: 0,
                left: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "35%",
                  height: "60%",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: "white",
                }}
              >
                <Box sx={{ width: "fit-content", cursor: "pointer" }}>
                  <Typography>Discover</Typography>
                </Box>
                <Box sx={{ width: "fit-content", cursor: "pointer" }}>
                  <Typography>My Library</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  zIndex: 21,
                  overflow: "hidden",
                  width: "30%",
                  height: "60%",
                  backgroundColor: "rgba(225, 225, 225, 0.3)",
                  borderRadius: "30px",
                  display: "flex",
                  alignItems: "center",
                  marginRight: 20,
                }}
              >
                <Box
                  sx={{
                    zIndex: 10,
                    width: "15%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesomeIcon icon={faSearch} color="white" />
                </Box>
                <Box
                  sx={{
                    zIndex: 10,
                    width: "80%",
                    height: "70%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    placeholder="What do you want to play ?"
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                      color: "white",
                      fontSize: "0.9em",
                    }}
                    onChange={(e) => setState((prev) => ({...prev, query: e.target.value}))}
                    value={state.query}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  width: "20%",
                  height: "60%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  color: 'white',
                }}
              >
                <Typography sx={{marginRight: 2}} variant='h6'>{state.username}</Typography>
                <Box
                  sx={{
                    width: "2.5em",
                    height: "2.5em",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                    overflow: 'hidden',
                  }}
                >
                  <img src={state.userImg} alt='user' style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "30%",
                backdropFilter: "blur(5px)",
                position: "absolute",
                top: 350,
                left: 0,
              }}
            ></Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              top: 370,
              paddingLeft: 5,
              gap: 5,
            }}
          >
            <PopularAlbums/>
            <TopFavouriteArtists/>
            <Sections type='show'/>
            <Sections type='playlist'/>
            <Divider />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Discover