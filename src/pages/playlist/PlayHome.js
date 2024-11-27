import {  Routes, Route } from "react-router-dom";
import PlayDetail from "./PlayDetail";
import PlayList from "./PlayList";
import { useState, useEffect } from "react";
import HttpService from "../../services/HttpService";
import axios from "axios";

export default function PlayHome() {
  const [musics, setMusics] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.PUBLIC_URL}/music.json`)
      .then((response) => {
        setMusics(response.data); 
      })
      .catch((error) => {
        console.error("Error ", error);
      });
    
  }, []);

  return (
      <Routes>
        <Route index element={<PlayList musics={musics} />} />
        <Route path="play-detail/:id" element={<PlayDetail />} />
      </Routes>
  );
}
